import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, hasError, errorMessage, name, value, onChange, type, ...props }: React.ComponentProps<"input">) {
  return (
    <div className="flex flex-col">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={cn(
          "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          hasError ? "border-destructive text-destructive" : "",
          className
        )}
        aria-invalid={hasError}
        {...props}
      />
      {hasError && <span className="text-sm text-destructive mt-1">{errorMessage}</span>}
    </div>
  );
}

export { Input }
