
import React from 'react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatMessage = ({ message, isBot, timestamp }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex gap-3 p-4 rounded-lg animate-in slide-in-from-bottom-5 duration-300",
      isBot ? "bg-orange-50 border-l-4 border-orange-400" : "bg-gray-50 ml-8"
    )}>
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm",
        isBot ? "bg-orange-500" : "bg-gray-500"
      )}>
        {isBot ? "F" : "U"}
      </div>
      <div className="flex-1">
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{message}</p>
        <span className="text-xs text-gray-500 mt-1 block">
          {timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
