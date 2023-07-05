"use client";

import classNames from "classnames";
import { SelectHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, className, placeholder, error, ...props }, ref) => {
    return (
      <select
        {...props}
        ref={ref}
        required
        defaultValue={""}
        className={twMerge(
          classNames(
            "h-[52px] appearance-none rounded border-2 border-white bg-white px-4 shadow-soft outline-none transition-all invalid:text-gray-200 focus:border-2 focus:border-primary-main",
            className,
            { "text-danger-mainfocus:border-danger-light border-danger-main": error },
          ),
        )}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {children}
      </select>
    );
  },
);

export default Select;
