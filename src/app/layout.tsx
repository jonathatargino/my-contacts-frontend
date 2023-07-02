import { Sora } from "next/font/google";

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
      <body className={sora.className}>{children}</body>
    </html>
  );
}
