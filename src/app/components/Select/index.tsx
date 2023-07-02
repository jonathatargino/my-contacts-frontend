import { SelectHTMLAttributes } from "react";

export default function Select({ children, placeholder, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="h-[52px] rounded border-2 border-white bg-white px-4 shadow-soft outline-none transition-all focus:border-2 focus:border-primary-main"
    >
      <option value="" disabled selected hidden className="text-gray-200">
        {placeholder}
      </option>
      {children}
    </select>
  );
}
