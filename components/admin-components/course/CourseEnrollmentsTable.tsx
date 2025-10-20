// import React, { useState, useEffect } from 'react'
// import { Download } from 'lucide-react'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import { useToast } from '@/components/ui/use-toast'
// import { useDebounce } from '@uidotdev/usehooks'
// import { useQuery, useQueryClient } from '@tanstack/react-query'
// import { CourseEnrollment, UpdateCourseQuery } from '@/types/CourseEnrollment'
// import { ListOptions } from '@/types/ListOptions'
// import { getAllEnrollments as getAllCourseEnrollments, updateEnrollment as updateCourseEnrollment, deleteEnrollment as deleteCourseEnrollment } from '@/services/admin/course-enrollment'
// import { formatDateInReadable } from '@/lib/utils'
// import SingleEnrollmentSheet from './EnrollmentSheet'
// import { DeleteAlertDialog } from './DeleteAlertDialog'
// import { GenericTable } from '@/components/ui/generic-table'

// export default function CourseEnrollmentTable() {
//   const [exporting, setExporting] = useState(false)
//   const [search, setSearch] = useState('')
//   const debouncedSearch = useDebounce(search, 300)
//   const [statusFilter, setStatusFilter] = useState<CourseEnrollment['status'] | 'all'>('all')
//   const [paymentStatusFilter, setPaymentStatusFilter] = useState<CourseEnrollment['paymentStatus'] | 'all'>('all')
//   const [options, setOptions] = useState<ListOptions>({ page: 1, limit: 10 })
//   const { data: enrollments, isLoading: loading } = useQuery({
//     queryKey: ['/course-enrollments', JSON.stringify(options)],
//     queryFn: () => getAllCourseEnrollments(options)
//   })
//   const { toast } = useToast()
//   const client = useQueryClient()

//   useEffect(() => {
//     setOptions(prevOptions => ({
//       ...prevOptions,
//       search: debouncedSearch,
//       filter: {
//         status: statusFilter !== 'all' ? statusFilter : undefined,
//         paymentStatus: paymentStatusFilter !== 'all' ? paymentStatusFilter : undefined,
//       },
//     }))
//   }, [debouncedSearch, statusFilter, paymentStatusFilter])

//   const handleStatusChange = async (id: string, newStatus: CourseEnrollment['status']) => {
//     try {
//       await updateCourseEnrollment({ _id: id, status: newStatus } as UpdateCourseQuery)
//       await client.invalidateQueries({ queryKey: ['/course-enrollments', JSON.stringify(options)] })
//       toast({ title: `Changed status to ${newStatus} successfully!`, variant: 'success' })
//     } catch (error: any) {
//       toast({ title: 'Status update failed', variant: 'destructive', description: error.message || 'There was a problem changing the status!' })
//     }
//   }

//   const handlePaymentStatusChange = async (id: string, newStatus: CourseEnrollment['paymentStatus']) => {
//     try {
//       await updateCourseEnrollment({ _id: id, paymentStatus: newStatus } as UpdateCourseQuery)
//       await client.invalidateQueries({ queryKey: ['/course-enrollments', JSON.stringify(options)] })
//       toast({ title: `Changed payment status to ${newStatus} successfully!`, variant: 'success' })
//     } catch (error: any) {
//       toast({ title: 'Payment status update failed', variant: 'destructive', description: error.message || 'There was a problem changing the payment status!' })
//     }
//   }

//   const handleDelete = async (id: string) => {
//     try {
//       await deleteCourseEnrollment(id)
//       await client.invalidateQueries({ queryKey: ['/course-enrollments', JSON.stringify(options)] })
//       toast({ title: `Enrollment deleted successfully!`, variant: 'success' })
//     } catch (error: any) {
//       toast({ title: 'Enrollment deletion failed', variant: 'destructive', description: error.message || 'There was a problem while deleting the enrollment!' })
//     }
//   }

//   const handleExport = async () => {
//     if (!enrollments || !enrollments.docs) return
//     setExporting(true)
//     try {
//       const csvContent = await getAllCourseEnrollments(options) as any;
//       if (!csvContent) {
//         setExporting(false)
//         return
//       }
//       const blob = new Blob(csvContent, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
//       const url = URL.createObjectURL(blob)
//       const link = document.createElement('a')
//       link.setAttribute('href', url)
//       link.setAttribute('download', `course_enrollments_${options.page}.xlsx`)
//       document.body.appendChild(link)
//       link.click()
//       document.body.removeChild(link)
//     } catch (error: any) {
//       toast({ title: 'Export failed. Please try again later.', description: error.message, variant: 'destructive' })
//     } finally {
//       setExporting(false)
//     }
//   }

//   const columns = [
//     { key: 'userId', label: 'User', render: (item: CourseEnrollment) => item.userId.name },
//     { key: 'userId', label: 'Email', render: (item: CourseEnrollment) => item.userId.email },
//     { key: 'courseId', label: 'Course', render: (item: CourseEnrollment) => item.courseId.title },
//     { 
//       key: 'status', 
//       label: 'Status', 
//       sortable: true,
//       render: (item: CourseEnrollment) => (
//         <Select 
//           value={item.status} 
//           onValueChange={(value: CourseEnrollment['status']) => handleStatusChange(item._id, value)}
//         >
//           <SelectTrigger className="w-[120px]">
//             <SelectValue />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="ACTIVE">Active</SelectItem>
//             <SelectItem value="PENDING">Pending</SelectItem>
//             <SelectItem value="DECLINED">Declined</SelectItem>
//           </SelectContent>
//         </Select>
//       )
//     },
//     { 
//       key: 'paymentStatus', 
//       label: 'Payment Status', 
//       sortable: true,
//       render: (item: CourseEnrollment) => (
//         <Select 
//           value={item.paymentStatus} 
//           onValueChange={(value: CourseEnrollment['paymentStatus']) => handlePaymentStatusChange(item._id, value)}
//         >
//           <SelectTrigger className="w-[120px]">
//             <SelectValue />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="PAID">Paid</SelectItem>
//             <SelectItem value="PENDING">Pending</SelectItem>
//             <SelectItem value="FAILED">Failed</SelectItem>
//           </SelectContent>
//         </Select>
//       )
//     },
//     { key: 'paymentMethod', label: 'Payment Method', sortable: true },
//     { key: 'expiredAt', label: 'Expires On', sortable: true, render: (item: CourseEnrollment) => formatDateInReadable(item.expiredAt) },
//     { key: 'createdAt', label: 'Enrolled On', sortable: true, render: (item: CourseEnrollment) => formatDateInReadable(item.createdAt) },
//   ]

//   const renderActions = (item: CourseEnrollment) => (
//     <div className="flex space-x-2">
//       <ViewDetailsSheet enrollment={item} />
//       <DeleteAlertDialog onDelete={() => handleDelete(item._id)} />
//     </div>
//   )

//   return (
//     <div className="space-y-4 p-4 bg-white dark:bg-gray-900">
//       <h1 className="text-2xl font-bold mb-4">Course Enrollments</h1>
//       <div className="flex space-x-2">
//         <Input
//           placeholder="Search enrollments..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="max-w-sm"
//         />
//         <Select value={statusFilter} onValueChange={(value: CourseEnrollment['status'] | 'all') => setStatusFilter(value)}>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Filter by status" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Statuses</SelectItem>
//             <SelectItem value="ACTIVE">Active</SelectItem>
//             <SelectItem value="PENDING">Pending</SelectItem>
//             <SelectItem value="DECLINED">Declined</SelectItem>
//           </SelectContent>
//         </Select>
//         <Select value={paymentStatusFilter} onValueChange={(value: CourseEnrollment['paymentStatus'] | 'all') => setPaymentStatusFilter(value)}>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Filter by payment status" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Payment Statuses</SelectItem>
//             <SelectItem value="PAID">Paid</SelectItem>
//             <SelectItem value="PENDING">Pending</SelectItem>
//             <SelectItem value="FAILED">Failed</SelectItem>
//           </SelectContent>
//         </Select>
//         <Button onClick={handleExport} disabled={loading || exporting}>
//           <Download className="mr-2 h-4 w-4" />
//           Export CSV
//         </Button>
//       </div>
//       <GenericTable
//         data={enrollments?.docs || []}
//         columns={columns as any[]}
//         initialSortField="createdAt"
//         initialSortOrder="desc"
//         onSort={(field, order) => setOptions(options => ({ ...options, sort: { [field]: order } }))}
//         itemsPerPage={10}
//         loading={loading}
//         renderActions={renderActions}
//       />
//     </div>
//   )
// }