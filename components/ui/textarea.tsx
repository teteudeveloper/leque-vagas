import * as React from "react";
import { cn } from "@/lib/utils";
import { estiloDeCampo } from "@/components/ui/input";

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(estiloDeCampo, "min-h-36 resize-y leading-relaxed", className)}
      {...props}
    />
  );
}
