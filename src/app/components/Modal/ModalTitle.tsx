import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function ModalTitle({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 {...props} className={twMerge("mb-2 text-2xl font-bold", className)}>
      {children}
    </h1>
  );
}
