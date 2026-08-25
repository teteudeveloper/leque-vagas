# Leque de Vagas

Projeto desenvolvido nos desafios técnicos das aulas 01, 02 e 03 de Next.js. A proposta é criar um site de oportunidades de tecnologia para pessoas em transição de carreira.

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

| Arquivo                                    | URL                       | Função                          |
| ------------------------------------------ | ------------------------- | ------------------------------- |
| `app/page.tsx`                             | `/`                       | Home                            |
| `app/sobre/page.tsx`                       | `/sobre`                  | Sobre o projeto                 |
| `app/vagas/page.tsx`                       | `/vagas`                  | Listagem das seis vagas         |
| `app/vagas/[id]/page.tsx`                  | `/vagas/1` (e demais IDs) | Detalhe dinâmico da vaga        |
| `app/vagas/loading.tsx`                    | `/vagas`                  | Estado de carregamento          |
| `app/vagas/[id]/error.tsx`                 | `/vagas/:id`              | Erro isolado da vaga, com retry |
| `app/vagas/[id]/not-found.tsx`             | `/vagas/9999`             | Vaga inexistente                |
| `app/not-found.tsx`                        | qualquer URL inválida     | 404 geral                       |
| `app/empresas/[slug]/page.tsx`             | `/empresas/aurora-tech`   | Vagas filtradas por empresa     |
| `app/(institucional)/termos/page.tsx`      | `/termos`                 | Termos de uso                   |
| `app/(institucional)/privacidade/page.tsx` | `/privacidade`            | Privacidade                     |

A pasta `[id]` funciona como um molde: em vez de criar uma página para cada vaga, o Next.js lê o `id` da URL e a página procura o registro correspondente no arquivo de dados. O grupo `(institucional)` organiza os arquivos sem adicionar esse nome ao endereço.

O link `Vagas` fica ativo também em `/vagas/1`. A decisão faz sentido porque o detalhe continua pertencendo à área de vagas e ajuda a pessoa a se localizar no menu.

## Aula 03 — A fronteira

| Arquivo                          | Por que é Client Component                                                                                                  |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `app/vagas/[id]/error.tsx`       | O boundary de erro precisa executar no navegador para oferecer `reset()` e permitir tentar novamente.                       |
| `components/MenuLink.tsx`        | Usa `usePathname`, que lê a URL atual no navegador para marcar o menu ativo.                                                |
| `components/BotaoVoltar.tsx`     | Usa `useRouter().back()` para executar a ação de voltar no histórico ao clicar; um `Link` comum só conhece um destino fixo. |
| `components/BotaoCopiarLink.tsx` | Precisa do clique e da Clipboard API do navegador. Recebe o título da vaga como prop serializável.                          |

Todos os `layout.tsx` e `page.tsx` continuam Server Components. Os componentes de cliente são pequenos e têm uma responsabilidade. A pessoa usuária ganha carregamento inicial menor e uma resposta rápida: só os controles que precisam do navegador descem para o cliente, enquanto o conteúdo continua sendo renderizado no servidor.

Na página de detalhe há um `console.log` com o prefixo `[servidor]`. Ao acessar `/vagas/1` durante `npm run dev`, ele aparece no terminal do servidor. O botão **Copiar link da vaga** copia a URL atual e oferece um fallback para navegadores em que a Clipboard API não esteja disponível.
