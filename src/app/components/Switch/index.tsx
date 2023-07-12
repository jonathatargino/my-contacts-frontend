"use client";

import { useState } from "react";
import SwitchLink, { MyContactsRoute } from "./SwitchLink";

export default function Switch() {
  const [selectedRoute, setSelectedRoute] = useState<MyContactsRoute>("contacts");

  function handleSwitchLinkClick(route: MyContactsRoute) {
    setSelectedRoute(route);
  }

  return (
    <>
      <div className="mx-auto grid max-w-[80%] grid-cols-2 overflow-hidden rounded border-2 border-primary-main">
        <SwitchLink route={"contacts"} selectedRoute={selectedRoute} onClick={handleSwitchLinkClick} />
        <SwitchLink route={"categories"} selectedRoute={selectedRoute} onClick={handleSwitchLinkClick} />
      </div>
    </>
  );
}
