import type { ColumnDef } from "@tanstack/react-table";
import type { Category } from "@/models/category.model";
import { DataTableColumnHeader } from "@/components/design-system/table-column-header";
import { Badge } from "@/components/ui/badge";
import { LucideIcons } from "@/utils/icons-list";
import AddCategory from "@/section/category/add-category";
import { formatter } from "@/utils/date";

export type ExtendedColumnDef<TData, TValue = unknown> = ColumnDef<
  TData,
  TValue
> & {
  headerAlign?: "left" | "center" | "right";
  cellAlign?: "left" | "center" | "right";
};

export const categoryColumns: ExtendedColumnDef<Category>[] = [
  {
    // accessorKey: "categoryName",
    id: "preview",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Preview" />
    ),
    cell: ({ row }) => {
      const category = row.original;
      const Icon = LucideIcons[category.icon as keyof typeof LucideIcons];
      return (
        <div className="font-medium">
          <Badge
            variant="outline"
            className="flex items-center gap-2 border-none text-black"
            style={{ backgroundColor: category.color }}
          >
            <Icon className="w-4 h-4" />
            {category.categoryName}
          </Badge>
        </div>
      );
    },
    enableSorting: false,
    size: 180,
  },
  {
    accessorKey: "categoryName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ getValue }) => (
      <div className="font-medium">{getValue<string>()}</div>
    ),
    enableSorting: false,
    size: 180,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ getValue }) => {
      const value = getValue<"expense" | "income">();
      return (
        <Badge
          variant={value === "income" ? "default" : "secondary"}
          className="capitalize"
        >
          {value}
        </Badge>
      );
    },
    enableSorting: false,
    headerAlign: "center",
    cellAlign: "center",
    size: 100,
  },
  {
    accessorKey: "color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Color" />
    ),
    cell: ({ getValue }) => {
      const color = getValue<string>();
      return (
        <div className="flex justify-center">
          <div
            className="w-5 h-5 rounded-full border"
            style={{ backgroundColor: color }}
          />
        </div>
      );
    },
    enableSorting: false,
    headerAlign: "center",
    cellAlign: "center",
    size: 80,
  },
  {
    accessorKey: "icon",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Icon" />
    ),
    cell: ({ getValue }) => {
      const iconKey = getValue<string>();
      const Icon = LucideIcons[iconKey as keyof typeof LucideIcons];
      return Icon ? (
        <div className="flex justify-center">
          <Icon className="w-5 h-5" />
        </div>
      ) : null;
    },
    enableSorting: false,
    headerAlign: "center",
    cellAlign: "center",
    size: 70,
  },
  {
    accessorKey: "isDefault",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Default" />
    ),
    cell: ({ getValue }) => {
      const isDefault = getValue<boolean>();
      return (
        <div className="text-center">
          {isDefault ? <Badge variant="outline">Yes</Badge> : <></>}
        </div>
      );
    },
    enableSorting: false,
    headerAlign: "center",
    cellAlign: "center",
    size: 90,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ getValue }) => {
      const date = new Date(getValue<Date>());
      return (
        <div className="text-sm text-muted-foreground text-center">
          {formatter.format(date)}
        </div>
      );
    },
    enableSorting: false,
    headerAlign: "center",
    cellAlign: "center",
    size: 130,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center gap-2">
        <AddCategory categoryToEdit={row.original} showIcon />
        {/* {!row.original.isDefault && (
          <DeleteCategory categoryId={row.original.id} showIcon />
        )} */}
      </div>
    ),
    headerAlign: "center",
    cellAlign: "center",
    size: 80,
  },
];
