"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Download, Loader2, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { usePermission } from "@/hooks/usePermissions"
import { JOB_APPLICATION_PERMISSIONS } from "@/constants/permissions"
import { PermissionGuard } from "@/components/guards/PermissionGuard"
import { handlePermissionError } from "@/lib/permissionErrorHandler"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
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
import { JobApplication } from "@/types/JobApplication"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteJobApplication, exportAllJobApplications, getAllJobApplications, updateJobApplication } from "@/services/admin/admin-jobApplication"
import { ListOptions } from "@/types/ListOptions"
import { useToast } from "../ui/use-toast"
import { formatDateInReadable } from "@/lib/utils"
import { DatePickerWithRange } from "../ui/date-range"
import { DateRangePicker } from "../ui/date-range-picker"
import { useDebounce } from "@uidotdev/usehooks"




function JobApplicationTableContent() {
  const canExport = usePermission(JOB_APPLICATION_PERMISSIONS.JOB_APP_EXPORT)
  const canDelete = usePermission(JOB_APPLICATION_PERMISSIONS.JOB_APP_DELETE)
  const canUpdate = usePermission(JOB_APPLICATION_PERMISSIONS.JOB_APP_UPDATE)
  
  const [exporting, setExporting] = useState(false)
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 300)
  const [sortField, setSortField] = useState<keyof JobApplication>("appliedDate")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [statusFilter, setStatusFilter] = useState<JobApplication["status"] | "all">("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5);
  const [options, setOptions] = useState<ListOptions>({page: 1, limit: 10})
  const { data:applications, isLoading:loading } = useQuery({
    queryKey: ['/job-applications', JSON.stringify(options)],
    queryFn: () => getAllJobApplications(options)
  })
  const {toast} = useToast();
  const client = useQueryClient()



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

  const handleSort = (field: keyof JobApplication) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const renderSortIcon = (field: keyof JobApplication) => {
    if (field !== sortField) return null
    return sortOrder === "asc" ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
  }

  const renderTableHeader = (label: string, field: keyof JobApplication) => (
    <TableHead>
      <Button variant="ghost" onClick={() => handleSort(field)}>
        {label}
        {renderSortIcon(field)}
      </Button>
    </TableHead>
  )

  const renderSkeletonRow = () => (
    <TableRow>
      {Array(9).fill(0).map((_, index) => (
        <TableCell key={index}>
          <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </TableCell>
      ))}
    </TableRow>
  )

  const handleStatusChange = async (id: string, newStatus: JobApplication["status"]) => {
    try {
        const res = await updateJobApplication(id, {status: newStatus});
        await client.invalidateQueries({queryKey: ['/job-applications', JSON.stringify(options)]});
        toast({title: `Change status to ${newStatus} successfully!`, variant: 'success'})
    } catch (error: any) {
        toast({title: 'Status update failed', variant: 'destructive', description: error.message || "There is problem is changing the state!"})
    }
  }

  const handleDelete = async (id: string) => {
    try {
        const res = await deleteJobApplication(id);
        await client.invalidateQueries({queryKey: ['/job-applications', JSON.stringify(options)]});
        toast({title: `Application deleted successfully!`, variant: 'success'})
    } catch (error: any) {
        toast({title: 'Application deletion failed', variant: 'destructive', description: error.message || "There is problem while deleting the application!"})
    }
  }

  const handleExport = async () => {
    if(!applications || !applications.docs) return;
    setExporting(true)
    // Simulate API call
    try {
        const csv = exportAllJobApplications(options);
        const csvContent = await exportAllJobApplications(options)
        if(!csvContent) {
            setExporting(false);
            return;
        }
      // Create a Blob with the CSV content
      const blob = new Blob([csvContent], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
      const url = URL.createObjectURL(blob)

      // Create a link and trigger the download
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", `job_applications_${options.page}.xlsx`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    console.log(csvContent)
    } catch (error: any) {
      toast({title: "Export failed. Please try again later.", description: error.message, variant: 'destructive' });
      // In a real application, you would handle this error and show a user-friendly message
    } finally {
      setExporting(false)
    }
  }

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = applications?.docs.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = applications?.total

  return (
    <div className="space-y-4 p-4 bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-4">Job Applications</h1>
      <div className="flex space-x-2">
        <Input
          placeholder="Search applications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={(value: JobApplication["status"] | "all") => setStatusFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="applied">Applied</SelectItem>
            <SelectItem value="interview">Interview</SelectItem>
            <SelectItem value="offered">Offered</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <DateRangePicker onUpdate={value => setOptions(options => ({...options, startDate: value.range.from, endDate: value.range.to}))}/>

        {canExport && (
          <Button onClick={handleExport} loading={loading}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {renderTableHeader("Applicant Name", "applicantName")}
              <TableHead>Job</TableHead>
              <TableHead>Company</TableHead>
              {renderTableHeader("Email", "email")}
              {renderTableHeader("Phone", "phone")}
              {renderTableHeader("Status", "status")}
              {renderTableHeader("Applied Date", "appliedDate")}
              <TableHead>Resume</TableHead>
              <TableHead>Cover Letter</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array(5).fill(0).map((_, index) => renderSkeletonRow())
            ) : currentItems?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="h-24 text-center">
                  No applications found.
                </TableCell>
              </TableRow>
            ) : (
              currentItems?.map((application) => (
                <TableRow key={application._id}>
                  <TableCell>{application.applicantName}</TableCell>
                  <TableCell>
                    {application.jobId?.slug ? (
                      <a href={`/admin/job-vacancies/${application.jobId?._id}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {application.jobId?.title}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>{application.jobId?.companyName || 'N/A'}</TableCell>
                  <TableCell>{application.email}</TableCell>
                  <TableCell>{application.phone || 'N/A'}</TableCell>
                  <TableCell>
                    <Select 
                      value={application.status} 
                      onValueChange={(value: JobApplication["status"]) => handleStatusChange(application._id, value)}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="applied">Applied</SelectItem>
                        <SelectItem value="interview">Interview</SelectItem>
                        <SelectItem value="offered">Offered</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  
                  <TableCell>{formatDateInReadable(application.appliedDate)}</TableCell>
                  <TableCell>
                    {application.resumeUrl && (
                      <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        View Resume
                      </a>
                    )}
                  </TableCell>
                  <TableCell>
                    {application.coverLetter && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">View Cover Letter</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Cover Letter</DialogTitle>
                            <DialogDescription>
                              {application.coverLetter}
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline">View Details</Button>
                        </SheetTrigger>
                        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                          <SheetHeader>
                            <SheetTitle className="text-2xl">Application Details</SheetTitle>
                            <SheetDescription className="text-sm text-muted-foreground">
                              Complete information about this job application
                            </SheetDescription>
                          </SheetHeader>
                          
                          <div className="space-y-6 mt-6">
                            {/* Applicant Information Card */}
                            <div className="rounded-lg border bg-card p-4 space-y-3">
                              <h3 className="font-semibold text-lg mb-3">Applicant Information</h3>
                              <div className="grid gap-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Name:</span>
                                  <span className="text-sm font-medium">{application.applicantName}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Email:</span>
                                  <span className="text-sm font-medium">{application.email}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Phone:</span>
                                  <span className="text-sm font-medium">{application.phone || 'N/A'}</span>
                                </div>
                              </div>
                            </div>

                            {/* Job Information Card */}
                            {application.jobId && (
                              <div className="rounded-lg border bg-card p-4 space-y-3">
                                <h3 className="font-semibold text-lg mb-3">Job Information</h3>
                                <div className="grid gap-2">
                                  <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Position:</span>
                                    <span className="text-sm font-medium">{application.jobId?.title || 'N/A'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Company:</span>
                                    <span className="text-sm font-medium">{application.jobId?.companyName || 'N/A'}</span>
                                  </div>
                                  {application.jobId?._id && (
                                    <div className="mt-2">
                                      <a 
                                        href={`/admin/job-vacancies/${application.jobId._id}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-sm text-blue-500 hover:underline"
                                      >
                                        View Job Details →
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Application Status Card */}
                            <div className="rounded-lg border bg-card p-4 space-y-3">
                              <h3 className="font-semibold text-lg mb-3">Application Status</h3>
                              <div className="grid gap-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-muted-foreground">Status:</span>
                                  <span className="text-sm font-medium capitalize px-2 py-1 rounded-md bg-primary/10">{application.status}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Applied Date:</span>
                                  <span className="text-sm font-medium">{formatDateInReadable(application.appliedDate)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Created:</span>
                                  <span className="text-sm font-medium">{formatDateInReadable(application.createdAt)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Last Updated:</span>
                                  <span className="text-sm font-medium">{formatDateInReadable(application.updatedAt)}</span>
                                </div>
                              </div>
                            </div>

                            {/* Documents Card */}
                            <div className="rounded-lg border bg-card p-4 space-y-3">
                              <h3 className="font-semibold text-lg mb-3">Documents</h3>
                              <div className="grid gap-3">
                                {application.resumeUrl ? (
                                  <a 
                                    href={application.resumeUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-sm text-blue-500 hover:underline flex items-center gap-2"
                                  >
                                    📄 View Resume
                                  </a>
                                ) : (
                                  <span className="text-sm text-muted-foreground">No resume uploaded</span>
                                )}
                                {application.coverLetter && (
                                  <div className="mt-2">
                                    <p className="text-sm font-medium mb-1">Cover Letter:</p>
                                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">{application.coverLetter}</p>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Notes Card */}
                            {application.notes && (
                              <div className="rounded-lg border bg-card p-4 space-y-3">
                                <h3 className="font-semibold text-lg mb-3">Notes</h3>
                                <p className="text-sm text-muted-foreground">{application.notes}</p>
                              </div>
                            )}
                          </div>
                        </SheetContent>
                      </Sheet>
                      {canDelete && (
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
                                This action cannot be undone. This will permanently delete the application
                                of {application.applicantName}.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(application._id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
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
          disabled={!applications?.prevPage}
        >
          Previous
        </Button>
        <span>Page {(applications?.currentPage||0)} of {(applications?.totalPages||0)}</span>
        <Button
          onClick={() => setCurrentPage(page => applications?.nextPage||1)}
          disabled={!applications?.hasNext}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

// Wrap with permission guard
export default function JobApplicationTable() {
  return (
    <PermissionGuard permission={JOB_APPLICATION_PERMISSIONS.JOB_APP_VIEW}>
      <JobApplicationTableContent />
    </PermissionGuard>
  )
}