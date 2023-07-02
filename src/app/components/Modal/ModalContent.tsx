import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function ModalContent({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={twMerge("mb-2", className)}>
      {children}
    </div>
  );
}
