"use client";

import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Button({ children, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={twMerge(
        "h-[52px] rounded bg-primary-main px-4 font-bold text-white shadow-soft transition-colors hover:bg-primary-light active:bg-primary-dark disabled:cursor-default disabled:bg-[#ccc]",
        className,
      )}
    >
      {children}
    </button>
  );
}
