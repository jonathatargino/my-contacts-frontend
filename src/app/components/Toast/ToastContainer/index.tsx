import ToastMessage from "../ToastMessage";

export default function ToastContainer() {
  return (
    <div className="fixed bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col justify-center gap-3 ">
      <ToastMessage text="Default toast" />
      <ToastMessage text="Error toast" type="danger" />
      <ToastMessage text="Success toast" type="success" />
    </div>
  );
}
