import type { PropsWithChildren } from "react";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

interface FieldSetProps extends PropsWithChildren {
  label: string;
  description?: string;
  error?: string;
  isRequired?: boolean;
  className?: string;
}
export const FieldSet: React.FC<FieldSetProps> = ({
  children,
  label,
  description,
  error,
  isRequired = false,
  className,
}) => {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="flex flex-col gap-1">
        <Label className="flex flex-col gap-2 items-start">
          <span>
            {label}
            {isRequired && <span className="text-destructive ml-1">*</span>}
          </span>
          {children}
        </Label>
      </div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
};

export default FieldSet;
