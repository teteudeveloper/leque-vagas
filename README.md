# Leque de Vagas

Projeto desenvolvido nos desafios técnicos das aulas 01, 02, 03 e 04 de Next.js. A proposta é criar um site de oportunidades de tecnologia para pessoas em transição de carreira.

## Como executar

```bash
npm install
npm run dev
```

Para validar uma entrega de produção:

```bash
npm run lint
npm run build
npm start
```

## Aula 01 — ambiente e componentes

O projeto usa Next.js 16.3.2, App Router, TypeScript e CSS comum. Um componente é uma parte independente da interface que pode ser reutilizada. Escrever o cabeçalho uma vez no arquivo `components/Cabecalho.tsx` e colocá-lo no layout evita duplicação e faz qualquer mudança aparecer em todas as páginas.

O cabeçalho usa `Link` para navegação interna e o layout define metadata para o título da aba. A rota `/sobre` também está ligada à home.

## Aula 02 — mapa de rotas

| Arquivo | URL | Função |
| --- | --- | --- |
| `app/page.tsx` | `/` | Home |
| `app/sobre/page.tsx` | `/sobre` | Sobre o projeto |
| `app/vagas/page.tsx` | `/vagas` | Listagem das seis vagas |
| `app/vagas/[id]/page.tsx` | `/vagas/1` (e demais IDs) | Detalhe dinâmico da vaga |
| `app/vagas/loading.tsx` | `/vagas` | Estado de carregamento |
| `app/vagas/[id]/error.tsx` | `/vagas/:id` | Erro isolado da vaga, com retry |
| `app/vagas/[id]/not-found.tsx` | `/vagas/9999` | Vaga inexistente |
| `app/not-found.tsx` | qualquer URL inválida | 404 geral |
| `app/empresas/[slug]/page.tsx` | `/empresas/aurora-tech` | Vagas filtradas por empresa |
| `app/(institucional)/termos/page.tsx` | `/termos` | Termos de uso |
| `app/(institucional)/privacidade/page.tsx` | `/privacidade` | Privacidade |

A pasta `[id]` funciona como um molde: em vez de criar uma página para cada vaga, o Next.js lê o `id` da URL e a página procura o registro correspondente no arquivo de dados. O grupo `(institucional)` organiza os arquivos sem adicionar esse nome ao endereço.

O link `Vagas` fica ativo também em `/vagas/1`. A decisão faz sentido porque o detalhe continua pertencendo à área de vagas e ajuda a pessoa a se localizar no menu.

## Aula 03 — A fronteira

| Arquivo | Por que é Client Component |
| --- | --- |
| `app/vagas/[id]/error.tsx` | O boundary de erro precisa executar no navegador para oferecer `reset()` e permitir tentar novamente. |
| `components/MenuLink.tsx` | Usa `usePathname`, que lê a URL atual no navegador para marcar o menu ativo. |
| `components/BotaoVoltar.tsx` | Usa `useRouter().back()` para executar a ação de voltar no histórico ao clicar; um `Link` comum só conhece um destino fixo. |
| `components/BotaoCopiarLink.tsx` | Precisa do clique e da Clipboard API do navegador. Recebe o título da vaga como prop serializável. |

Todos os `layout.tsx` e `page.tsx` continuam Server Components. Os componentes de cliente são pequenos e têm uma responsabilidade. A pessoa usuária ganha carregamento inicial menor e uma resposta rápida: só os controles que precisam do navegador descem para o cliente, enquanto o conteúdo continua sendo renderizado no servidor.

Na página de detalhe há um `console.log` com o prefixo `[servidor]`. Ao acessar `/vagas/1` durante `npm run dev`, ele aparece no terminal do servidor. O botão **Copiar link da vaga** copia a URL atual e oferece um fallback para navegadores em que a Clipboard API não esteja disponível.

## Aula 04 — A página que busca

### De onde vêm os dados

As vagas e as empresas não moram mais dentro do código. Elas estão em `dados/vagas.json` e `dados/empresas.json`, na raiz do repositório, e o site as busca pelo endereço cru do GitHub:

```
https://raw.githubusercontent.com/teteudeveloper/leque-vagas/homolog/dados/vagas.json
https://raw.githubusercontent.com/teteudeveloper/leque-vagas/homolog/dados/empresas.json
```

| Arquivo | Papel |
| --- | --- |
| `lib/tipos.ts` | Só os tipos `Vaga` e `Empresa`. JSON não tem tipo, então o TypeScript continua tendo o dele aqui. |
| `lib/api.ts` | O único arquivo que conhece a URL e o único que faz `fetch`: `listarVagas`, `buscarVaga`, `listarEmpresas`, `buscarEmpresa`. |

Nenhuma página conhece a URL. Quando a API do Spring Boot ficar pronta, muda só a constante `FONTE` no `lib/api.ts`. Todo `fetch` confere `resposta.ok` antes do `.json()`: sem isso, um 404 do GitHub devolve HTML e o erro vira `Unexpected token '<'`.

### A escolha de cache

| Dado | `revalidate` | Por quê |
| --- | --- | --- |
| Vagas | 300 s (5 min) | O `raw.githubusercontent.com` já responde com `Cache-Control: max-age=300`. Revalidar mais rápido que isso não traria dado mais novo, só mais pedidos. Para quem procura vaga, 5 minutos não fazem diferença. |
| Empresas | 3600 s (1 h) | Nome e "sobre" de uma empresa mudam muito menos que uma vaga. |

No Next 16 o `fetch` não guarda nada por padrão, então o cache é uma escolha explícita. Com `revalidate`, a página é estática e é regenerada em segundo plano (ISR). Cada `fetch` também leva uma tag (`vagas` e `empresas`) para a aula 05 poder invalidar o cache com `revalidateTag`.

**Quanto tempo uma vaga nova leva para aparecer:** no pior caso, cerca de 10 minutos depois do commit na branch `homolog` — até 5 minutos do cache do próprio GitHub mais até 5 minutos do `revalidate`. Como o ISR entrega a versão antiga no primeiro pedido depois de vencer e busca a nova por trás, a vaga aparece a partir do pedido seguinte.

### Estático e dinâmico — a tabela do build

```
Route (app)                   Revalidate  Expire
┌ ○ /
├ ○ /_not-found
├   /empresas/[slug]
│ ├ ● /empresas/aurora-tech           5m      1y
│ ├ ● /empresas/nuvem-norte           5m      1y
│ └ ● /empresas/mare-digital          5m      1y
├ ○ /privacidade
├ ○ /sobre
├ ○ /termos
├ ○ /vagas                            5m      1y
└   /vagas/[id]
  ├ ● /vagas/1                        5m      1y
  ├ ● /vagas/2                        5m      1y
  ├ ● /vagas/3                        5m      1y
  └ ● [+3 more paths]
```

- `○` — estática: o HTML é montado no build. `/vagas` é estática com revalidação de 5 minutos.
- `●` — SSG: pré-gerada pelo `generateStaticParams`. As 6 vagas e as 3 empresas já saem prontas do build. Um id que não foi pré-gerado continua funcionando e é montado na primeira visita.
- Antes desta aula, `/vagas/[id]` e `/empresas/[slug]` eram `ƒ` (dinâmicas). O `export const dynamic = "force-dynamic"` da página de detalhe foi removido, porque obrigava a rota a ser montada a cada pedido e impedia a pré-geração.
- As páginas de empresa mostram `5m`, e não `1h`, porque também buscam as vagas. A página revalida no menor tempo entre os dados que usa.

### A espera

- `app/vagas/page.tsx` **não é** `async`. O `<h1>` chega na hora, e quem busca são os filhos, cada um no seu `<Suspense>`: `NumerosDoCatalogo` ("6 vagas · 4 aceitam quem está começando") e `ListagemDeVagas`. São duas cercas para um bloco não segurar o outro. Os fallbacks (`NumerosEsqueleto` e `ListaEsqueleto`) têm a altura do conteúdo real, para a página não pular quando o dado chega.
- `VagasParecidas` perdeu o `setTimeout` de 2 segundos, que simulava espera. Agora ela busca de verdade com `listarVagas()`, e o `<Suspense>` da página de detalhe tem uma espera real para cercar.
- `app/vagas/[id]/loading.tsx` é um esqueleto com o formato da página de detalhe, e não um "Carregando…" de uma linha.

### Quando dá errado

- `notFound()` é para **o que não existe**: se `buscarVaga(id)` devolve `undefined`, a página chama `notFound()` e aparece o `not-found.tsx` da aula 02. Teste: `/vagas/999`.
- `error.tsx` é para **o que falhou**: rede caiu, GitHub fora do ar. É Client Component, mostra uma mensagem em português sem detalhes técnicos e tem um botão que chama `reset()`. Teste: trocar `vagas.json` por `vagass.json` no `lib/api.ts` por alguns segundos.

### Cada rota com o seu título

- Rotas dinâmicas usam `generateMetadata`, que recebe os mesmos `params` da página. Exemplos: `/vagas/1` → "Pessoa Desenvolvedora Front-end Júnior · Aurora Tech | Leque de Vagas"; `/empresas/aurora-tech` → "Aurora Tech | Leque de Vagas".
- A rota fixa `/vagas` usa `export const metadata`.
- O sufixo "| Leque de Vagas" vem do `template` do `app/layout.tsx`.
- A metadata e a página chamam a mesma busca, mas o Next junta os `fetch` iguais de um mesmo pedido num só (request memoization).
- O `console.log` da aula 03 saiu da página de detalhe: nenhum `console.log` ou `setTimeout` de teste fica no código entregue.
