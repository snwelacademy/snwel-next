import React, { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Column<T> {
  key: keyof T
  label: string
  render?: (item: T) => React.ReactNode
  sortable?: boolean
}

interface GenericTableProps<T> {
  data: T[]
  columns: Column<T>[]
  initialSortField?: keyof T
  initialSortOrder?: 'asc' | 'desc'
  onSort?: (field: keyof T, order: 'asc' | 'desc') => void
  itemsPerPage?: number
  loading?: boolean
  renderActions?: (item: T) => React.ReactNode
}

export function GenericTable<T>({
  data,
  columns,
  initialSortField,
  initialSortOrder = 'asc',
  onSort,
  itemsPerPage = 10,
  loading = false,
  renderActions,
}: GenericTableProps<T>) {
  const [sortField, setSortField] = useState<keyof T | undefined>(initialSortField)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialSortOrder)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [data])

  const handleSort = (field: keyof T) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
    onSort && onSort(field, sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const renderSortIcon = (field: keyof T) => {
    if (field !== sortField) return null
    return sortOrder === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
  }

  const renderTableHeader = (column: Column<T>) => (
    <TableHead key={column.key.toString()}>
      {column.sortable ? (
        <Button variant="ghost" onClick={() => handleSort(column.key)}>
          {column.label}
          {renderSortIcon(column.key)}
        </Button>
      ) : (
        column.label
      )}
    </TableHead>
  )

  const renderSkeletonRow = () => (
    <TableRow>
      {columns.map((column, index) => (
        <TableCell key={index}>
          <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </TableCell>
      ))}
      {renderActions && (
        <TableCell>
          <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </TableCell>
      )}
    </TableRow>
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(data.length / itemsPerPage)

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(renderTableHeader)}
              {renderActions && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array(itemsPerPage).fill(0).map((_, index) => renderSkeletonRow())
            ) : currentItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (renderActions ? 1 : 0)} className="h-24 text-center">
                  No items found.
                </TableCell>
              </TableRow>
            ) : (
              currentItems.map((item, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.key.toString()}>
                      {column.render ? column.render(item) : String(item[column.key ])}
                    </TableCell>
                  ))}
                  {renderActions && (
                    <TableCell>
                      {renderActions(item)}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button
          onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}