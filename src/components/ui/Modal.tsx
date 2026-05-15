"use client";

import { useEffect, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "full";
  showClose?: boolean;
}

const sizeStyles = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  full: "max-w-[95vw] max-h-[95vh]",
};

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  className,
  size = "md",
  showClose = true,
}: ModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "relative w-full bg-[var(--bg-card)] rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)] overflow-hidden",
              sizeStyles[size],
              className
            )}
          >
            {/* Header */}
            {(title || showClose) && (
              <div className="flex items-center justify-between px-6 pt-5 pb-2">
                {title && (
                  <h2 className="text-lg font-semibold text-[var(--text-primary)] font-[family-name:var(--font-poppins)]">
                    {title}
                  </h2>
                )}
                {showClose && (
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-full hover:bg-[var(--bg-elevated)] transition-colors text-[var(--text-tertiary)] hover:text-[var(--text-primary)] cursor-pointer"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className="px-6 pb-6 overflow-y-auto max-h-[75vh]">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
