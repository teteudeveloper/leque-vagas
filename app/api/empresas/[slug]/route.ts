import { buscarEmpresa } from "@/lib/api";

// GET /api/empresas/:slug — o perfil da empresa, já com as edições feitas pelo site.
export async function GET(_pedido: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const empresa = await buscarEmpresa(slug);

  if (!empresa) {
    return Response.json({ erro: "Empresa não encontrada." }, { status: 404 });
  }
  return Response.json(empresa);
}
