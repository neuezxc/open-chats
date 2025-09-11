import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";

export default function MessageList({ messages }) {
  const messagesEndRef = useRef(null);

  // Scroll to bottom of chat container
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col items-center w-full max-w-2xl flex-grow py-4 md:py-[45px] overflow-y-auto mx-4 md:mx-8">
      <div className="flex flex-col flex-grow flex-shrink-0 justify-start items-start gap-0 w-full">
        {/* Map through messages and render based on type */}
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}