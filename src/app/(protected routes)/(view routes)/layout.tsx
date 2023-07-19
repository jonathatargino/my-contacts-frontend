import { ReactNode } from "react";

import { Switch } from "@/app/components";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4">
      <Switch />
      <div className="mt-7">{children}</div>
    </div>
  );
}
