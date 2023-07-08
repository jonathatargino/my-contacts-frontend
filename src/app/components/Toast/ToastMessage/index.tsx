type ToastType = "default" | "success" | "danger";

interface ToastMessageProps {
  text: string;
  type?: ToastType;
}

import Image from "next/image";

import { checkCircleIcon, XCircleIcon } from "@/assets/images";
import classNames from "classnames";

export default function ToastMessage({ text, type = "default" }: ToastMessageProps) {
  const toastStyleVariants: Record<ToastType, string> = {
    default: "bg-primary-main",
    danger: "bg-danger-main",
    success: "bg-success-main",
  };

  return (
    <div
      className={classNames(
        "flex items-center justify-center gap-2 rounded px-8 py-4 text-white shadow-soft",
        toastStyleVariants[type],
      )}
    >
      {type === "success" ? <Image src={checkCircleIcon} alt="" /> : null}
      {type === "danger" ? <Image src={XCircleIcon} alt="" /> : null}
      <strong>{text}</strong>
    </div>
  );
}
