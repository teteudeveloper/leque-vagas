"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function MenuLink({ href, children }: { href: string; children: ReactNode }) {
  const caminho = usePathname();
  const ativo = href === "/" ? caminho === "/" : caminho === href || caminho.startsWith(`${href}/`);
  return (
    <Link
      className={ativo ? "ativo" : undefined}
      href={href}
      aria-current={ativo ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
