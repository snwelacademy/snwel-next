'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import ModernLoader, { CardLoader, TableLoader } from '@/components/ModernLoader'
import BreadCrumb from '@/components/BreadCrumb'
import { usePermission } from '@/hooks/usePermissions'
import { TESTIMONIAL_PERMISSIONS } from '@/constants/permissions'
import { PermissionGuard } from '@/components/guards/PermissionGuard'
import { handlePermissionError } from '@/lib/permissionErrorHandler'
import {
    MessageSquareQuote,
    Plus,
    Search,
    Edit,
    Trash2,
    User
} from 'lucide-react'
import { deleteTestimonial, getAllTestimonials, createTestimonial, updateTestimonial } from '@/services/admin/admin-testimonial-service'
import { cn } from '@/lib/utils'
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
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useToast } from '@/components/ui/use-toast'
import { Testimonial } from '@/types/Testimonial'
import FileManagerPopup from '@/components/modal/FileManager'

const breadcrumbItems = [{ title: "Testimonials", link: "/admin/testimonials" }]

function TestimonialPageContent() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')
    const queryClient = useQueryClient()
    const { toast } = useToast()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)

    const canCreateTestimonial = usePermission(TESTIMONIAL_PERMISSIONS.TESTIMONIAL_CREATE)
    const canUpdateTestimonial = usePermission(TESTIMONIAL_PERMISSIONS.TESTIMONIAL_UPDATE)
    const canDeleteTestimonial = usePermission(TESTIMONIAL_PERMISSIONS.TESTIMONIAL_DELETE)

    const { data, isLoading } = useQuery({
        queryKey: ['/admin/testimonials'],
        queryFn: () => getAllTestimonials({ page: 1, limit: 50 })
    })

    const filteredTestimonials = data?.docs?.filter((testimonial: Testimonial) =>
        testimonial.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        testimonial.position?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        testimonial.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        testimonial.content?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || []

    const createMutation = useMutation({
        mutationFn: createTestimonial,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/admin/testimonials'] })
            toast({ title: 'Testimonial created successfully!' })
            setIsDialogOpen(false)
            setEditingTestimonial(null)
        },
        onError: (error: any) => {
            handlePermissionError(error, 'Failed to create testimonial')
            toast({ title: 'Creation failed', description: error?.message || 'There was a problem creating the testimonial!', variant: 'destructive' })
        }
    })

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string, data: Partial<Testimonial> }) => updateTestimonial(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/admin/testimonials'] })
            toast({ title: 'Testimonial updated successfully!' })
            setIsDialogOpen(false)
            setEditingTestimonial(null)
        },
        onError: (error: any) => {
            handlePermissionError(error, 'Failed to update testimonial')
            toast({ title: 'Update failed', description: error?.message || 'There was a problem updating the testimonial!', variant: 'destructive' })
        }
    })

    const deleteMutation = useMutation({
        mutationFn: deleteTestimonial,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/admin/testimonials'] })
            toast({ title: 'Testimonial deleted successfully!' })
        },
        onError: (error: any) => {
            handlePermissionError(error, 'Failed to delete testimonial')
            toast({ title: 'Deletion failed', description: error?.message || 'There was a problem deleting the testimonial!', variant: 'destructive' })
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = {
            name: formData.get('name') as string,
            position: formData.get('position') as string,
            company: formData.get('company') as string,
            content: formData.get('content') as string,
            avatar: formData.get('avatar') as string,
            rating: parseInt(formData.get('rating') as string) || undefined,
            published: formData.get('published') === 'true',
        }

        if (editingTestimonial) {
            updateMutation.mutate({ id: editingTestimonial._id, data })
        } else {
            createMutation.mutate(data)
        }
    }

    const handleEdit = (testimonial: Testimonial) => {
        setEditingTestimonial(testimonial)
        setIsDialogOpen(true)
    }

    const handleCreate = () => {
        setEditingTestimonial(null)
        setIsDialogOpen(true)
    }

    return (
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <BreadCrumb items={breadcrumbItems} />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <MessageSquareQuote className="h-8 w-8 text-primary" />
                        Testimonial Management
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage customer testimonials and reviews
                    </p>
                </div>
                {canCreateTestimonial && (
                    <Button onClick={handleCreate} size="lg" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Testimonial
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
                            <CardTitle className="text-sm font-medium">Total Testimonials</CardTitle>
                            <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900/20">
                                <MessageSquareQuote className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data?.total || 0}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                All testimonials
                            </p>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Testimonials Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Testimonials</CardTitle>
                    <CardDescription>Manage customer testimonials and reviews</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search testimonials by name, position, company, or content..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {isLoading ? (
                            <TableLoader />
                        ) : filteredTestimonials.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="rounded-full bg-muted p-3 mb-4">
                                    <MessageSquareQuote className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <h3 className="font-semibold text-lg mb-1">No testimonials found</h3>
                                <p className="text-sm text-muted-foreground">
                                    {searchQuery ? 'Try adjusting your search' : 'Get started by adding your first testimonial'}
                                </p>
                            </div>
                        ) : (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted/50">
                                            <TableHead>Name</TableHead>
                                            <TableHead>Position</TableHead>
                                            <TableHead>Company</TableHead>
                                            <TableHead>Rating</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredTestimonials.map((testimonial: Testimonial) => (
                                            <TableRow key={testimonial._id} className="hover:bg-muted/50">
                                                <TableCell className="font-medium">{testimonial.name}</TableCell>
                                                <TableCell>{testimonial.position || '-'}</TableCell>
                                                <TableCell>{testimonial.company || '-'}</TableCell>
                                                <TableCell>
                                                    {testimonial.rating ? `⭐ ${testimonial.rating}/5` : '-'}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={testimonial.published ? 'default' : 'secondary'}>
                                                        {testimonial.published ? 'Published' : 'Draft'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {canUpdateTestimonial && (
                                                            <Button variant="outline" size="icon" onClick={() => handleEdit(testimonial)}>
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                        {canDeleteTestimonial && (
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <Button variant="destructive" size="icon" title="Delete">
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Delete this testimonial?</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            This action cannot be undone. This will permanently delete the testimonial from "{testimonial.name}".
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction onClick={() => deleteMutation.mutate(testimonial._id)}>
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

            {/* Create/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>{editingTestimonial ? 'Edit Testimonial' : 'Create Testimonial'}</DialogTitle>
                            <DialogDescription>
                                {editingTestimonial ? 'Update the testimonial details below.' : 'Add a new customer testimonial.'}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="John Doe"
                                    defaultValue={editingTestimonial?.name || ''}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="position">Position</Label>
                                <Input
                                    id="position"
                                    name="position"
                                    placeholder="CEO"
                                    defaultValue={editingTestimonial?.position || ''}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="company">Company</Label>
                                <Input
                                    id="company"
                                    name="company"
                                    placeholder="Acme Inc."
                                    defaultValue={editingTestimonial?.company || ''}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="content">Testimonial</Label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    placeholder="This product has been amazing..."
                                    defaultValue={editingTestimonial?.content || ''}
                                    rows={4}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="avatar">Avatar Image</Label>
                                <Input
                                    id="avatar"
                                    name="avatar"
                                    type="hidden"
                                    defaultValue={editingTestimonial?.avatar || ''}
                                />
                                <FileManagerPopup
                                    multiSelect={false}
                                    onChange={(values) => {
                                        const input = document.getElementById('avatar') as HTMLInputElement
                                        if (input) input.value = values[0] || ''
                                    }}
                                    trigger={
                                        <Button type="button" variant="outline" className="w-full">
                                            Select Avatar
                                        </Button>
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="rating">Rating (1-5)</Label>
                                <Input
                                    id="rating"
                                    name="rating"
                                    type="number"
                                    min="1"
                                    max="5"
                                    placeholder="5"
                                    defaultValue={editingTestimonial?.rating || ''}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="published">Status</Label>
                                <select
                                    id="published"
                                    name="published"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    defaultValue={editingTestimonial?.published ? 'true' : 'false'}
                                >
                                    <option value="false">Draft</option>
                                    <option value="true">Published</option>
                                </select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                                {createMutation.isPending || updateMutation.isPending ? 'Saving...' : editingTestimonial ? 'Update' : 'Create'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

// Wrap with permission guard
export default function TestimonialPage() {
    return (
        <PermissionGuard permission={TESTIMONIAL_PERMISSIONS.TESTIMONIAL_VIEW}>
            <TestimonialPageContent />
        </PermissionGuard>
    )
}
