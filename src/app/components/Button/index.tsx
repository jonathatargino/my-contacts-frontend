import { ButtonHTMLAttributes } from "react";

export default function Button({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        "h-[52px] w-full rounded bg-primary-main font-bold text-white shadow-soft transition-colors hover:bg-primary-light active:bg-primary-dark disabled:cursor-default disabled:bg-[#ccc]"
      }
    >
      {children}
    </button>
  );
}
