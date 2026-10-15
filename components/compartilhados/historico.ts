"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Guarda, enquanto a aba estiver aberta, se a pessoa já navegou DENTRO do site.
// Só nesse caso "voltar no histórico" mantém a pessoa no Leque de Vagas.
let navegouNoSite = false;

export function jaNavegouNoSite() {
  return navegouNoSite;
}

export function useRegistrarNavegacao() {
  const caminho = usePathname();
  const primeiro = useRef(caminho);

  useEffect(() => {
    if (caminho !== primeiro.current) navegouNoSite = true;
  }, [caminho]);
}
