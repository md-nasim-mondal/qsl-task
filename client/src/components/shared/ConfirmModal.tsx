"use client";

import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "primary" | "warning";
  loading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "primary",
  loading = false,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const bgColors = {
    danger: "bg-red-600 hover:bg-red-700",
    primary: "bg-primary hover:bg-primary-hover",
    warning: "bg-amber-500 hover:bg-amber-600",
  };

  const textColors = {
    danger: "text-red-600",
    primary: "text-primary",
    warning: "text-amber-500",
  };

  const iconBgs = {
    danger: "bg-red-50",
    primary: "bg-primary/10",
    warning: "bg-amber-50",
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-text-dark/40 backdrop-blur-sm transition-opacity">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center ${iconBgs[variant]}`}>
              {variant === "danger" ? (
                <svg className={`w-6 h-6 ${textColors.danger}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              ) : variant === "warning" ? (
                <svg className={`w-6 h-6 ${textColors.warning}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ) : (
                <svg className={`w-6 h-6 ${textColors.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-text-dark mb-2 tracking-tight">
                {title}
              </h3>
              <p className="text-text-body text-sm leading-relaxed">
                {message}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 text-sm font-bold text-text-body hover:text-text-dark transition-colors disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-6 py-2.5 text-sm font-bold text-white rounded-xl shadow-lg shadow-primary/10 transition-all active:scale-95 disabled:opacity-50 ${bgColors[variant]}`}
          >
            {loading ? (
                <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                </div>
            ) : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
