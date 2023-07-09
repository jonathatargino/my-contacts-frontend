export type ToastType = "default" | "success" | "danger";

export interface Toast {
  id: number;
  text: string;
  type?: ToastType;
}
