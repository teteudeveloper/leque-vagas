import * as React from "react";
import { cn } from "@/lib/utils";
export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700",
        className,
      )}
      {...props}
    />
  );
}
