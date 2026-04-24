import { NextResponse } from "next/server";
import { z } from "zod";

const chatSchema = z.object({
  message: z.string().min(1, "Message is required"),
  conversationHistory: z.array(z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string(),
  })).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, conversationHistory = [] } = chatSchema.parse(body);

    const apiKey = process.env.OPENROUTER_API_KEY || process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI service is not configured" },
        { status: 503 }
      );
    }

    // System prompt for digital marketing context
    const systemPrompt = `You are a customer service rep for Quantum Leap Digital (SEO, Social Media, Content, PPC, Web Design, Digital Strategy).

RULES:
- NEVER give generic introductions or service lists
- Answer ONLY what the customer asked
- Be extremely concise (1-2 sentences max)
- If asked about pricing: "Please contact us via WhatsApp or the contact form for pricing"
- If asked about a specific service: explain that service briefly
- Be conversational but direct`;

    // Build messages array with system prompt and conversation history
    const messages = [
      { role: "system" as const, content: systemPrompt },
      ...conversationHistory,
      { role: "user" as const, content: message },
    ];

    // Convert messages to prompt format for HuggingFace
    const prompt = messages.map(m => `${m.role}: ${m.content}`).join("\n");

    // Using a stable OpenRouter model (avoid :free variants which often fail)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    let response;
    try {
      response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
          "X-Title": "Quantum Leap Digital AI Chat",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.1-8b-instruct",
          messages,
          max_tokens: 100,
          temperature: 0.7,
          top_p: 0.9,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
        signal: controller.signal,
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return NextResponse.json(
          { error: "Request timed out. Please try again." },
          { status: 504 }
        );
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }

    // Fallback if model fails
    if (!response.ok) {
      console.warn("Primary model failed, trying fallback...");

      response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
          "X-Title": "Quantum Leap Digital AI Chat",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages,
          max_tokens: 150,
          temperature: 0.7,
        }),
      });
    }

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenRouter API error RAW:", error);
      
      try {
        const errorData = JSON.parse(error);
        return NextResponse.json(
          { error: errorData.error?.message || errorData.message || error || "Failed to get AI response" },
          { status: 500 }
        );
      } catch {
        return NextResponse.json(
          { error: error || "Failed to get AI response" },
          { status: 500 }
        );
      }
    }

    const data = await response.json();
    console.log("OpenRouter response:", data);
    const aiMessage = data.choices?.[0]?.message?.content || "I apologize, but I couldn't process that request.";

    return NextResponse.json({ message: aiMessage });
  } catch (error) {
    console.error("Chat API error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}
