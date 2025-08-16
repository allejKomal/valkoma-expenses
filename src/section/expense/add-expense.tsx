import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RightSideSheet } from "@/components/design-system/right-side-sheet";
import { Input } from "@/components/ui/input";
import { FieldSet } from "@/components/design-system/field-set";
import { Textarea } from "@/components/ui/textarea";
import {
  AddExpenseSchema,
  initialFormValues,
  type AddExpenseFormData,
} from "@/schema/add-expense-schema";
import type { Expense } from "@/models/expense.model";
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

interface AddExpenseProps {
  expenseToEdit?: Expense | null;
  showIcon?: boolean;
}

function AddExpense({ expenseToEdit, showIcon = false }: AddExpenseProps) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
    reset,
  } = useForm<AddExpenseFormData>({
    defaultValues: initialFormValues,
    mode: "onChange",
    resolver: yupResolver(AddExpenseSchema),
  });

  useEffect(() => {
    if (expenseToEdit && open) {
      reset({
        expenseName: expenseToEdit.expenseName ?? "",
        amount: expenseToEdit.amount ?? 0,
        date: expenseToEdit.date
          ? expenseToEdit.date.toISOString().split("T")[0]
          : "",
        note: expenseToEdit.note ?? "",
        attachments: undefined,
        isRecurring: !!expenseToEdit.recurring,
        recurring: expenseToEdit.recurring
          ? {
              frequency: expenseToEdit.recurring.frequency,
              startDate: expenseToEdit.recurring.startDate
                ? expenseToEdit.recurring.startDate.toISOString().split("T")[0]
                : "",
              endDate: expenseToEdit.recurring.endDate
                ? expenseToEdit.recurring.endDate.toISOString().split("T")[0]
                : "",
            }
          : undefined,
      });
    }
  }, [expenseToEdit, open, reset]);

  useEffect(() => {
    if (!open) {
      if (expenseToEdit) {
        return;
      }
      reset(initialFormValues);
    }
  }, [open, expenseToEdit, reset]);

  const isRecurring = watch("isRecurring");

  if (isRecurring && !watch("recurring")) {
    setValue("recurring", {
      frequency: "daily",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
    });
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (data: AddExpenseFormData) => {
    setOpen(false);
    const expense: Omit<Expense, "id" | "createdAt" | "updatedAt"> = {
      expenseName: data.expenseName,
      amount: data.amount,
      date: new Date(data.date),
      note: data.note ?? undefined,
      attachments: data.attachments
        ? await Promise.all(
            Array.from(data.attachments).map(async (file) => {
              return await fileToBase64(file);
            })
          )
        : undefined,
      recurring:
        data.isRecurring && data.recurring
          ? {
              frequency: data.recurring.frequency,
              startDate: new Date(data.recurring.startDate),
              endDate: data.recurring.endDate
                ? new Date(data.recurring.endDate)
                : undefined,
            }
          : undefined,
    };

    if (expenseToEdit) {
      console.log("Editing expense", expenseToEdit.id, expense);
      toast.success("Expense updated successfully");
    } else {
      console.log("Adding new expense", expense);
      toast.success("Expense added successfully");
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
        ) : expenseToEdit ? (
          "Edit Expense"
        ) : (
          "Add Expense"
        )
      }
      size={showIcon ? "icon" : "default"}
      title={expenseToEdit ? "Edit Expense" : "Add Expense"}
      submitButtonText={expenseToEdit ? "Save" : "Add"}
      closeButtonText="Cancel"
      onClose={() => {
        if (!expenseToEdit) {
          reset(initialFormValues);
        }
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <form className="flex flex-col gap-4">
        {/* Expense Name */}
        <FieldSet
          label="Expense Name"
          error={errors.expenseName?.message}
          isRequired
        >
          <Input
            type="text"
            placeholder="Enter expense name"
            {...register("expenseName")}
          />
        </FieldSet>

        <div className="flex gap-2 w-full">
          <FieldSet
            label="Amount"
            error={errors.amount?.message}
            isRequired
            className="w-full"
          >
            <Input type="number" step="0.01" {...register("amount")} />
          </FieldSet>

          {/* Date */}
          <FieldSet
            label="Date"
            error={errors.date?.message}
            isRequired
            className="w-full"
          >
            <Input type="date" {...register("date")} />
          </FieldSet>
        </div>

        <FieldSet label="Attachments" error={errors.attachments?.message}>
          <Input type="file" multiple {...register("attachments")} />
        </FieldSet>

        <FieldSet
          label="Is Recurring"
          error={errors.isRecurring?.message}
          className="w-full flex-row [&_Label]:flex-row-reverse"
        >
          <Controller
            name="isRecurring"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </FieldSet>

        {isRecurring && (
          <>
            <FieldSet
              label="Recurring Frequency"
              error={errors.recurring?.frequency?.message}
              isRequired
            >
              <Controller
                name="recurring.frequency"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </FieldSet>
            <div className="flex gap-2 w-full">
              <FieldSet
                label="Recurring Start Date"
                error={errors.recurring?.startDate?.message}
                className="w-full"
                isRequired
              >
                <Input type="date" {...register("recurring.startDate")} />
              </FieldSet>

              <FieldSet
                label="Recurring End Date"
                error={errors.recurring?.endDate?.message}
                className="w-full"
              >
                <Input type="date" {...register("recurring.endDate")} />
              </FieldSet>
            </div>
          </>
        )}
        <FieldSet label="Note" error={errors.note?.message}>
          <Textarea placeholder="Optional note" {...register("note")} />
        </FieldSet>
      </form>
    </RightSideSheet>
  );
}

export default AddExpense;
