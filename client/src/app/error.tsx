"use client";

import { useEffect } from "react";
import Container from "@/components/shared/Container";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error:", error);
  }, [error]);

  return (
    <Container className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-text-dark mb-4">Something went wrong!</h2>
      <p className="text-text-body mb-8 max-w-md">
        An unexpected error has occurred on our end. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-hover transition-colors"
      >
        Try again
      </button>
    </Container>
  );
}
