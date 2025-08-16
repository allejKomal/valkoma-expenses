import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RightSideSheet } from "@/components/design-system/right-side-sheet";
import { Input } from "@/components/ui/input";
import { FieldSet } from "@/components/design-system/field-set";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { PencilIcon } from "lucide-react";
import type { Category } from "@/models/category.model";
import {
  CategorySchema,
  initialCategoryFormValues,
  type CategoryFormData,
} from "@/schema/add-category-schema";
import { iconOptions, LucideIcons } from "@/utils/icons-list";
import { cn } from "@/lib/utils";
import { categories } from "@/dummy-data/categories-list";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "valkoma-package/primitive";

interface AddCategoryProps {
  categoryToEdit?: Category | null;
  showIcon?: boolean;
}

function AddCategory({ categoryToEdit, showIcon = false }: AddCategoryProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<CategoryFormData>({
    defaultValues: initialCategoryFormValues,
    mode: "onChange",
    resolver: yupResolver(CategorySchema),
  });

  // --- ✨ Reset with Edit Data ---
  useEffect(() => {
    if (categoryToEdit && open) {
      reset({
        categoryName: categoryToEdit.categoryName ?? "",
        color: categoryToEdit.color ?? "#000000",
        icon: categoryToEdit.icon ?? "",
        type: categoryToEdit.type ?? "expense",
        isDefault: categoryToEdit.isDefault ?? false,
      });
    }
  }, [categoryToEdit, open, reset]);

  // --- ✨ Reset to Empty When Closed ---
  useEffect(() => {
    if (!open) {
      reset(initialCategoryFormValues);
    }
  }, [open, reset]);

  // --- ✅ Form Submit Logic ---
  const onSubmit = async (data: CategoryFormData) => {
    setOpen(false);
    const category: Omit<Category, "id" | "createdAt"> = {
      categoryName: data.categoryName,
      color: data.color,
      icon: data.icon,
      type: data.type,
      isDefault: data.isDefault,
    };

    if (categoryToEdit) {
      console.log("Editing category", categoryToEdit.id, category);
      toast.success("Category updated successfully");
    } else {
      console.log("Adding new category", category);
      toast.success("Category added successfully");
    }
  };

  return (
    <RightSideSheet
      open={open}
      onOpenChange={setOpen}
      triggerButtonVariant={showIcon ? "outline" : "default"}
      triggerButtonText={
        showIcon ? (
          <PencilIcon className="w-4 h-4" />
        ) : categoryToEdit ? (
          "Edit Category"
        ) : (
          "Add Category"
        )
      }
      size={showIcon ? "icon" : "default"}
      title={categoryToEdit ? "Edit Category" : "Add Category"}
      submitButtonText={categoryToEdit ? "Save" : "Add"}
      closeButtonText="Cancel"
      onClose={() => reset(initialCategoryFormValues)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <form className="flex flex-col gap-4">
        {/* 🎨 Color + Name */}
        <div className="flex gap-2 w-full">
          <FieldSet
            label="Color"
            error={errors.color?.message}
            className="w-[100px]"
            isRequired
          >
            <Input type="color" {...register("color")} />
          </FieldSet>
          <FieldSet
            label="Category Name"
            error={errors.categoryName?.message}
            isRequired
            className="w-full"
          >
            <Input
              type="text"
              placeholder="Enter category name"
              {...register("categoryName")}
            />
          </FieldSet>
        </div>
        <div className="flex gap-2 w-full">
          <FieldSet label="Default Category" className="flex-1">
            <Controller
              name="isDefault"
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </FieldSet>
          <FieldSet
            label="Type"
            error={errors.type?.message}
            isRequired
            className="w-full"
          >
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FieldSet>
        </div>
        {/* ✅ Is Default */}

        {/* 🎯 Icon Picker Grid */}
        <FieldSet label="Icon" error={errors.icon?.message} isRequired>
          <Controller
            name="icon"
            control={control}
            render={({ field }) => {
              const selectedIcon = field.value;
              const usedIcons = categories
                .filter((cat) => cat.id !== categoryToEdit?.id)
                .map((cat) => cat.icon);

              return (
                <div className="flex flex-wrap gap-2">
                  <TooltipProvider>
                    {iconOptions.map((iconName) => {
                      const Icon =
                        LucideIcons[iconName as keyof typeof LucideIcons];
                      const isDisabled = usedIcons.includes(iconName);
                      const isSelected = selectedIcon === iconName;

                      return (
                        <Tooltip key={iconName}>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              disabled={isDisabled}
                              onClick={() => field.onChange(iconName)}
                              className={cn(
                                "flex flex-col items-center justify-center p-2 rounded border transition-colors",
                                {
                                  "bg-muted border-primary text-primary":
                                    isSelected,
                                  "opacity-50 cursor-not-allowed": isDisabled,
                                  "hover:bg-muted": !isDisabled && !isSelected,
                                }
                              )}
                            >
                              {Icon && <Icon className="w-5 h-5 mb-1" />}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="capitalize">{iconName}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </TooltipProvider>
                </div>
              );
            }}
          />
        </FieldSet>
      </form>
    </RightSideSheet>
  );
}

export default AddCategory;
