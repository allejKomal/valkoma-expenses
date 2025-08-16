import { DataTable } from "@/components/design-system/data-table";
import { categoryColumns } from "@/section/category/column";
import type { Category } from "@/models/category.model";

interface CategoryTableProps {
  data: Category[];
}

export function CategoryTable({ data }: CategoryTableProps) {
  return <DataTable data={data} columns={categoryColumns} />;
}
