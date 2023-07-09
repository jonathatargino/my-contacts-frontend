import { Toast } from "@/provider/toast";
import EventManager from "@/lib/EventManager";

type ToastEvent = "addtoast";

export const toastEventManager = new EventManager<ToastEvent>();

export default function useToast(detail: Omit<Toast, "id">) {
  toastEventManager.emit("addtoast", detail);
}
