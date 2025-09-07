import React from "react";

export const LoadingSpinner = ({
  message = "Loading...",
}: {
  message?: string;
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-transparent border-b-primary mx-auto mb-4" />
        <p className="text-alt">{message}</p>
      </div>
    </div>
  );
};
