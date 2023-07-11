import Image from "next/image";
import { Sora } from "next/font/google";
import "./globals.css";

import { logoIcon } from "@/assets/images";
import { Providers, ToastContainer } from "@/app/components";

const sora = Sora({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "MyContacts",
  description: "Organize seus contatos com facilidade",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${sora.className} mx-auto w-full max-w-[500px] bg-app-bg px-4 py-16 text-gray-900`}>
        <Providers>
          <ToastContainer />
          <Image src={logoIcon} alt="myContacts" className="mx-auto mb-12" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
