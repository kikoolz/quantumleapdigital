"use client";

import dynamic from "next/dynamic";
import WhatsAppButton from "@/components/shared/whatsapp-button";

const LiveChat = dynamic(() => import("@/components/shared/live-chat"), {
  ssr: false,
});

export function ClientProviders() {
  return (
    <>
      <WhatsAppButton phoneNumber="+971524419186" />
      <LiveChat />
    </>
  );
}
