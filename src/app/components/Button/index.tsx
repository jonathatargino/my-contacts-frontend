"use client";

import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import LoadingDots from "../LoadingDots";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export default function Button({ children, className, disabled, isLoading = false, ...props }: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      {...props}
      className={twMerge(
        "h-[52px] rounded bg-primary-main px-4 font-bold text-white shadow-soft transition-colors hover:bg-primary-light active:bg-primary-dark disabled:cursor-default disabled:bg-[#ccc]",
        className,
      )}
    >
      {!isLoading ? children : <LoadingDots className="h-2 w-2" />}
    </button>
  );
}
