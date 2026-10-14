import { buscarEmpresa } from "@/lib/api";

export async function GET(
  _pedido: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const empresa = await buscarEmpresa(slug);

  if (!empresa) return new Response("Não encontrada", { status: 404 });
  return Response.json(empresa);
}
