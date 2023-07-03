import { HTMLAttributes } from "react";

interface InputWrapper extends HTMLAttributes<HTMLDivElement> {
  errorMessage?: string;
}

export default function InputWrapper({ children, errorMessage }: InputWrapper) {
  return (
    <div className="flex w-full flex-col gap-2">
      {children}
      {errorMessage ? <small className="text-xs text-danger-main">{errorMessage}</small> : null}
    </div>
  );
}
