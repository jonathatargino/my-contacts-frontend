"use client";

import { ReactNode } from "react";

import { Switch } from "@/app/components";
import Image from "next/image";
import { logoutIcon } from "@/assets/images";
import { deleteCookie } from "cookies-next";
import AuthService from "@/services/AuthService";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  async function handleLogout() {
    deleteCookie("authToken");
    await AuthService.logout();
    router.push("/");
  }

  return (
    <>
      <Image
        className="absolute left-16 top-[68px] cursor-pointer rounded hover:bg-[rgba(0,0,0,0.1)]"
        src={logoutIcon}
        alt="Fazer logout"
        onClick={handleLogout}
      />
      <div className="mt-4">
        <Switch />
        <div className="mt-7">{children}</div>
      </div>
    </>
  );
}
