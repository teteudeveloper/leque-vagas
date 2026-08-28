"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
export default function MenuLink({ href, children }: { href: string; children: ReactNode }) {
  const caminho = usePathname();
  const ativo = href === "/" ? caminho === "/" : caminho === href || caminho.startsWith(`${href}/`);
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
