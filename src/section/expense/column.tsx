import type { ColumnDef } from "@tanstack/react-table";
import type { Expense } from "@/models/expense.model";
import { DataTableColumnHeader } from "@/components/design-system/table-column-header";
import { categories } from "@/dummy-data/categories-list";
import AddExpense from "./add-expense";
import DeleteExpense from "./delete-expense";
import { formatter } from "@/utils/date";
import { Badge } from "@/components/ui/badge";

export type ExtendedColumnDef<TData, TValue = unknown> = ColumnDef<
  TData,
  TValue
> & {
  headerAlign?: "left" | "center" | "right";
  cellAlign?: "left" | "center" | "right";
};

export const expenseColumns: ExtendedColumnDef<Expense>[] = [
  {
    accessorKey: "expenseName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expense Name" />
    ),
    cell: ({ getValue }) => (
      <div className="w-full flex justify-start">
        <span className="font-medium text-left w-full">
          {getValue<string>()}
        </span>
      </div>
    ),
    enableSorting: false,
    size: 250,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ getValue }) => (
      <div className="w-full flex justify-center">
        <span className="text-right font-mono">
          ${getValue<number>().toFixed(2)}
        </span>
      </div>
    ),
    enableSorting: false,
    headerAlign: "center",
    size: 90,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ getValue }) => (
      <div className="w-full flex justify-center">
        <span>{formatter.format(getValue<Date>())}</span>
      </div>
    ),
    enableSorting: false,
    headerAlign: "center",
    size: 120,
  },
  {
    accessorKey: "categoryId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const categoryId = row.original.categoryId;
      const category = categories.find((c) => c.id === categoryId);
      return (
        <div className="flex justify-center">
          {category && (
            <Badge variant="secondary">{category.categoryName}</Badge>
          )}
        </div>
      );
    },
    enableSorting: false,
    headerAlign: "center",
  },
  {
    accessorKey: "note",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Note" />
    ),
    cell: ({ getValue }) => (
      <div className="w-full flex justify-start">
        <span className="justify-start">{getValue<string>() || ""}</span>
      </div>
    ),
    enableSorting: false,
    size: 200,
  },
  {
    accessorKey: "attachments",
    header: "Attachments",
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
    enableSorting: false,
    headerAlign: "center",
    size: 90,
  },
  {
    accessorFn: (row) => (row.recurring ? row.recurring.frequency : ""),
    id: "recurring",
    header: "Recurring",
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
    enableSorting: false,
    headerAlign: "center",
    cellAlign: "center",
    size: 100,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex justify-center gap-2">
          <AddExpense expenseToEdit={row.original} showIcon />
          <DeleteExpense expenseId={row.original.id} showIcon />
        </div>
      );
    },
    headerAlign: "center",
    cellAlign: "center",
    size: 70,
  },
];
