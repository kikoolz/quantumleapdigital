import { db } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

const unsubscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const rateLimit = new Map<string, number>();
const DEBUG = process.env.NODE_ENV !== "production";

export async function POST(request: Request) {
  try {
    if (DEBUG) console.log("Newsletter unsubscribe attempt...");

    // Rate limiting check
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const lastRequest = rateLimit.get(ip) || 0;
    const timeSinceLastRequest = Date.now() - lastRequest;

    if (timeSinceLastRequest < 60000) {
      console.warn(`Rate limit hit for IP: ${ip}`);
      return NextResponse.json(
        { error: "Please wait a minute before trying again." },
        {
          status: 429,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Update rate limit timestamp
    rateLimit.set(ip, Date.now());

    // Validate request body
    const body = await request.json();
    const { email } = unsubscribeSchema.parse(body);

    if (DEBUG) console.log("Email validated:", email);

    // Check if subscriber exists
    const existingUsers = (await db`
      SELECT email, status 
      FROM subscribers 
      WHERE email = ${email}
      LIMIT 1
    `) as Array<{ email: string; status: string }>;

    if (existingUsers.length === 0) {
      return NextResponse.json(
        { error: "This email is not subscribed to our newsletter." },
        {
          status: 404,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const subscriber = existingUsers[0];

    // Check if already unsubscribed
    if (subscriber.status === "unsubscribed") {
      return NextResponse.json(
        { error: "This email is already unsubscribed." },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Update subscriber status to unsubscribed
    await db`
      UPDATE subscribers 
      SET status = 'unsubscribed' 
      WHERE email = ${email}
    `;

    // Send confirmation email
    if (DEBUG) console.log("Sending unsubscribe confirmation email...");
    try {
      if (!process.env.RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY is not configured");
      }

      if (!process.env.SENDER_EMAIL) {
        throw new Error("SENDER_EMAIL is not configured");
      }

      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "You've been unsubscribed",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #4F46E5;">You've been unsubscribed</h1>
            <p>You have been successfully unsubscribed from the Quantum Leap Digital newsletter.</p>
            <p>We're sorry to see you go. If you ever want to resubscribe, you can do so from our website.</p>
            <div style="margin-top: 20px;">
              <p>Best regards,<br>The Quantum Leap Digital Team</p>
            </div>
          </div>
        `,
      });
      if (DEBUG) console.log("Unsubscribe confirmation email sent successfully");
    } catch (emailError) {
      console.error("Resend error:", emailError);
      // Continue execution - don't throw error for email failure
    }

    return NextResponse.json({
      success: true,
      message: "You have been successfully unsubscribed from our newsletter.",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Newsletter unsubscribe error:", {
        name: error.name,
        message: error.message,
        stack: DEBUG ? error.stack : undefined,
      });
    } else {
      console.error("Newsletter unsubscribe error:", error);
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    return NextResponse.json(
      { error: "Failed to unsubscribe. Please try again later." },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
