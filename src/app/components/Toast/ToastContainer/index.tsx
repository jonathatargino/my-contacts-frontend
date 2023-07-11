"use client";

import { useCallback, useEffect, useState } from "react";

import { ToastMessage } from "@/app/components";
import { Toast } from "@/types";
import { toastEventManager } from "@/hooks/useToast";

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const handleRemoveMessage = useCallback((id: number) => {
    setToasts((prevState) => prevState.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    function handleAddToast(payload: any) {
      const { text, type } = payload as Omit<Toast, "id">;
      setToasts((prevState) => [...prevState, { id: Math.random(), text, type }]);
    }

    toastEventManager.on("addtoast", handleAddToast);

    return () => toastEventManager.remove("addtoast", handleAddToast);
  }, []);

  return (
    <div className="fixed bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col justify-center gap-3">
      {toasts.map((toast) => (
        <ToastMessage
          key={toast.id}
          id={toast.id}
          text={toast.text}
          type={toast.type}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </div>
  );
}
