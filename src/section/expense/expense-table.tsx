import { DataTable } from "@/components/design-system/data-table";
import { expenseColumns } from "@/section/expense/column";
import type { Expense } from "@/models/expense.model";

interface ExpenseTableProps {
  data: Expense[];
}

export function ExpenseTable({ data }: ExpenseTableProps) {
  return <DataTable data={data} columns={expenseColumns} />;
}
