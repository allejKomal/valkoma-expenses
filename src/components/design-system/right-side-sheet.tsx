import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface RightSideSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerButtonText: string | React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  triggerButtonVariant?:
    | "default"
    | "outline"
    | "ghost"
    | "secondary"
    | "destructive"
    | "link";
  submitButtonText: string;
  closeButtonText: string;
  onSubmit?: () => void;
  onClose?: () => void;
  size?: "sm" | "default" | "icon" | "lg";
}

export const RightSideSheet = ({
  open,
  onOpenChange,
  triggerButtonText,
  triggerButtonVariant = "default",
  title,
  description,
  children,
  submitButtonText,
  closeButtonText,
  onSubmit,
  onClose,
  size = "default",
}: RightSideSheetProps) => {
  useEffect(() => {
    if (open) {
      onClose?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant={triggerButtonVariant}
          size={size}
          className={cn(size !== "icon" && "h-7")}
        >
          {triggerButtonText}
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[500px]">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4 h-full overflow-y-auto">
          {children}
        </div>
        <SheetFooter className="flex-row">
          <Button onClick={onSubmit} className="flex-1">
            {submitButtonText}
          </Button>
          <SheetClose asChild onClick={() => onOpenChange(false)}>
            <Button variant="outline" className="flex-1">
              {closeButtonText}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
