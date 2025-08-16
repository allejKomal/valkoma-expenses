import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  type ColumnDef,
  type Table as ReactTable,
} from "@tanstack/react-table";
import { Table, TableBody } from "@/components/ui/table";
import { DataTableHeader } from "@/components/design-system/data-table-header";
import { DataTableContent } from "@/components/design-system/data-table-content";
import { DataTableNoData } from "@/components/design-system/data-table-nodata";
import { DataTablePagination } from "@/components/design-system/data-table-pagination";

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  height?: number;
}

export function DataTable<TData>({
  data,
  columns,
  height = 650,
}: DataTableProps<TData>) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(data.length / pageSize),
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newPagination.pageIndex);
      setPageSize(newPagination.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex-1 overflow-x-auto">
      <div
        className="scroll-container w-full overflow-y-auto"
        style={{ height }}
      >
        <Table className="table-fixed w-full">
          <DataTableHeader table={table} />
          <TableBody>
            {table.getPaginationRowModel().rows.length ? (
              <DataTableContent table={table} />
            ) : (
              <DataTableNoData
                columnsLength={table.getHeaderGroups()[0]?.headers.length}
              />
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-3">
        <DataTablePagination table={table as ReactTable<TData>} />
      </div>
    </div>
  );
}
