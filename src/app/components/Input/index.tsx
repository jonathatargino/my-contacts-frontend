"use client";

import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={twMerge(
        "h-[52px] rounded border-2 border-white bg-white px-4 shadow-soft outline-none transition-all placeholder:text-gray-200 focus:border-2 focus:border-primary-main",
        className,
      )}
    />
  );
}
