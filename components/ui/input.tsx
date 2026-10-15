import * as React from "react";
import { cn } from "@/lib/utils";

export const estiloDeCampo =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-base text-slate-900 shadow-xs transition-colors placeholder:text-slate-400 hover:border-slate-400 focus-visible:border-violet-500 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-red-500 aria-invalid:focus-visible:ring-red-500/20";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(estiloDeCampo, className)} {...props} />;
}
