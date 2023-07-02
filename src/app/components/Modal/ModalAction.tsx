import { ButtonHTMLAttributes } from "react";
import Button from "../Button";

export default function ModalAction({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <Button {...props}>{children}</Button>;
}
