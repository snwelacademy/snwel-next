'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import ModernLoader, { CardLoader, TableLoader } from '@/components/ModernLoader'
import BreadCrumb from '@/components/BreadCrumb'
import { usePermission } from '@/hooks/usePermissions'
import { BLOG_PERMISSIONS } from '@/constants/permissions'
import { PermissionGuard } from '@/components/guards/PermissionGuard'
import { handlePermissionError } from '@/lib/permissionErrorHandler'
import {
  FileText,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Clock,
  CheckCircle2
} from 'lucide-react'
import { deleteBlog, getAllBlogs } from '@/services/admin/admin-blog-service'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

const breadcrumbItems = [{ title: "Blogs", link: "/admin/blog" }]

function BlogPageContent() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const canCreateBlog = usePermission(BLOG_PERMISSIONS.BLOG_CREATE)
  const canUpdateBlog = usePermission(BLOG_PERMISSIONS.BLOG_UPDATE)
  const canDeleteBlog = usePermission(BLOG_PERMISSIONS.BLOG_DELETE)

  const { data, isLoading } = useQuery({
    queryKey: ['/admin/blogs'],
    queryFn: () => getAllBlogs({ page: 1, limit: 50 })
  })

  const publishedCount = data?.docs?.filter((b: any) => b.published).length || 0
  const draftCount = data?.docs?.filter((b: any) => !b.published).length || 0

  const filteredBlogs = data?.docs?.filter((blog: any) =>
    blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.author?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  const handleDelete = async (id: string) => {
    try {
      await deleteBlog(id)
      await queryClient.invalidateQueries({ queryKey: ['/admin/blogs'] })
      toast({ title: 'Blog post deleted successfully!' })
    } catch (error: any) {
      handlePermissionError(error, 'Failed to delete blog post')
      toast({ title: 'Blog deletion failed', description: error?.message || 'There was a problem deleting the blog post!', variant: 'destructive' })
    }
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            Blog Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Create and manage your blog content
          </p>
        </div>
        {canCreateBlog && (
          <Button asChild size="lg" className="gap-2">
            <Link href="/admin/blog/new">
              <Plus className="h-4 w-4" />
              Create Blog Post
            </Link>
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      {isLoading ? (
        <CardLoader />
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900/20">
                <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.total || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                All blog posts
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900/20">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{publishedCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Live articles
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              <div className="p-2 bg-orange-100 rounded-lg dark:bg-orange-900/20">
                <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{draftCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Work in progress
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Blog Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Blog Posts</CardTitle>
          <CardDescription>Manage your blog content and articles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search blogs by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {isLoading ? (
              <TableLoader />
            ) : filteredBlogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <FileText className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-1">No blogs found</h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery ? 'Try adjusting your search' : 'Get started by creating your first blog post'}
                </p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBlogs.map((blog: any) => (
                      <TableRow key={blog._id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{blog.title}</TableCell>
                        <TableCell>{blog.author || 'Unknown'}</TableCell>
                        <TableCell>
                          <Badge variant={blog.published ? 'default' : 'outline'}>
                            {blog.published ? 'PUBLISHED' : 'DRAFT'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                  <Link href={`/admin/blog/${blog._id}`}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View
                                  </Link>
                                </DropdownMenuItem>
                                {canUpdateBlog && (
                                  <DropdownMenuItem asChild>
                                    <Link href={`/admin/blog/${blog._id}`}>
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit
                                    </Link>
                                  </DropdownMenuItem>
                                )}
                                {!canUpdateBlog && !canDeleteBlog && (
                                  <DropdownMenuItem disabled>
                                    No actions available
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                            {canDeleteBlog && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="icon" title="Delete">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete this blog?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will permanently delete the blog "{blog.title}".
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
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Wrap with permission guard
export default function BlogPage() {
  return (
    <PermissionGuard permission={BLOG_PERMISSIONS.BLOG_VIEW}>
      <BlogPageContent />
    </PermissionGuard>
  )
}
