"use client";

import classNames from "classnames";
import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export default function Input({ className, error, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={twMerge(
        classNames(
          "h-[52px] rounded border-2 border-white bg-white px-4 shadow-soft outline-none transition-all placeholder:text-gray-200 focus:border-2 focus:border-primary-main",
          className,
          { "border-danger-main text-danger-main placeholder:text-danger-main focus:border-danger-light": error },
        ),
      )}
    />
  );
}
