import Link from "next/link";
import { arquivar } from "@/app/vagas/acoes";
import BotaoDeEnviar from "@/components/BotaoDeEnviar";

export default function CardDeVaga({ vaga }: { vaga: any }) {
  return (
    <article className="cartao" style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Link href={`/vagas/${vaga.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3>{vaga.titulo}</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>{vaga.empresa} · {vaga.local || vaga.area}</p>
        </Link>
      </div>

      <form action={arquivar}>
        <input type="hidden" name="id" value={vaga.id} />
        <BotaoDeEnviar enviando="Arquivando…">Arquivar</BotaoDeEnviar>
      </form>
    </article>
  );
}
