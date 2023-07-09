import Button, { ButtonProps } from "../Button";

export default function ModalAction({ children, ...props }: ButtonProps) {
  return <Button {...props}>{children}</Button>;
}
