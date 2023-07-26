import classNames from "classnames";
import Link from "next/link";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type MyContactsRoute = "contacts" | "categories";

interface SwitchLinkProps {
  route: MyContactsRoute;
  selectedRoute: MyContactsRoute;
  onClick: (route: MyContactsRoute) => void;
  children: ReactNode;
}

export default function SwitchLink({ route, selectedRoute, onClick, children }: SwitchLinkProps) {
  return (
    <Link
      href={`/${route}`}
      onClick={() => onClick(route)}
      className={twMerge(
        classNames(
          "bg-white text-center font-bold text-primary-main transition-colors hover:bg-primary-dark hover:text-white active:bg-primary-light",
          {
            "cursor-default bg-primary-main text-white hover:bg-primary-main active:bg-primary-main":
              selectedRoute === route,
          },
        ),
      )}
    >
      {children}
    </Link>
  );
}
