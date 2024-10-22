"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Download, Loader2, Trash2 } from "lucide-react"
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




export default function JobApplicationTable() {
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
      {Array(8).fill(0).map((_, index) => (
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
        
        // In a real application, you would make an API call here to get the CSV data
      // For this example, we'll create the CSV from the current applications data
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

        <Button onClick={handleExport} disabled={loading}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {renderTableHeader("Applicant Name", "applicantName")}
              <TableHead>Job</TableHead>
              <TableHead>Company</TableHead>
              {renderTableHeader("Email", "email")}
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
                <TableCell colSpan={8} className="h-24 text-center">
                  No applications found.
                </TableCell>
              </TableRow>
            ) : (
              currentItems?.map((application) => (
                <TableRow key={application._id}>
                  <TableCell>{application.applicantName}</TableCell>
                  <TableCell>
                    {application.jobId.slug && (
                      <a href={`/admin/job-vacancies/${application.jobId._id}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {application.jobId.title}
                      </a>
                    )}
                  </TableCell>
                  <TableCell>{application.jobId.companyName}</TableCell>
                  <TableCell>{application.email}</TableCell>
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
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Application Details</SheetTitle>
                            <SheetDescription>
                              <div className="space-y-4 mt-4">
                                <p><strong>Name:</strong> {application.applicantName}</p>
                                <p><strong>Email:</strong> {application.email}</p>
                                <p><strong>Phone:</strong> {application.phone || 'N/A'}</p>
                                <p><strong>Status:</strong> {application.status}</p>
                                <p><strong>Applied Date:</strong> {new Date(application.appliedDate).toLocaleDateString()}</p>
                                <p><strong>Notes:</strong> {application.notes || 'N/A'}</p>
                              </div>
                            </SheetDescription>
                          </SheetHeader>
                        </SheetContent>
                      </Sheet>
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