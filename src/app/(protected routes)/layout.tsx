import AuthService from "@/services/AuthService";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import NotAuthorizedPage from "../components/NotAuthorizedPage";

export default async function ProtectedRoutesLayout({ children }: { children: ReactNode }) {
  const authToken = cookies().get("authToken")?.value as string;
  const { authorized } = await AuthService.validateToken(authToken);

  if (!authorized) {
    return <NotAuthorizedPage />;
  }

  return <>{children}</>;
}
