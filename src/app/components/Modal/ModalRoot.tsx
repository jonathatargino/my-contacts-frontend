"use client";

import classNames from "classnames";
import { HTMLAttributes } from "react";
import ReactDOM from "react-dom";
import { twMerge } from "tailwind-merge";

interface ModalRootProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
}

export default function ModalRoot({ children, open, className, ...props }: ModalRootProps) {
  return ReactDOM.createPortal(
    <div
      {...props}
      className={twMerge(
        classNames(
          "fixed left-0 top-0 hidden h-full w-full items-center justify-center bg-[rgba(0,0,0,0.6)] backdrop-blur-sm",
          { flex: open },
        ),
        className,
      )}
    >
      {children}
    </div>,
    document.body,
  );
}
