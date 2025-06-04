import * as React from "react";
import { cn } from "@/lib/utils";

interface InputWithAffixProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prefix?: string;
  suffix?: string;
}

const InputWithAffix = React.forwardRef<HTMLInputElement, InputWithAffixProps>(
  ({ className, prefix, suffix, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-neutral-2">{prefix}</span>
        )}
        <input
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            prefix && "pl-7",
            suffix && "pr-7",
            className
          )}
          ref={ref}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3 text-neutral-2">{suffix}</span>
        )}
      </div>
    );
  }
);

InputWithAffix.displayName = "InputWithAffix";

export { InputWithAffix };
