import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function ModalActions({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={twMerge("mt-8 flex items-center justify-end gap-2", className)}>
      {children}
    </div>
  );
}
