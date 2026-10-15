import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

export type PropsDoControle = {
  id: string;
  name: string;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
  "aria-required"?: true;
};

type Props = {
  nome: string;
  rotulo: string;
  erro?: string;
  dica?: string;
  obrigatorio?: boolean;
  children: (controle: PropsDoControle) => ReactNode;
};

// Rótulo + controle + dica + erro, já ligados por id para leitores de tela.
// O controle recebe as props prontas: <Campo>{(p) => <Input {...p} />}</Campo>
export default function Campo({ nome, rotulo, erro, dica, obrigatorio = true, children }: Props) {
  const id = `campo-${nome}`;
  const idDaDica = dica ? `${id}-dica` : undefined;
  const idDoErro = erro ? `${id}-erro` : undefined;
  const descritoPor = [idDaDica, idDoErro].filter(Boolean).join(" ") || undefined;

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>
        {rotulo}
        {!obrigatorio && <span className="ml-1 font-normal text-slate-500">(opcional)</span>}
      </Label>
      {children({
        id,
        name: nome,
        "aria-invalid": erro ? true : undefined,
        "aria-describedby": descritoPor,
        "aria-required": obrigatorio ? true : undefined,
      })}
      {dica && (
        <p id={idDaDica} className="text-sm text-slate-500">
          {dica}
        </p>
      )}
      {erro && <MensagemDeErro id={idDoErro}>{erro}</MensagemDeErro>}
    </div>
  );
}

export function MensagemDeErro({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <p id={id} className="text-sm font-medium text-red-600">
      {children}
    </p>
  );
}
