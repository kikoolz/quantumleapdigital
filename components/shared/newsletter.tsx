"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { z } from "zod";

// Email validation schema
const emailSchema = z.string().email("Please enter a valid email address");

type SubscribeResponse = {
  success?: boolean;
  message?: string;
  error?: string;
};

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Validate email before sending
      emailSchema.parse(email);

      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data: SubscribeResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setStatus("success");
      setMessage(data.message || "Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof z.ZodError
          ? error.errors[0].message
          : error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  const isValidEmail = (email: string) => {
    try {
      emailSchema.parse(email);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <section className="w-full bg-gradient-to-br from-indigo-500/10 via-transparent to-rose-500/10 p-8 rounded-2xl">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
          Stay Updated
        </h2>
        <p className="text-white/60 mb-6">
          Subscribe to our newsletter for the latest updates, insights, and
          special offers.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2"
        >
          <div className="flex-1">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Email address"
              disabled={status === "loading"}
            />
            {email && !isValidEmail(email) && (
              <p className="text-rose-400 text-sm mt-1 text-left">
                Please enter a valid email address
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={status === "loading" || !isValidEmail(email)}
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto w-full"
          >
            {status === "loading" ? (
              <>
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Subscribing...
              </>
            ) : (
              <>
                Subscribe
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 ${
              status === "success" ? "text-green-400" : "text-rose-400"
            }`}
            role="alert"
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
