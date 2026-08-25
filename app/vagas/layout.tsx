import BotaoVoltar from "@/components/BotaoVoltar";
export default function VagasLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="area-vagas">
      <div className="barra-area">
        <BotaoVoltar />
        <span>Oportunidades abertas</span>
      </div>
      {children}
    </div>
  );
}
