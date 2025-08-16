"use client";

import { flexRender, type Table } from "@tanstack/react-table";
import { TableCell, TableRow } from "valkoma-package/primitive";
import type { ExtendedColumnDef } from "@/section/expense/column";

interface ContentProps<TData> {
  table: Table<TData>;
}

export function DataTableContent<TData>({ table }: ContentProps<TData>) {
  return (
    <>
      {table.getRowModel().rows.map((row) => (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected() ? "selected" : undefined}
        >
          {row.getVisibleCells().map((cell) => {
            const alignClass =
              (cell.column.columnDef as ExtendedColumnDef<TData>).cellAlign ===
              "center"
                ? "text-center"
                : (cell.column.columnDef as ExtendedColumnDef<TData>)
                    .cellAlign === "right"
                ? "text-right"
                : "text-left";

            return (
              <TableCell
                key={cell.id}
                style={{ width: cell.column.getSize() }}
                className={`px-2 py-2 text-sm whitespace-nowrap ${alignClass}`}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </>
  );
}
