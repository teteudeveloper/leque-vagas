import { Skeleton } from "@/components/ui/skeleton";

// O fallback da lista. Cada item tem a altura de uma linha real, para a página
// não pular quando as vagas chegarem. Três itens bastam.
export default function ListaEsqueleto() {
  return (
    <ul className="m-0 list-none p-0" aria-hidden="true">
      {[1, 2, 3].map((item) => (
        <li key={item} className="border-t border-slate-200 px-1 py-5 last:border-b">
          <Skeleton className="mb-2 h-5 w-3/5 max-w-md" />
          <Skeleton className="h-4 w-2/5 max-w-xs" />
        </li>
      ))}
    </ul>
  );
}
