import type { Metadata } from "next";
import Cabecalho from "@/components/Cabecalho";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Leque de Vagas", template: "%s | Leque de Vagas" },
  description: "Vagas de tecnologia para quem está em transição de carreira.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <Cabecalho />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
