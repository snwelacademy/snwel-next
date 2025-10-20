"use client"

import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp, Edit, Eye, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { formatDateInReadable } from "@/lib/utils"
import Link from "next/link"
import { ListOptions } from "@/types/ListOptions"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useDebounce } from "@uidotdev/usehooks"
import { deleteBlogCategory, getAllBlogCategories } from "@/services/admin/admin-category-service"
import { BlogCategory } from "@/types/BlogCategory"
import BlogCategoryFormSheet from "./MutateBlog"


export default function BlogCategoryTable() {
    const [search, setSearch] = useState("")
    const [sortField, setSortField] = useState<keyof BlogCategory>("createdAt")
    const debouncedSearch = useDebounce(search, 300)
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)
    const [statusFilter, setStatusFilter] = useState("all")
    const [options, setOptions] = useState<ListOptions>({ page: 1, limit: 10 })
    const { data: categories, isLoading } = useQuery({
        queryKey: ['/blog-categories', debouncedSearch, sortField, sortOrder, currentPage],
        queryFn: async () => getAllBlogCategories(options)
    })

    const { toast } = useToast()
    const queryClient = useQueryClient()

    const handleSort = (field: keyof BlogCategory) => {
        if (field === sortField) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortOrder("asc")
        }
    }

    const renderSortIcon = (field: keyof BlogCategory) => {
        if (field !== sortField) return null
        return sortOrder === "asc" ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
    }

    const renderTableHeader = (label: string, field: keyof BlogCategory) => (
        <TableHead>
            <Button variant="ghost" onClick={() => handleSort(field)}>
                {label}
                {renderSortIcon(field)}
            </Button>
        </TableHead>
    )

    const handleDelete = async (id: string) => {
        try {
            await deleteBlogCategory(id)
            queryClient.invalidateQueries({ queryKey: ['/blog-categories'] })
            toast({ title: "Blog category deleted successfully!", variant: 'success' })
        } catch (error: any) {
            toast({ title: 'Blog category deletion failed', variant: 'destructive', description: error.message || "There was a problem deleting the blog category!" })
        }
    }

    const handleSubmit = () => {
        queryClient.invalidateQueries({queryKey: ['/blog-categories', debouncedSearch, sortField, sortOrder, currentPage]})
    }

    useEffect(() => {
        setOptions({
            search: debouncedSearch,
            filter: {
                isActive: statusFilter !== "all" ? statusFilter === "active" : undefined,
            },
            page: currentPage,
            limit: itemsPerPage,
            sort: { [sortField]: sortOrder },
        });
    }, [debouncedSearch, sortField, sortOrder, statusFilter, currentPage, itemsPerPage]);

    return (
        <div className="space-y-4 p-4 bg-white dark:bg-gray-900">
            <h1 className="text-2xl font-bold mb-4">Blog Categories</h1>
            <div className="flex space-x-2 justify-between">
                <div className="flex items-center justify-center gap-5">
                    <Input
                        placeholder="Search categories..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm"
                    />
                    <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <BlogCategoryFormSheet
                    triggerButton={<Button>Create New</Button>}
                    onSubmit={handleSubmit}
                ></BlogCategoryFormSheet>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {renderTableHeader("Name", "name")}
                            {renderTableHeader("Slug", "slug")}
                            {renderTableHeader("Created At", "createdAt")}
                            {renderTableHeader("Active", "isActive")}
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : categories?.docs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No categories found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            categories?.docs.map((category) => (
                                <TableRow key={category._id}>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{category.slug}</TableCell>
                                    <TableCell>{formatDateInReadable(category.createdAt)}</TableCell>
                                    <TableCell>{category.isActive ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" size="icon">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>{category.name}</DialogTitle>
                                                        <DialogDescription>
                                                            <div className="mt-4 space-y-2">
                                                                <p><strong>Slug:</strong> {category.slug}</p>
                                                                <p><strong>Description:</strong> {category.description || 'No description available.'}</p>
                                                                <p><strong>Active:</strong> {category.isActive ? 'Yes' : 'No'}</p>
                                                                <p><strong>Created:</strong> {formatDateInReadable(category.createdAt)}</p>
                                                                <p><strong>Updated:</strong> {formatDateInReadable(category.updatedAt)}</p>
                                                            </div>
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                </DialogContent>
                                            </Dialog>
                                            <BlogCategoryFormSheet
                                                triggerButton={
                                                    <Button variant="outline" size="icon">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                }
                                                onSubmit={handleSubmit}
                                                category={category}
                                            ></BlogCategoryFormSheet>
                                            
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive" size="icon">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete the blog category
                                                            "{category.name}".
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(category._id)}>
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
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
                <span>Page {categories?.currentPage || 1} of {categories?.totalPages || 1}</span>
                <Button
                    onClick={() => setCurrentPage(page => page + 1)}
                    disabled={!categories?.hasNext}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}