// Roda no build da Vercel (script "vercel-build") e aplica as migrations
// pendentes antes do `next build`, mas SÓ no deploy de produção.
//
// - Previews de PR não migram: uma migration ainda em revisão nunca chega ao
//   banco de produção antes do merge.
// - Sem banco configurado, o build segue e o site sobe em modo leitura.
// - O migrate usa a conexão direta (sem pooler) quando a integração a fornece;
//   o app continua usando a DATABASE_URL normal em tempo de execução.
import { execSync } from "node:child_process";

const ambiente = process.env.VERCEL_ENV;
if (ambiente && ambiente !== "production") {
  console.warn(`[migrar] VERCEL_ENV=${ambiente}: migrations só rodam em produção. Pulando.`);
  process.exit(0);
}

const urlDireta =
  process.env.DATABASE_URL_UNPOOLED ?? // integração Neon
  process.env.POSTGRES_URL_NON_POOLING ?? // integração Supabase
  process.env.DATABASE_URL;

if (!urlDireta) {
  console.warn("[migrar] DATABASE_URL não definida: pulando `prisma migrate deploy`.");
  process.exit(0);
}

execSync("npx prisma migrate deploy", {
  stdio: "inherit",
  env: { ...process.env, DATABASE_URL: urlDireta },
});
