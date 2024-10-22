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
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
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
import { deleteBlog, getAllBlogs } from "@/services/admin/admin-blog-service"
import { Blog } from "@/types/Blog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useDebounce } from "@uidotdev/usehooks"


// Mock functions for API calls
// const getAllBlogs = async () => {
//   // Simulated API call
//   return {
//     docs: [
//       {
//         id: "1",
//         title: "First Blog Post",
//         content: "This is the content of the first blog post.",
//         author: { _id: "a1", name: "John Doe", email: "john@example.com", profilePic: "/placeholder.svg" },
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         published: true,
//         excerpt: "This is the content of the first blog post."
//       },
//     ],
//     currentPage: 1,
//     totalPages: 1,
//     hasNext: false,
//   }
// }


export default function BlogTable() {
    const [search, setSearch] = useState("")
    const [sortField, setSortField] = useState<keyof Blog>("createdAt")
    const debouncedSearch = useDebounce(search, 300)
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)
    const [statusFilter, setStatusFilter] = useState("all")
    const [options, setOptions] = useState<ListOptions>({ page: 1, limit: 10 })
    const { data: blogs, isLoading } = useQuery({
        queryKey: ['/blogs', debouncedSearch, sortField, sortOrder, currentPage],
        queryFn: async () => getAllBlogs(options)
    })

    const { toast } = useToast()
    const queryClient = useQueryClient()

    const handleSort = (field: keyof Blog) => {
        if (field === sortField) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortOrder("asc")
        }
    }

    const renderSortIcon = (field: keyof Blog) => {
        if (field !== sortField) return null
        return sortOrder === "asc" ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
    }

    const renderTableHeader = (label: string, field: keyof Blog) => (
        <TableHead>
            <Button variant="ghost" onClick={() => handleSort(field)}>
                {label}
                {renderSortIcon(field)}
            </Button>
        </TableHead>
    )

    const handleDelete = async (id: string) => {
        try {
            await deleteBlog(id)
            queryClient.invalidateQueries({ queryKey: ['/blogs', debouncedSearch, sortField, sortOrder, currentPage] })
            toast({ title: "Blog post deleted successfully!", variant: 'success' })
        } catch (error: any) {
            toast({ title: 'Blog deletion failed', variant: 'destructive', description: error.message || "There was a problem deleting the blog post!" })
        }
    }

    useEffect(() => {
        setOptions({
          search: debouncedSearch,
          filter: {
            status: statusFilter !== "all" ? statusFilter : undefined, // Handle 'all' filter
          },
          page: currentPage,
          limit: itemsPerPage,
          sort: { [sortField]: sortOrder }, // Sort order will be handled by the backend
        });
      }, [debouncedSearch, sortField, sortOrder, statusFilter, currentPage, itemsPerPage]);

    return (
        <div className="space-y-4 p-4 bg-white dark:bg-gray-900">
            <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
            <div className="flex space-x-2 justify-between">
                <div className="flex items-center justify-center gap-5">
                    <Input
                        placeholder="Search blogs..."
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
                            <SelectItem value="applied">Published</SelectItem>
                            <SelectItem value="interview">Draft</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Link href={'/admin/blog/new'}>
                    <Button>Create New</Button>
                </Link>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {renderTableHeader("Title", "title")}
                            {renderTableHeader("Author", "author")}
                            {renderTableHeader("Created At", "createdAt")}
                            {renderTableHeader("Published", "published")}
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
                        ) : blogs?.docs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No blogs found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            blogs?.docs.map((blog) => (
                                <TableRow key={blog._id}>
                                    <TableCell className="text-center">{blog.title}</TableCell>
                                    <TableCell className="text-center">{blog.author?.name || 'Unknown'}</TableCell>
                                    <TableCell className="text-center">{formatDateInReadable(blog.createdAt)}</TableCell>
                                    <TableCell className="text-center">{blog.published ? 'Yes' : 'No'}</TableCell>
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
                                                        <DialogTitle>{blog.title}</DialogTitle>
                                                        <DialogDescription>
                                                            <div className="mt-4 space-y-2">
                                                                <p><strong>Author:</strong> {blog.author?.name}</p>
                                                                <p><strong>Created:</strong> {formatDateInReadable(blog.createdAt)}</p>
                                                                <p><strong>Updated:</strong> {formatDateInReadable(blog.updatedAt)}</p>
                                                                <p><strong>Excerpt:</strong> {blog?.excerpt || 'No excerpt available.'}</p>
                                                                <div><strong>Content:</strong> <p>{blog.content}</p></div>
                                                            </div>
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                </DialogContent>
                                            </Dialog>
                                            <Link href={`/admin/blog/${blog._id||'#'}`}><Button variant="outline" size="icon">
                                                <Edit className="h-4 w-4" />
                                            </Button></Link>
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
                                                            This action cannot be undone. This will permanently delete the blog post
                                                            "{blog.title}".
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(blog._id)}>
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
                <span>Page {blogs?.currentPage || 1} of {blogs?.totalPages || 1}</span>
                <Button
                    onClick={() => setCurrentPage(page => page + 1)}
                    disabled={!blogs?.hasNext}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}