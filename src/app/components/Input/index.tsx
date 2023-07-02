import { InputHTMLAttributes } from "react";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="h-[52px] rounded border-2 border-white bg-white px-4 shadow-soft outline-none transition-all placeholder:text-gray-200 focus:border-2 focus:border-primary-main"
    />
  );
}
