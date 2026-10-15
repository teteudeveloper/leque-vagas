import type { Metadata, Viewport } from "next";
import RegistroDeNavegacao from "@/components/compartilhados/RegistroDeNavegacao";
import Cabecalho from "@/components/layout/Cabecalho";
import Rodape from "@/components/layout/Rodape";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.nome, template: `%s | ${SITE.nome}` },
  description: SITE.descricao,
  applicationName: SITE.nome,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE.nome,
  },
};

export const viewport: Viewport = { themeColor: "#6d28d9" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-dvh flex-col">
        <a
          href="#conteudo"
          className="sr-only rounded-lg bg-violet-700 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
        >
          Pular para o conteúdo
        </a>
        <Cabecalho />
        <main id="conteudo" className="mx-auto w-[min(1080px,calc(100%-2.5rem))] flex-1">
          {children}
        </main>
        <Rodape />
        <RegistroDeNavegacao />
      </body>
    </html>
  );
}
