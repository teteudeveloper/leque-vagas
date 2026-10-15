import type { Metadata } from "next";
import { Check } from "lucide-react";
import CabecalhoDaPagina from "@/components/compartilhados/CabecalhoDaPagina";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listarEmpresas } from "@/lib/api";
import FormularioDeVaga from "./formulario";

export const metadata: Metadata = {
  title: "Publicar vaga",
  description:
    "Publique uma vaga de tecnologia com área, senioridade, formato de trabalho e requisitos descritos, e sinalize se ela aceita iniciantes.",
};

const BOAS_PRATICAS = [
  "Use um título que diga a função e a senioridade, como “Pessoa Desenvolvedora Back-end Júnior”.",
  "Descreva o dia a dia e com quem a pessoa vai trabalhar, não só a lista de tecnologias.",
  "Separe o que é obrigatório do que a pessoa pode aprender na vaga.",
  "Se a vaga aceita quem está começando, marque a opção “Aceita iniciantes”. Assim, ela passa a exibir o selo na lista de vagas.",
];

export default async function PublicarVaga() {
  const empresas = await listarEmpresas();

  return (
    <section>
      <CabecalhoDaPagina
        sobretitulo="Para empresas"
        titulo="Publique uma vaga"
        descricao="A vaga é publicada imediatamente e passa a aceitar candidaturas. Todos os campos são obrigatórios, exceto a opção “Aceita iniciantes”."
      />
      <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr] lg:gap-16">
        <FormularioDeVaga empresas={empresas} />
        <Card className="h-max lg:sticky lg:top-8">
          <CardHeader>
            <CardTitle>Como escrever uma boa vaga</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-3 text-sm leading-relaxed text-slate-600">
              {BOAS_PRATICAS.map((dica) => (
                <li key={dica} className="flex gap-2.5">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-violet-700" />
                  {dica}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
