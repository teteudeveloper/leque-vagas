# Decisões de dados

Este documento registra as decisões sobre de onde vêm os dados do Leque de Vagas e como o banco se encaixa no catálogo publicado em JSON.

## Duas fontes, uma porta de entrada

| Fonte                               | O que guarda                                               | Quem escreve        |
| ----------------------------------- | ---------------------------------------------------------- | ------------------- |
| `dados/vagas.json`                  | Vagas do catálogo                                          | Equipe, por commit  |
| `dados/empresas.json`               | Empresas do catálogo                                       | Equipe, por commit  |
| PostgreSQL (`prisma/schema.prisma`) | Vagas publicadas pelo site, perfis editados e candidaturas | Formulários do site |

Nenhuma página sabe de qual fonte um dado veio. Todas chamam as funções de `lib/api.ts`, que juntam as duas fontes:

- `lib/dados/catalogo.ts` busca os JSON pela rede, com cache (`revalidate`) e tags.
- `lib/dados/banco.ts` envolve o Prisma: leituras com reserva e escritas que exigem banco.

## Decisões

1. **Tipo `Vaga` separado do model do Prisma.** O `type Vaga` em `lib/tipos.ts` descreve o que a interface usa. O model do banco tem campos de controle (`criadaEm`, `arquivada`) que não devem chegar às páginas, então `lib/api.ts` copia campo a campo.
2. **Empresa editada vence a do JSON.** Ao editar um perfil, o site grava um registro com o mesmo `slug` no banco. `listarEmpresas()` sobrepõe o JSON com esse registro, e o nome novo passa a aparecer também nas vagas da empresa.
3. **Candidatura sem chave estrangeira.** A vaga pode estar no banco ou no JSON, então `Candidatura.vagaId` é um texto comum, indexado. A Server Action confere se a vaga existe nas duas fontes (`buscarVaga`) antes de gravar.
4. **Uma candidatura por e-mail em cada vaga.** A chave única `(vagaId, email)` impede envios repetidos, e o formulário mostra uma mensagem clara quando isso acontece.
5. **Arquivar não apaga.** A vaga recebe `arquivada = true` e some das listagens, mas o registro e as candidaturas continuam no banco. Só vagas publicadas pelo site podem ser arquivadas. As do catálogo moram no JSON, e o botão nem aparece para elas.
6. **O banco é um complemento, não um ponto único de falha.** Se `DATABASE_URL` não estiver configurada ou o banco cair, as leituras seguem só com o catálogo (`lerDoBanco`) e os formulários avisam que não foi possível salvar, sem perder o que a pessoa digitou.
7. **PostgreSQL em vez de SQLite.** Na Vercel o sistema de arquivos é somente leitura e efêmero, então um arquivo `dev.db` não guarda nada entre requisições. O projeto usa PostgreSQL tanto em produção (Neon, Supabase ou Prisma Postgres) quanto localmente (`docker compose up -d db`).
