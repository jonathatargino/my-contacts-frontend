"use client";

import classNames from "classnames";
import { SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export default function Select({ children, className, placeholder, error, ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={twMerge(
        classNames(
          "h-[52px] rounded border-2 border-white bg-white px-4 shadow-soft outline-none transition-all focus:border-2 focus:border-primary-main",
          className,
          { "border-danger-main text-danger-main placeholder:text-danger-main focus:border-danger-light": error },
        ),
      )}
    >
      <option value="" disabled selected hidden className="text-gray-200">
        {placeholder}
      </option>
      {children}
    </select>
  );
}
