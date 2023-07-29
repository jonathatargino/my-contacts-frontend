import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function ModalBody({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={twMerge("w-4/5 max-w-[450px] rounded bg-white p-6 shadow-soft [word-wrap:break-word]", className)}
    >
      {children}
    </div>
  );
}
