'use client'
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { WebinarCellAction } from "./cell-action";
import {  Webinar } from "@/types";
import { formatDate, getAvatarLetters, getCurrencySymbol } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { nanoid } from "nanoid";

export const columns: ColumnDef<Webinar>[] = [
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
    accessorKey: "startDate",
    header: "Started On",
    cell: ({ row }) => formatDate(row.original.startDate)
  },
  {
    accessorKey: "hosts",
    header: "Hosts",
    cell: ({ row }) => <span className="inline-flex items-center space-x-1">
      {
        row.original.hosts.length > 0 ?
          <div className="flex -space-x-3 *:ring *:ring-white">

            {
              row.original.hosts.map(h => <Avatar key={nanoid()}>
                <AvatarImage src={h.profilePic} />
                <AvatarFallback>{getAvatarLetters(h.name)}</AvatarFallback>
              </Avatar>)
            }
          </div> :
          <span>No Hosts</span>
      }
    </span>
  },
  {
    accessorKey: "isActive",
    header: "Active",
  },
  {
    accessorKey: "price",
    header: "PRICE",
    cell: ({ row }) => {
      return `${getCurrencySymbol(row.original.currency || 'INR')}${row.original?.price || 0}`
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <WebinarCellAction data={row.original} />,
  },
];
