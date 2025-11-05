import { NextResponse } from "next/server";
import { z } from "zod";
import sgMail from "@sendgrid/mail";
import { supabase } from "@/lib/supabase";

// Initialize SendGrid with the API key
if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY is not configured");
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Email validation schema
const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// Rate limiting map with debug logging
const rateLimit = new Map<string, number>();
const DEBUG = process.env.NODE_ENV !== "production";

export async function POST(request: Request) {
  try {
    if (DEBUG) console.log("Newsletter subscription attempt...");

    // Rate limiting check with logging
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const lastRequest = rateLimit.get(ip) || 0;
    const timeSinceLastRequest = Date.now() - lastRequest;

    if (DEBUG)
      console.log(
        `IP: ${ip}, Time since last request: ${timeSinceLastRequest}ms`
      );

    if (timeSinceLastRequest < 60000) {
      console.warn(`Rate limit hit for IP: ${ip}`);
      return NextResponse.json(
        { error: "Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    // Update rate limit timestamp
    rateLimit.set(ip, Date.now());

    // Validate request body
    const body = await request.json();
    
    if (DEBUG) console.log("Request body:", body);

    const { email } = subscribeSchema.parse(body);
    if (DEBUG) console.log("Email validated:", email);

    // Check for existing subscriber
    if (DEBUG) console.log("Checking for existing subscriber...");
    
    let existingUser;
    let fetchError;
    
    try {
      const result = await supabase
        .from("subscribers")
        .select("email")
        .eq("email", email)
        .single();
      
      existingUser = result.data;
      fetchError = result.error;
    } catch (error) {
      console.error("Database connection error:", error);
      // If it's a network error, provide a more helpful message
      if (error instanceof Error && error.message.includes("fetch failed")) {
        return NextResponse.json(
          { error: "Database connection failed. Please check your Supabase configuration." },
          { status: 503 }
        );
      }
      throw error;
    }

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Database query error:", {
        code: fetchError.code,
        message: fetchError.message,
        details: fetchError.details,
      });
      throw new Error("Database query failed");
    }

    if (existingUser) {
      if (DEBUG) console.log("Existing subscriber found:", existingUser);
      return NextResponse.json(
        { error: "This email is already subscribed." },
        { status: 409 }
      );
    }

    // Add new subscriber to database
    if (DEBUG) console.log("Adding new subscriber to database...");
    const { error: insertError } = await supabase
      .from("subscribers")
      .insert([{ email, status: "active" }]);

    if (insertError) {
      console.error("Database insert error:", {
        code: insertError.code,
        message: insertError.message,
        details: insertError.details,
      });
      throw new Error("Failed to store subscriber");
    }

    // Send welcome email
    if (DEBUG) console.log("Sending welcome email...");
    try {
      await sgMail.send({
        to: email,
        from: process.env.SENDER_EMAIL!,
        subject: "Welcome to Quantum Leap Digital Newsletter!",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #4F46E5;">Welcome to Quantum Leap Digital!</h1>
              <p>Thank you for subscribing to our newsletter. We're excited to share our latest updates, insights, and special offers with you.</p>
              <p>You'll start receiving our newsletters soon.</p>
              <div style="margin-top: 20px;">
                <p>Best regards,<br>The Quantum Leap Digital Team</p>
              </div>
            </div>
          `,
      });
      if (DEBUG) console.log("Welcome email sent successfully");
    } catch (emailError) {
      console.error("SendGrid error:", emailError);
      // Continue execution - don't throw error for email failure
    }

    // Return success response
    if (DEBUG) console.log("Subscription process completed successfully");
    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing to our newsletter!",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Newsletter subscription error:", {
        name: error.name,
        message: error.message,
        stack: DEBUG ? error.stack : undefined,
      });
    } else {
      console.error("Newsletter subscription error:", error);
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to subscribe. Please try again later." },
      { status: 500 }
    );
  }
}
