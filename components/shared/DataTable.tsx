'use client'
import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import TablePagination from "@/components/shared/TablePagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { useDebounce } from "@uidotdev/usehooks";
import { DatePickerWithRange } from "../ui/date-range";
import { DateRangePicker } from "../ui/date-range-picker";
import { objectToQueryString, queryStringToObject } from "@/lib/utils";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { nanoid } from "nanoid";
import { FilterIcon } from "lucide-react";
import dayjs from "dayjs";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  pageNo: number;
  total: number;
  pageSizeOptions?: number[];
  pageCount: number;
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
  dateRange?: boolean,
  filter?: {lable: string, identifier: string, filterKey: string, filterValue: string}[]
}

type TableOptions = {
  page?: number,
  limit?: number,
  search?: string,
  startDate?: any,
  endDate?: any,
  filter?: any
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  pageCount,
  pageSizeOptions = [10, 20, 30, 40, 50],
  pageNo,
  total,
  dateRange = true,
  filter
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Search params
  const [searchString, setSearchString] = useState<string>(searchParams.get("search") ?? "")
  const debounceValue = useDebounce(searchString, 1000);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const [queryObj, setQueryObj] = useState<TableOptions>(queryStringToObject(searchParams.toString()))


  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const qs = objectToQueryString(params);
  
      return new URLSearchParams(qs).toString()
    },
    [queryObj, searchParams],
  );


  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualFiltering: true,
  });

  const setFilter = (value: string) => {
    const result = filter?.find(dt => dt.identifier === value);

    if(!result) return;
    setQueryObj(obj => ({
      ...obj,
      filter:{
        [result.filterKey]: result.filterValue
      } 
    }))
  }


  const handleDateRange = (from: any, to: any) => {
    setQueryObj(state => ({ ...state, startDate: from, endDate: to }))
  }

  useEffect(() => {
    setQueryObj(init => ({ ...init, search: searchString }))
  }, [debounceValue])

  useEffect(() => {
    router.push(
      `${pathname}?${createQueryString(queryObj)}`
    );
  }, [queryObj])

  useEffect(() => {
    setQueryObj(value => ({
      ...value,
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize
    }))
  }, [pagination])

  return (
    <>
      <div className="flex items-center justify-between">
        <Input
          placeholder={`Search ${searchKey}...`}
          value={searchString ?? ""}
          onChange={(event) =>
            setSearchString(event.target.value)
          }
          className="w-full md:max-w-sm"
        />

        <div className="flex items-center gap-3">
          {
            filter &&
            <Select onValueChange={setFilter}>
              <SelectTrigger>
               <FilterIcon className="w-6 h-6"/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Filter</SelectLabel>
                  {
                    filter?.map(((data) => {
                      return <SelectItem value={data.filterValue} key={nanoid()}>{data.lable}</SelectItem>
                    }))
                  }
                  
                </SelectGroup>
              </SelectContent>
            </Select>
          }
          {
            dateRange && 
            <DateRangePicker
              onUpdate={value => {
                handleDateRange(value.range.from, value.range.to)
              }}
              initialDateTo={queryObj.endDate}
              initialDateFrom={queryObj.startDate}
              showCompare={false}
              initialPreset="thisMonth" 
              />
          }
        </div>
      </div>
      <ScrollArea className="rounded-md border h-[calc(80vh-220px)]">
        <Table className="relative">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <TablePagination table={table} pageSizeOptions={pageSizeOptions} />
    </>
  );
}
