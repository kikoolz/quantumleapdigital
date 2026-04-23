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

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const rateLimit = new Map<string, number>();
const DEBUG = process.env.NODE_ENV !== "production";

export async function POST(request: Request) {
  try {
    if (DEBUG) console.log("Contact form submission attempt...");

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
    const { name, email, subject, message } = contactSchema.parse(body);

    if (DEBUG) console.log("Form validated:", { name, email, subject });

    // Send email via Resend
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    if (!process.env.SENDER_EMAIL) {
      throw new Error("SENDER_EMAIL is not configured");
    }

    const contactEmail = process.env.CONTACT_EMAIL || process.env.SENDER_EMAIL;

    if (DEBUG) {
      console.log("Sending email with Resend...");
      console.log("From:", process.env.SENDER_EMAIL);
      console.log("To:", contactEmail);
      console.log("Subject:", subject);
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
      const result = await resend.emails.send({
        from: process.env.SENDER_EMAIL,
        to: contactEmail,
        subject: `Contact Form: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #4F46E5;">New Contact Form Submission</h2>
            <div style="margin-top: 20px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <div style="margin-top: 15px;">
                <strong>Message:</strong>
                <p style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
              </div>
            </div>
          </div>
        `,
        replyTo: email,
      });

      if (DEBUG) {
        console.log("Contact email sent successfully");
        console.log("Resend result:", result);
      }
    } catch (emailError) {
      console.error("Resend error:", emailError);
      throw new Error("Failed to send email. Please check your Resend configuration.");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! We'll get back to you within 24 hours.",
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Contact form error:", {
        name: error.name,
        message: error.message,
        stack: DEBUG ? error.stack : undefined,
      });
    } else {
      console.error("Contact form error:", error);
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
