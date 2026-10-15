"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { NAVEGACAO } from "@/lib/constantes";
import { cn } from "@/lib/utils";

// O link fica ativo na própria rota e nas rotas "filhas" (Vagas em /vagas/1),
// a menos que exista um item de menu mais específico para aquela URL
// (/vagas/nova acende "Publicar vaga", não "Vagas").
function estaAtivo(href: string, caminho: string) {
  if (href === "/") return caminho === "/";
  if (caminho === href) return true;
  if (!caminho.startsWith(`${href}/`)) return false;
  return !NAVEGACAO.some(
    (item) =>
      item.href.length > href.length &&
      (caminho === item.href || caminho.startsWith(`${item.href}/`)),
  );
}

export default function MenuLink({ href, children }: { href: string; children: ReactNode }) {
  const ativo = estaAtivo(href, usePathname());

  return (
    <Link
      className={cn(
        "border-b-2 border-transparent py-2.5 font-medium whitespace-nowrap transition-colors hover:border-violet-600 hover:text-violet-700 sm:py-6",
        ativo && "border-violet-600 text-violet-700",
      )}
      href={href}
      aria-current={ativo ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
