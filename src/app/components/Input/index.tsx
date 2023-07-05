"use client";

import classNames from "classnames";
import { forwardRef } from "react";
import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, error, ...props }, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={twMerge(
        classNames(
          "h-[52px] appearance-none rounded border-2 border-white bg-white px-4 shadow-soft outline-none transition-all placeholder:text-gray-200 focus:border-2 focus:border-primary-main",
          className,
          { "border-danger-main text-danger-main placeholder:text-danger-main focus:border-danger-light": error },
        ),
      )}
    />
  );
});

export default Input;
