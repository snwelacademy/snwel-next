import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Download } from "lucide-react"
import { Input } from "./input"
import { Button } from "./button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"
import { DateRangePicker } from "./date-range-picker"
import { useDebounce } from "@uidotdev/usehooks"
import { ListResponse } from "@/types/ApiResponses"

export interface Column<T> {
  key: keyof T
  label: string
  sortable?: boolean
  render?: (value: T) => React.ReactNode
  filterable?: boolean
  filterOptions?: { label: string; value: string }[]
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: ListResponse<T>
  onOptionsChange: (options: any) => void
  enableSearch?: boolean
  enableDateFilter?: boolean
  enableExport?: boolean
  onExport?: () => Promise<void>
  loading?: boolean
  itemsPerPage?: number
}

export function DataTable<T>({
  columns,
  data,
  onOptionsChange,
  enableSearch = true,
  enableDateFilter = false,
  enableExport = false,
  onExport,
  loading = false,
  itemsPerPage = 10,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 300)
  const [sortField, setSortField] = useState<keyof T | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    onOptionsChange({
      search: debouncedSearch,
      filter: filters,
      page: currentPage,
      limit: itemsPerPage,
      sort: sortField ? { [sortField]: sortOrder } : undefined,
    })
  }, [debouncedSearch, sortField, sortOrder, filters, currentPage, itemsPerPage])

  const handleSort = (field: keyof T) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const renderSortIcon = (field: keyof T) => {
    if (field !== sortField) return null
    return sortOrder === "asc" ? (
      <ChevronUp className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4" />
    )
  }

  const handleExport = async () => {
    if (!onExport) return
    setExporting(true)
    try {
      await onExport()
    } finally {
      setExporting(false)
    }
  }

  const renderSkeletonRow = () => (
    <TableRow>
      {columns.map((_, index) => (
        <TableCell key={index}>
          <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </TableCell>
      ))}
    </TableRow>
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {enableSearch && (
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        )}

        {columns
          .filter((column) => column.filterable && column.filterOptions)
          .map((column) => (
            <Select
              key={String(column.key)}
              value={filters[String(column.key)] || "all"}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  [column.key]: value === "all" ? "" : value
                }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={`Filter ${column.label}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{`All ${column.label}s`}</SelectItem>
                {column.filterOptions?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}

        {enableDateFilter && (
          <DateRangePicker
            onUpdate={(value) =>
              setFilters((prev) => ({
                ...prev,
                startDate: value.range.from?.toISOString() || '',
                endDate: value.range.to?.toISOString() || '',
              }))
            }
          />
        )}

        {enableExport && (
          <Button onClick={handleExport} disabled={loading || exporting}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={String(column.key)}>
                  {column.sortable ? (
                    <Button
                      variant="ghost"
                      onClick={() => handleSort(column.key)}
                    >
                      {column.label}
                      {renderSortIcon(column.key)}
                    </Button>
                  ) : (
                    column.label
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array(itemsPerPage)
                .fill(0)
                .map((_, index) => renderSkeletonRow())
            ) : data.docs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No data found.
                </TableCell>
              </TableRow>
            ) : (
              data.docs.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell key={String(column.key)}>
                      {column.render
                        ? column.render(row)
                        : String(row[column.key] || "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
          disabled={!data.prevPage}
        >
          Previous
        </Button>
        <span>
          Page {data.currentPage} of {data.totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage((page) => page + 1)}
          disabled={!data.hasNext}
        >
          Next
        </Button>
      </div>
    </div>
  )
} 