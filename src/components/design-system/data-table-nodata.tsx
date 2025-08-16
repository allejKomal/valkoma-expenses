"use client";

import { TableRow, TableCell } from "valkoma-package/primitive";

interface NoDataProps {
  columnsLength: number;
}

export function DataTableNoData({ columnsLength }: NoDataProps) {
  return (
    <TableRow>
      <TableCell colSpan={columnsLength} className="h-[550px] text-center">
        No results.
      </TableCell>
    </TableRow>
  );
}
