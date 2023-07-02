import { HTMLAttributes } from "react";

export default function ModalDescription({ children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span {...props}>{children}</span>;
}
