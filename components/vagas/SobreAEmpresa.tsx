import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Empresa } from "@/lib/tipos";

export default function SobreAEmpresa({ empresa }: { empresa: Empresa }) {
  return (
    <Card className="h-max">
      <CardHeader>
        <p className="text-xs font-extrabold tracking-[0.12em] text-violet-700 uppercase">
          Sobre a empresa
        </p>
        <CardTitle className="mt-1">{empresa.nome}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-slate-600">{empresa.sobre}</p>
        <Link
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-violet-700 hover:underline"
          href={`/empresas/${empresa.slug}`}
        >
          Ver perfil e outras vagas
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
