import { listarVagas } from "@/lib/api";

// GET /api/vagas — todas as vagas abertas (catálogo + publicadas pelo site).
export async function GET() {
  const vagas = await listarVagas();
  return Response.json(vagas);
}
