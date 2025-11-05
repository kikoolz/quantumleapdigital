import { db } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// Initialize Resend lazily
function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(process.env.RESEND_API_KEY);
}

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

    try {
      const existingUsers = (await db`
        SELECT email 
        FROM subscribers 
        WHERE email = ${email}
        LIMIT 1
      `) as Array<{ email: string }>;

      if (existingUsers.length > 0) {
        if (DEBUG) console.log("Existing subscriber found:", existingUsers[0]);
        return NextResponse.json(
          { error: "This email is already subscribed." },
          { status: 409 }
        );
      }

      // Add new subscriber to database
      if (DEBUG) console.log("Adding new subscriber to database...");
      await db`
        INSERT INTO subscribers (email, status) 
        VALUES (${email}, 'active')
      `;
    } catch (error) {
      console.error("Database error:", error);
      // Check if it's a unique constraint violation (duplicate email)
      if (
        error instanceof Error &&
        (error.message.includes("duplicate") ||
          error.message.includes("unique") ||
          error.message.includes("UNIQUE constraint"))
      ) {
        return NextResponse.json(
          { error: "This email is already subscribed." },
          { status: 409 }
        );
      }

      // If it's a network error, provide a more helpful message
      if (error instanceof Error && error.message.includes("fetch failed")) {
        return NextResponse.json(
          {
            error:
              "Database connection failed. Please check your database configuration.",
          },
          { status: 503 }
        );
      }

      throw new Error("Database operation failed");
    }

    // Send welcome email
    if (DEBUG) console.log("Sending welcome email...");
    try {
      const resend = getResend();
      await resend.emails.send({
        from: process.env.SENDER_EMAIL!,
        to: email,
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
      console.error("Resend error:", emailError);
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
