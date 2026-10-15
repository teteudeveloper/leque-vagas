"use client";

import { useRegistrarNavegacao } from "@/components/compartilhados/historico";

// Componente sem visual, montado uma vez no layout raiz.
export default function RegistroDeNavegacao() {
  useRegistrarNavegacao();
  return null;
}
