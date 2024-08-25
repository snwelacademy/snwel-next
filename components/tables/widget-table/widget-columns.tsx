'use client'
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { WidgetCellAction } from "./widget-cell-action";
import { Widget } from "@/types/WidgetTypes";

export const widgetColumns: ColumnDef<Widget>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "NAME",
  },
  {
    accessorKey: "type",
    header: "TYPE",
  },
  {
    accessorKey: "createdAt",
    header: "CREATED AT",
    cell: ({ row }) => <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => <WidgetCellAction data={row.original} />,
  },
];
