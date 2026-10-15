import { Skeleton } from "@/components/ui/skeleton";

// Mesmo formato e altura do contador, para o cabeçalho não se mexer quando o número chega.
export default function NumerosEsqueleto() {
  return <Skeleton aria-hidden="true" className="h-7 w-72 max-w-full rounded-full" />;
}
