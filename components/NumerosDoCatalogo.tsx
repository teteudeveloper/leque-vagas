import { prisma } from "@/lib/prisma";

export default async function NumerosDoCatalogo() {
  const vagasDoBanco = await prisma.vaga.count({ where: { arquivada: false } });
  
  const publicadas = await fetch("https://raw.githubusercontent.com/teteudeveloper/leque-vagas/homolog/dados/vagas.json")
    .then((r) => r.json())
    .catch(() => []); // O count() no banco só conta as do banco, então eu precisaria somar com as do JSON.

  const iniciantes = await prisma.vaga.count({ where: { arquivada: false, aceitaIniciante: true } }) + publicadas.filter((v: any) => v.aceitaIniciante).length;

  return (
    <span className="contador">
      {vagasDoBanco + publicadas.length} vagas · {iniciantes} aceitam quem está começando
    </span>
  );
}
