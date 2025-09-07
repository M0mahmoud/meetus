import React from "react";

export const ErrorDisplay = ({ message }: { message: string }) => {
  return (
    <div className="w-full p-3 bg-red-100 border border-red-400 rounded-lg">
      <div className="flex items-center gap-2 text-red-600">
        <svg
          className="w-5 h-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};
