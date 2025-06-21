import * as React from "react";

import { cn } from "~/lib/utils";
import { Label } from "./label";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

function InputWithLabel({
  label,
  name,
  error = [],
  prefix,
  children,
}: {
  label: string;
  name: string;
  error?: string[];
  prefix?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={name} className="text-left">
        {label}
      </Label>
      <div className="col-span-3 flex flex-col">
        <div className="flex items-center gap-2">
          {prefix && (
            <p className="text-muted-foreground hidden md:block">{prefix}</p>
          )}
          {children}
        </div>
        {error?.length > 0 && (
          <p className="text-red-600">{error[error.length - 1]}</p>
        )}
      </div>
    </div>
  );
}

export { Input, InputWithLabel };
