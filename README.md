# Leque de Vagas

> Vagas de tecnologia acolhedoras para pessoas em transição de carreira.

![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql&logoColor=white)

O **Leque de Vagas** reúne oportunidades de tecnologia que aceitam pessoas iniciantes ou em transição de carreira. No site é possível navegar pelas vagas, conhecer as empresas, publicar novas oportunidades e se candidatar em poucos passos.

O projeto foi construído ao longo da disciplina de desenvolvimento web com Next.js. Cada aula acrescentou uma camada: rotas, componentes, busca de dados com cache, formulários com Server Actions e banco de dados.

---

## Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Como executar localmente](#como-executar-localmente)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Scripts](#scripts)
- [Deploy na Vercel](#deploy-na-vercel)
- [Rotas](#rotas)
- [Diário das aulas](#diário-das-aulas)
- [Equipe](#equipe)

---

## Funcionalidades

- **Página inicial** com os números da plataforma calculados a partir dos dados reais, vagas em destaque, explicação do processo e chamada para empresas.
- **Lista de vagas** com contador de oportunidades e destaque para as que aceitam iniciantes.
- **Detalhe da vaga** com descrição estruturada (parágrafos, subtítulos e listas), etiquetas, card "Sobre a empresa", vagas parecidas, botão de copiar link e número de candidaturas.
- **Candidatura** com nome, e-mail e habilidades. A validação mostra mensagens em português, campo a campo, e cada e-mail só pode se candidatar uma vez à mesma vaga.
- **Publicação de vagas** por formulário, com guia de boas práticas, validação e redirecionamento para a vaga criada.
- **Arquivamento** de vagas publicadas pelo site. O registro é preservado, mas a vaga sai das listagens.
- **Perfil da empresa** com descrição, site e vagas abertas, além de um formulário de edição.
- **API pública** em JSON (`/api/vagas` e `/api/empresas/:slug`).
- **SEO**: títulos por página, descrições, Open Graph, `sitemap.xml` e `robots.txt`.
- **Acessibilidade**: link para pular ao conteúdo, foco visível, `aria-invalid` e `aria-describedby` nos campos com erro, e mensagens anunciadas a leitores de tela.
- **Resiliência**: se o GitHub falhar, o site usa a cópia dos JSON que vai junto com o deploy. Se o banco estiver indisponível, as listagens seguem com o catálogo e os formulários avisam que não foi possível salvar, sem apagar o que foi digitado.

## Tecnologias

| Camada     | Ferramenta                                                        |
| ---------- | ----------------------------------------------------------------- |
| Framework  | [Next.js 16](https://nextjs.org) (App Router, Turbopack)          |
| Interface  | React 19, Tailwind CSS 4, componentes no padrão shadcn/ui, Lucide |
| Linguagem  | TypeScript (modo `strict`)                                        |
| Validação  | Zod 4                                                             |
| Banco      | PostgreSQL + Prisma ORM                                           |
| Qualidade  | ESLint (`eslint-config-next`), Prettier                           |
| Hospedagem | Vercel                                                            |

## Arquitetura

```
leque-vagas/
├── app/                          # Rotas (App Router)
│   ├── (institucional)/          # Grupo de rotas: /termos e /privacidade
│   ├── api/                      # Route Handlers: /api/vagas, /api/empresas/[slug]
│   ├── empresas/[slug]/          # Perfil da empresa
│   │   └── editar/               # Formulário + Server Action de edição
│   ├── vagas/
│   │   ├── [id]/                 # Detalhe, candidatura, error, not-found
│   │   ├── nova/                 # Formulário + Server Action de publicação
│   │   └── acoes.ts              # Server Action de arquivar
│   ├── sobre/                    # Página sobre o projeto e a equipe
│   ├── layout.tsx                # Layout raiz: cabeçalho, rodapé, metadados
│   ├── error.tsx · not-found.tsx # Telas de erro e 404 gerais
│   └── sitemap.ts · robots.ts    # SEO
├── components/
│   ├── ui/                       # Primitivos visuais (button, input, select, card…)
│   ├── formularios/              # Campo, BotaoDeEnviar, AvisoDoFormulario, useFormulario
│   ├── compartilhados/           # Peças reutilizadas entre páginas
│   ├── layout/                   # Cabeçalho, menu e rodapé
│   ├── inicio/                   # Seções da página inicial (números, destaques)
│   └── vagas/                    # Componentes do domínio de vagas
├── lib/
│   ├── api.ts                    # Fachada única de acesso a dados
│   ├── dados/catalogo.ts         # Leitura dos JSON (fetch + cache)
│   ├── dados/banco.ts            # Prisma com leitura resiliente
│   ├── esquemas.ts               # Esquemas Zod dos formulários
│   ├── constantes.ts             # Áreas, senioridades, habilidades, menu, equipe
│   ├── conteudo.ts               # Textos institucionais compartilhados (passos, compromissos)
│   └── tipos.ts · formulario.ts · acoes.ts · site.ts · texto.ts · utils.ts
├── prisma/                       # schema.prisma e migrations
├── dados/                        # vagas.json e empresas.json (catálogo)
├── scripts/migrar.mjs            # Aplica migrations no build da Vercel
└── docker-compose.yml            # PostgreSQL para desenvolvimento
```

### Princípios

- **Uma porta de entrada para os dados.** Páginas e Server Actions só conversam com `lib/api.ts`. Nenhuma delas sabe se a vaga veio do JSON ou do banco. Veja as decisões em [`DADOS.md`](./DADOS.md).
- **Server Components por padrão.** Só descem para o navegador os componentes que precisam dele: menu ativo, botões de voltar e copiar, e formulários.
- **Componentes por domínio.** `ui/` não conhece regra de negócio, `vagas/` conhece, e as páginas apenas compõem.
- **Validação no servidor.** Toda Server Action valida com Zod e devolve um `Estado` padronizado (`ok`, `erros`, `valores`, `mensagem`) consumido pelo hook `useFormulario`.

## Como executar localmente

### Pré-requisitos

- Node.js 20.9 ou superior
- Docker, para o PostgreSQL local, ou qualquer PostgreSQL acessível

### Passo a passo

```bash
# 1. Instale as dependências (o Prisma Client é gerado automaticamente)
npm install

# 2. Crie o arquivo de ambiente
cp .env.example .env

# 3. Suba o PostgreSQL local (porta 5434)
npm run db:up

# 4. Crie as tabelas
npm run db:migrate

# 5. Rode o projeto
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

> Sem banco configurado, o site continua funcionando em modo leitura com as vagas do catálogo.

## Variáveis de ambiente

| Variável                | Obrigatória | Descrição                                                                                                   |
| ----------------------- | ----------- | ----------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`          | Para gravar | String de conexão do PostgreSQL usada pelo Prisma.                                                          |
| `DATABASE_URL_UNPOOLED` | Não         | Conexão direta (sem pooler) usada só pelas migrations no deploy. A integração do Neon a cria sozinha.       |
| `DADOS_URL`             | Não         | Endereço base dos JSON do catálogo. Padrão: pasta `dados/` da branch `homolog` no GitHub.                   |
| `NEXT_PUBLIC_SITE_URL`  | Não         | URL pública do site para metadados, sitemap e robots. Na Vercel, o domínio de produção é detectado sozinho. |

## Scripts

| Comando              | O que faz                                                   |
| -------------------- | ----------------------------------------------------------- |
| `npm run dev`        | Servidor de desenvolvimento com Turbopack                   |
| `npm run build`      | Gera o Prisma Client e o build de produção                  |
| `npm start`          | Sobe o build de produção                                    |
| `npm run lint`       | ESLint                                                      |
| `npm run typecheck`  | Gera os tipos de rota do Next e roda `tsc --noEmit`         |
| `npm run format`     | Formata o projeto com Prettier (`format:check` só verifica) |
| `npm run db:up`      | Sobe o PostgreSQL local com Docker                          |
| `npm run db:migrate` | Cria e aplica migrations em desenvolvimento                 |
| `npm run db:deploy`  | Aplica migrations pendentes (produção)                      |
| `npm run db:studio`  | Abre o Prisma Studio                                        |

Antes de abrir um PR, rode:

```bash
npm run lint && npm run typecheck && npm run format:check && npm run build
```

## Deploy na Vercel

1. **Crie o banco.** No painel do projeto na Vercel, abra **Storage** e conecte um PostgreSQL (Neon, Supabase ou Prisma Postgres) ao ambiente _Production_.
   - **Neon:** a integração cria `DATABASE_URL` (com pooler) e `DATABASE_URL_UNPOOLED` (direta, usada nas migrations).
   - **Supabase:** crie `DATABASE_URL` com o valor de `POSTGRES_PRISMA_URL`. As migrations usam `POSTGRES_URL_NON_POOLING`, que a integração já cria.
   - **Outro provedor:** crie `DATABASE_URL`. Se ele usar pooler, crie também `DATABASE_URL_UNPOOLED` com a conexão direta.
2. **Separe os previews.** Em _Settings → Environment Variables_, não reutilize o banco de produção no ambiente _Preview_. Use um banco separado (um branch do Neon, por exemplo) ou deixe a variável vazia. Sem ela, o preview sobe em modo leitura.
3. **Faça o deploy.** A Vercel roda o script `vercel-build`:
   ```
   prisma generate && node scripts/migrar.mjs && next build
   ```
   O `scripts/migrar.mjs` aplica as migrations pendentes (`prisma migrate deploy`) **só quando `VERCEL_ENV=production`**. Assim, uma migration ainda em revisão num PR nunca chega ao banco de produção. Sem banco configurado, a etapa é pulada.

> **Por que não SQLite?** Na Vercel o sistema de arquivos é somente leitura e efêmero. Um arquivo `.db` não guardaria nada entre requisições.

## Rotas

| Arquivo                                    | URL                            | Função                                         |
| ------------------------------------------ | ------------------------------ | ---------------------------------------------- |
| `app/page.tsx`                             | `/`                            | Página inicial                                 |
| `app/vagas/page.tsx`                       | `/vagas`                       | Lista de vagas                                 |
| `app/vagas/[id]/page.tsx`                  | `/vagas/1`                     | Detalhe da vaga e candidatura                  |
| `app/vagas/nova/page.tsx`                  | `/vagas/nova`                  | Publicar vaga                                  |
| `app/empresas/[slug]/page.tsx`             | `/empresas/aurora-tech`        | Perfil da empresa e suas vagas                 |
| `app/empresas/[slug]/editar/page.tsx`      | `/empresas/aurora-tech/editar` | Editar perfil da empresa                       |
| `app/sobre/page.tsx`                       | `/sobre`                       | Sobre o projeto e a equipe                     |
| `app/(institucional)/termos/page.tsx`      | `/termos`                      | Termos de uso                                  |
| `app/(institucional)/privacidade/page.tsx` | `/privacidade`                 | Privacidade                                    |
| `app/api/vagas/route.ts`                   | `GET /api/vagas`               | Vagas abertas em JSON                          |
| `app/api/empresas/[slug]/route.ts`         | `GET /api/empresas/:slug`      | Perfil da empresa em JSON (404 se não existir) |
| `app/vagas/[id]/not-found.tsx`             | `/vagas/999`                   | Vaga inexistente (HTTP 404)                    |
| `app/empresas/[slug]/not-found.tsx`        | `/empresas/nada`               | Empresa inexistente (HTTP 404)                 |
| `app/not-found.tsx`                        | qualquer URL inválida          | 404 geral                                      |

### Tabela do build

```
Route (app)                   Revalidate  Expire
┌ ○ /
├ ƒ /api/empresas/[slug]
├ ƒ /api/vagas
├   /empresas/[slug]
│ ├ ● /empresas/aurora-tech           5m      1y
│ ├ ● /empresas/mare-digital          5m      1y
│ └ ● /empresas/nuvem-norte           5m      1y
├ ƒ /empresas/[slug]/editar
├ ○ /sitemap.xml                      5m      1y
├ ○ /vagas                            5m      1y
├   /vagas/[id]
│ ├ ● /vagas/1                        5m      1y
│ └ ● [+5 more paths]
└ ○ /vagas/nova                       1h      1y
```

- `○` estática, `●` pré-gerada com `generateStaticParams`, `ƒ` dinâmica.
- As vagas publicadas depois do build são montadas na primeira visita.
- As Server Actions chamam `revalidatePath`, então quem publica, arquiva, edita ou se candidata vê o resultado na hora, sem esperar o `revalidate`.

## Diário das aulas

<details>
<summary><strong>Aula 01: ambiente e componentes</strong></summary>

Um componente é uma parte independente da interface que pode ser reutilizada. O cabeçalho é escrito uma vez em `components/layout/Cabecalho.tsx` e colocado no layout raiz, então qualquer mudança aparece em todas as páginas. A navegação interna usa `Link`, e o layout define o `metadata` com o template de título `%s | Leque de Vagas`.

</details>

<details>
<summary><strong>Aula 02: mapa de rotas</strong></summary>

A pasta `[id]` funciona como um molde: em vez de uma página por vaga, o Next.js lê o `id` da URL e a página busca o registro correspondente. O grupo `(institucional)` organiza `/termos` e `/privacidade` sem adicionar esse nome ao endereço.

O link **Vagas** do menu fica ativo também em `/vagas/1`, porque o detalhe pertence à área de vagas. A exceção é `/vagas/nova`, que tem item próprio (**Publicar vaga**).

</details>

<details>
<summary><strong>Aula 03: a fronteira entre servidor e cliente</strong></summary>

| Arquivo                                         | Por que é Client Component                                                                |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `app/**/error.tsx`                              | O boundary de erro roda no navegador para oferecer `retry()`, que busca os dados de novo. |
| `components/layout/MenuLink.tsx`                | Usa `usePathname` para marcar o item ativo.                                               |
| `components/compartilhados/BotaoVoltar.tsx`     | Usa `useRouter().back()`, com `/vagas` como destino quando não há histórico.              |
| `components/compartilhados/BotaoCopiarLink.tsx` | Usa a Clipboard API, com fallback para navegadores antigos.                               |
| `app/**/formulario.tsx`                         | Usam `useActionState` para mostrar erros e o estado de envio.                             |

Layouts e páginas continuam sendo Server Components. O carregamento inicial fica menor, e só os controles interativos descem para o navegador.

</details>

<details>
<summary><strong>Aula 04: a página que busca</strong></summary>

- As vagas e empresas do catálogo ficam em `dados/*.json` e são buscadas pelo endereço cru do GitHub (`lib/dados/catalogo.ts`). Todo `fetch` confere `resposta.ok` antes do `.json()`, para um 404 não virar `Unexpected token '<'`.
- **Cache:** vagas com `revalidate: 300` (o próprio GitHub responde com `max-age=300`) e empresas com `revalidate: 3600`, porque mudam menos. Cada `fetch` tem uma tag (`vagas` e `empresas`).
- **Streaming:** `app/vagas/page.tsx` não é `async`. O título chega na hora, e o contador e a lista carregam em `<Suspense>` separados, com esqueletos da mesma altura do conteúdo real. Na página de detalhe, só as "Vagas parecidas" ficam num `<Suspense>`.
- **Por que não há `loading.tsx` em `/vagas`:** um `loading.tsx` faz o streaming começar antes da página decidir se a vaga existe. Com isso, `/vagas/999` responderia HTTP 200 em vez de 404, e esse 200 ficaria no cache. Os `<Suspense>` dentro da página dão o mesmo efeito visual sem esse problema.
- **Erros:** `notFound()` trata o que não existe (`/vagas/999`). O `error.tsx` trata o que falhou (banco fora do ar, por exemplo), com um botão que chama `retry()`. Se o GitHub falhar, o catálogo usa a cópia local de `dados/`.
- **Metadados:** rotas dinâmicas usam `generateMetadata`. A busca repetida entre metadata e página não vai duas vezes à fonte: o `fetch` do catálogo é memoizado pelo Next, e as leituras do banco passam por `cache()` do React (`lib/api.ts`).

</details>

<details>
<summary><strong>Aula 05: formulários e Server Actions</strong></summary>

- Os formulários de publicar vaga, candidatura e editar empresa enviam para Server Actions (`acoes.ts` ao lado de cada rota).
- Os esquemas Zod ficam em `lib/esquemas.ts`, e as opções dos `<select>` vêm de `lib/constantes.ts`, para o formulário e a validação nunca discordarem.
- O hook `useFormulario` combina `useActionState` com envio pelo `onSubmit`. Assim, o React não limpa os campos depois da resposta e a pessoa corrige só o que estava errado. O `action` do `<form>` continua lá para funcionar sem JavaScript.
- `BotaoDeEnviar` desabilita o botão e troca o texto enquanto envia.

</details>

<details>
<summary><strong>Aula 06: banco de dados com Prisma</strong></summary>

- `prisma/schema.prisma` define `Vaga`, `Empresa` e `Candidatura` em PostgreSQL.
- O banco guarda o que nasce pelo site, e o JSON continua sendo o catálogo. `lib/api.ts` junta as duas fontes.
- As decisões de modelagem (empresa editada vence o JSON, candidatura sem chave estrangeira, arquivamento lógico, resiliência) estão em [`DADOS.md`](./DADOS.md).

</details>

## Equipe

| Integrante                |
| ------------------------- |
| **Matheus Ramalho**       |
| **Caio Graciano Nobrega** |
| **Rodolfo Santiago**      |
| **João Victor Andrade**   |

---

<sub>Projeto acadêmico, sem fins comerciais. As vagas e empresas exibidas são fictícias.</sub>
