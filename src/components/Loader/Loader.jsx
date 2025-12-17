import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center space-x-2 py-6">
      <span className="h-3 w-3 bg-red-500 rounded-full animate-bounce"></span>
      <span className="h-3 w-3 bg-red-500 rounded-full animate-bounce [animation-delay:0.15s]"></span>
      <span className="h-3 w-3 bg-red-500 rounded-full animate-bounce [animation-delay:0.3s]"></span>
    </div>
  );
}
