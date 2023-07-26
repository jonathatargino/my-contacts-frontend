"use client";

import { useState } from "react";
import SwitchLink, { MyContactsRoute } from "./SwitchLink";
import { usePathname } from "next/navigation";

export default function Switch() {
  const pathName = usePathname().slice(1);
  const [selectedRoute, setSelectedRoute] = useState<MyContactsRoute>(pathName as MyContactsRoute);

  function handleSwitchLinkClick(route: MyContactsRoute) {
    setSelectedRoute(route);
  }

  return (
    <>
      <div className="mx-auto grid max-w-[80%] grid-cols-2 overflow-hidden rounded border-2 border-primary-main">
        <SwitchLink route={"contacts"} selectedRoute={selectedRoute} onClick={handleSwitchLinkClick}>
          contatos
        </SwitchLink>
        <SwitchLink route={"categories"} selectedRoute={selectedRoute} onClick={handleSwitchLinkClick}>
          categorias
        </SwitchLink>
      </div>
    </>
  );
}
