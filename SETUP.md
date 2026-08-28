# Setup do Leque de Vagas

Guia para baixar e executar o projeto localmente.

## Pré-requisitos

- Git
- Node.js 20.9 ou superior
- npm, instalado com o Node.js

Verifique as instalações:

```bash
node --version
npm --version
git --version
```

## Instalação inicial

```bash
git clone https://github.com/teteudeveloper/leque-vagas.git
cd leque-vagas
npm install
```

Não instale Next.js, Tailwind CSS ou shadcn/ui globalmente. Todas as versões necessárias estão no `package-lock.json`.

## Criar sua branch de trabalho

Cada pessoa deve desenvolver em uma branch própria. Não faça alterações diretamente na `main`.

Primeiro, entre na `main` e atualize-a:

```bash
git switch main
git pull origin main
```

Crie uma branch com um nome curto e descritivo. Use um prefixo de acordo com o tipo de alteração:

```bash
git switch -c feat/nome-da-funcionalidade
```

Exemplos de nomes:

```text
feat/job-filters
fix/company-page
docs/setup-guide
refactor/tailwind-migration
```

Confirme que está na branch correta:

```bash
git branch --show-current
git status
```

O trabalho deve ser feito na branch criada, por exemplo `feat/job-filters`. A `main` deve receber alterações somente por meio de um Pull Request revisado.

Se a branch já existir no remoto, baixe-a antes de começar:

```bash
git fetch origin
git switch --track origin/nome-da-branch
```

## Executar em desenvolvimento

```bash
npm run dev
```

Acesse <http://localhost:3000>. Para encerrar, pressione `Ctrl + C`.

Para usar a branch de desenvolvimento da equipe, substitua a seleção da branch por:

```bash
git switch dev-teteu
git pull origin dev-teteu
```

## Rotas principais

| Página      | URL                     |
| ----------- | ----------------------- |
| Home        | `/`                     |
| Sobre       | `/sobre`                |
| Vagas       | `/vagas`                |
| Detalhe     | `/vagas/1`              |
| Empresa     | `/empresas/aurora-tech` |
| Termos      | `/termos`               |
| Privacidade | `/privacidade`          |

## Verificação

Execute antes de publicar ou enviar alterações:

```bash
npm run lint
npm run build
```

Para iniciar a versão de produção localmente, execute `npm start` após o build.

## Formatação

```bash
npm run format
```

O projeto usa Tailwind CSS e componentes shadcn/ui. O arquivo `app/globals.css` é somente o ponto de entrada do Tailwind; novos estilos devem ser feitos com classes utilitárias e componentes reutilizáveis.

## Variáveis de ambiente

O projeto atualmente não exige variáveis de ambiente, banco de dados ou API externa. Se isso mudar, documente as variáveis neste arquivo e utilize `.env.local`. Nunca envie tokens ou senhas para o GitHub.

## Problemas comuns

### Porta 3000 ocupada

```bash
npm run dev -- --port 3001
```

Depois acesse <http://localhost:3001>.

### Reinstalar dependências

macOS/Linux:

```bash
rm -rf node_modules
npm install
```

Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

Não remova o `package-lock.json`.

### Limpar o cache do Next.js

macOS/Linux:

```bash
rm -rf .next
npm run dev
```

Windows PowerShell:

```powershell
Remove-Item -Recurse -Force .next
npm run dev
```

## Fluxo diário de contribuição

Antes de iniciar o trabalho em qualquer dia, atualize a referência da `main`:

```bash
git switch main
git pull origin main
git switch nome-da-sua-branch
```

Se a `main` recebeu alterações enquanto sua branch estava sendo desenvolvida, sincronize sua branch:

```bash
git fetch origin
git merge origin/main
```

Se houver conflitos, resolva os arquivos marcados, confira o resultado e finalize o merge:

```bash
git status
git add -- arquivos-resolvidos
git commit -m "chore: resolve merge conflicts"
```

Faça commits pequenos, com mensagens em inglês e no padrão Conventional Commits:

```text
feat: add job filters
fix: handle missing company
docs: update setup guide
refactor: migrate page to Tailwind
chore: update dependencies
```

Antes do commit, valide e revise os arquivos:

```bash
npm run lint
npm run build
git status
git diff
git add -- arquivos-alterados
git commit -m "feat: describe the change in English"
git push -u origin nome-da-sua-branch
```

Depois do primeiro push, abra um Pull Request no GitHub com:

- **base:** `main`
- **compare:** `nome-da-sua-branch`
- título curto e profissional
- descrição do que foi alterado
- testes executados (`npm run lint` e `npm run build`)

Após o merge do Pull Request, atualize sua cópia local:

```bash
git switch main
git pull origin main
git branch -d nome-da-sua-branch
```

Se a branch também precisar ser removida do GitHub:

```bash
git push origin --delete nome-da-sua-branch
```

Mantenha o `package-lock.json` versionado e nunca envie `node_modules` ou `.next`.
