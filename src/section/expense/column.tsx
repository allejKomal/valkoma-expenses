import type { Expense } from "@/models/expense.model";
import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import { formatter } from "@/utils/date";
import AddExpense from "@/section/expense/add-expense";
import DeleteExpense from "./delete-expense";

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "expenseName",
    header: () => (
      <div className="w-full flex justify-start">
        <span>Expense Name</span>
      </div>
    ),
    cell: ({ getValue }) => (
      <div className="w-full flex justify-start">
        <span className="text-gray-900 font-medium text-left w-full">
          {getValue<string>()}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => (
      <div className="w-full flex justify-center">
        <span>Amount</span>
      </div>
    ),
    cell: ({ getValue }) => (
      <div className="w-full flex justify-center">
        <span className="text-right font-mono text-gray-900">
          ${getValue<number>().toFixed(2)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: () => (
      <div className="w-full flex justify-center">
        <span>Date</span>
      </div>
    ),
    cell: ({ getValue }) => (
      <div className="w-full flex justify-center">
        <span>{formatter.format(getValue<Date>())}</span>
      </div>
    ),
  },
  {
    accessorKey: "note",
    header: () => (
      <div className="w-full flex justify-start">
        <span>Note</span>
      </div>
    ),
    cell: ({ getValue }) => (
      <div className="w-full flex justify-start">
        <span className="justify-start">{getValue<string>() || ""}</span>
      </div>
    ),
  },
  {
    accessorKey: "attachments",
    header: () => (
      <div className="w-full flex justify-center">
        <span>Attachments</span>
      </div>
    ),
    cell: ({ row }) => {
      const attachments = row.original.attachments;
      return (
        <div className="flex justify-center">
          {attachments && attachments.length > 0 && (
            <Badge variant="outline">{attachments.length}</Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorFn: (row) => (row.recurring ? row.recurring.frequency : ""),
    id: "recurring",
    header: () => (
      <div className="w-full flex justify-center">
        <span>Recurring</span>
      </div>
    ),
    cell: ({ row }) => {
      const recurring = row.original.recurring;
      return (
        <div className="flex justify-center">
          {recurring && (
            <Badge variant="outline">
              <span className="capitalize">{recurring.frequency}</span>
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => (
      <div className="w-full flex justify-center">
        <span>Actions</span>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex justify-center gap-2">
          <AddExpense expenseToEdit={row.original} showIcon />
          <DeleteExpense expenseId={row.original.id} showIcon />
        </div>
      );
    },
  },
];
