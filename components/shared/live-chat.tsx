"use client";

import { useState } from "react";
import { MessagesSquare, X } from "lucide-react";

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText;
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
    setInputText("");
    setIsLoading(true);

    // Build conversation history for API
    const conversationHistory = messages.map((msg) => ({
      role: msg.isUser ? "user" as const : "assistant" as const,
      content: msg.text,
    }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      setMessages((prev) => [
        ...prev,
        { text: data.message, isUser: false },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I'm having trouble connecting. Please try again or contact us via WhatsApp.",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 ring-1 ring-white/20 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 z-50"
          aria-label="Open chat"
        >
          <MessagesSquare className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 left-6 w-80 ring-1 ring-white/20 backdrop-blur-2xl rounded-lg shadow-xl z-50">
          <div className="p-4 bg-linear-to-r from-indigo-200 via-white/90 to-rose-200 border-b border-black/50 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessagesSquare className="w-5 h-5 text-black" />
              <h3 className="text-black font-medium">Live Chat</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-black hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="h-96 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${msg.isUser ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block p-3 rounded-lg backdrop-blur-lg ${
                    msg.isUser
                      ? "bg-linear-to-r from-indigo-200 via-white/90 to-rose-200 ring-1 ring-gray-300 text-black"
                      : "bg-slate-800/90 ring-1 ring-white/10 text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mb-4 text-left">
                    <div className="flex gap-1">
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '1200ms' }}></span>
                  </div>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-white/20"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-2 rounded ring-1 ring-white/20 backdrop-blur-2xl text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </form>
        </div>
      )}
    </>
  );
}
