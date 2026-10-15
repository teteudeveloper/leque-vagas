import { Badge } from "@/components/ui/badge";
import type { Vaga } from "@/lib/tipos";

export default function EtiquetasDaVaga({ vaga }: { vaga: Vaga }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Características da vaga">
      <li>
        <Badge>{vaga.senioridade}</Badge>
      </li>
      <li>
        <Badge>{vaga.local}</Badge>
      </li>
      {vaga.aceitaIniciante && (
        <li>
          <Badge className="bg-emerald-50 text-emerald-700">Aceita iniciantes</Badge>
        </li>
      )}
    </ul>
  );
}
