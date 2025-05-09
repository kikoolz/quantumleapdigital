"use client";

import { useState } from "react";
import { MessagesSquare, X } from "lucide-react";

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: inputText, isUser: true }]);
    setInputText("");

    // Simulate automated response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Thanks for your message! Our team will get back to you soon.",
          isUser: false,
        },
      ]);
    }, 1000);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 bg-gradient-to-r from-indigo-500 to-violet-500 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 z-50"
          aria-label="Open chat"
        >
          <MessagesSquare className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 left-6 w-80 bg-gray-900 rounded-lg shadow-xl z-50">
          <div className="p-4 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-t-lg flex justify-between items-center">
            <h3 className="text-white font-medium">Live Chat</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
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
                  className={`inline-block p-3 rounded-lg ${
                    msg.isUser
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-gray-700"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </form>
        </div>
      )}
    </>
  );
}
