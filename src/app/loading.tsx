export default function Loading() {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center gap-2 bg-[rgba(246,245,252,0.8)]">
      <div className="h-4 w-4 animate-pulse rounded-full bg-primary-main"></div>
      <div className="h-4 w-4 animate-pulse rounded-full bg-primary-main"></div>
      <div className="h-4 w-4 animate-pulse rounded-full bg-primary-main"></div>
    </div>
  );
}
