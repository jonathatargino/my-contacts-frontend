"use client";

import Image from "next/image";

import { checkCircleIcon, XCircleIcon } from "@/assets/images";
import classNames from "classnames";
import { Toast, ToastType } from "@/provider/toast";
import { useEffect } from "react";

interface ToastMessageProps extends Toast {
  onRemoveMessage: (id: number) => void;
}

export default function ToastMessage({ id, text, type = "default", onRemoveMessage }: ToastMessageProps) {
  const toastStyleVariants: Record<ToastType, string> = {
    default: "bg-primary-main",
    danger: "bg-danger-main",
    success: "bg-success-main",
  };

  function handleRemoveToast() {
    onRemoveMessage(id);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => onRemoveMessage(id), 7000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [id, onRemoveMessage]);

  return (
    <div
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
      className={classNames(
        "flex cursor-pointer items-center justify-center gap-2 rounded px-8 py-4 text-white shadow-soft",
        toastStyleVariants[type],
      )}
    >
      {type === "success" ? <Image src={checkCircleIcon} alt="" /> : null}
      {type === "danger" ? <Image src={XCircleIcon} alt="" /> : null}
      <strong>{text}</strong>
    </div>
  );
}
