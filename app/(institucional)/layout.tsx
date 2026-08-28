export default function InstitucionalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="max-w-2xl py-20 sm:py-24">
      <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.12em] text-violet-700">
        Leque de Vagas
      </p>
      {children}
    </div>
  );
}
