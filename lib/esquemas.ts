import { z } from "zod";
import { AREAS, HABILIDADES, SENIORIDADES } from "@/lib/constantes";

// O que chega do formulário é sempre texto. Os esquemas limpam espaços,
// conferem regras e devolvem mensagens em português, campo a campo.

const texto = () => z.string("Preencha este campo.").trim();

export const EsquemaDaVaga = z.object({
  titulo: texto()
    .min(5, "O título precisa de pelo menos 5 caracteres.")
    .max(120, "O título pode ter no máximo 120 caracteres."),
  empresaSlug: texto().min(1, "Escolha a empresa."),
  area: z.enum(AREAS, "Escolha a área."),
  senioridade: z.enum(SENIORIDADES, "Escolha a senioridade."),
  local: texto()
    .min(3, "Informe o formato de trabalho e, se houver, a cidade. Ex.: Remoto, Híbrido · Recife.")
    .max(80, "O local pode ter no máximo 80 caracteres."),
  descricao: texto()
    .min(80, "Descreva a vaga com pelo menos 80 caracteres.")
    .max(2000, "A descrição pode ter no máximo 2.000 caracteres."),
  aceitaIniciante: z
    .literal("on")
    .optional()
    .transform((valor) => valor === "on"),
});

export const EsquemaDaEmpresa = z.object({
  nome: texto()
    .min(2, "O nome precisa de pelo menos 2 caracteres.")
    .max(80, "O nome pode ter no máximo 80 caracteres."),
  sobre: texto()
    .min(40, "Apresente a empresa com pelo menos 40 caracteres.")
    .max(600, "A apresentação da empresa pode ter no máximo 600 caracteres."),
  site: texto().pipe(
    z.url({
      protocol: /^https?$/,
      error: "Informe o endereço completo, começando com https://.",
    }),
  ),
});

export const EsquemaDaCandidatura = z.object({
  vagaId: texto().min(1, "Vaga não informada."),
  nome: texto()
    .min(3, "Informe seu nome completo.")
    .max(100, "O nome pode ter no máximo 100 caracteres."),
  email: texto().toLowerCase().pipe(z.email("Informe um e-mail válido, como nome@exemplo.com.")),
  habilidades: z
    .array(z.enum(HABILIDADES))
    .min(1, "Escolha pelo menos uma habilidade.")
    .max(HABILIDADES.length),
});

export const EsquemaDeArquivar = z.object({
  id: texto().min(1, "Vaga não informada."),
});
