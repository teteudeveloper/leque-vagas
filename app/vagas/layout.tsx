import BotaoVoltar from "@/components/BotaoVoltar";
export default function VagasLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="py-12 pb-24">
      <div className="mb-14 flex items-center gap-5 border-b border-slate-200 pb-4 text-slate-500">
        <BotaoVoltar />
        <span>Oportunidades abertas</span>
      </div>
      {children}
    </div>
  );
}
