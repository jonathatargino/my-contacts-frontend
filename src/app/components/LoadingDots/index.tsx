import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function LoadingDots({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className={twMerge("h-4 w-4 animate-pulse rounded-full bg-primary-main", className)} {...props}></div>
      <div className={twMerge("h-4 w-4 animate-pulse rounded-full bg-primary-main", className)} {...props}></div>
      <div className={twMerge("h-4 w-4 animate-pulse rounded-full bg-primary-main", className)} {...props}></div>
    </div>
  );
}
