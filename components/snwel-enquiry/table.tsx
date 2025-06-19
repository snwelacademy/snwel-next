"use client";

import { useState, useEffect } from "react";

import { ChevronDown, ChevronUp, Download, Loader2, Trash2, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Enquiry, EnquiryTypesArray } from "@/types/snwelEnquiry";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllEnquiries, deleteEnquiry, exportAllEnquiries as exportEnquiries } from "@/services/admin/snwel-enquiry";
import { useToast } from "@/components/ui/use-toast";
import { ListOptions } from "@/types/ListOptions";
import { nanoid } from "nanoid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@uidotdev/usehooks";

export default function EnhancedSnwelEnquiryTable() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [enquiryIdToDelete, setEnquiryIdToDelete] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [sortField, setSortField] = useState<keyof Enquiry>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState<"all" | "processed" | "unprocessed">("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [options, setOptions] = useState<ListOptions>({page: 1, limit: 10})
  const { data: enquiries, isLoading } = useQuery({
    queryKey: ["enquiries", options],
    queryFn: () => getAllEnquiries(options),
  });

  useEffect(() => {
    setOptions({
      search: debouncedSearch,
      filter: {
        status: statusFilter !== "all" ? statusFilter : undefined,
        enquiryType: typeFilter !== "all" ? typeFilter : undefined
      },
      page: currentPage,
      limit: itemsPerPage,
      sort: { [sortField]: sortOrder },
    });
  }, [debouncedSearch, sortField, sortOrder, statusFilter, currentPage, itemsPerPage, typeFilter]);

  const handleSort = (field: keyof Enquiry) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const renderSortIcon = (field: keyof Enquiry) => {
    if (field !== sortField) return null;
    return sortOrder === "asc" ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />;
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEnquiry(id);
      queryClient.invalidateQueries({queryKey: ["enquiries", options]});
      toast({ title: "Enquiry deleted successfully", variant: "success" });
    } catch (error) {
      toast({ title: "Error deleting enquiry", variant: "destructive" });
    }
  };

  const handleExport = async () => {
    if(!enquiries || !enquiries.docs) return;
    setExporting(true);
    try {
      const csvContent = await exportEnquiries(); 
      if(!csvContent) {
        setExporting(false);
        return;
      }
      const blob = new Blob([csvContent], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", `job_applications_${options.page}.xlsx`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      toast({ title: "Export failed", variant: "destructive" });
    } finally {
      setExporting(false);
    }
  };

  return (
   <>
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Snwel.com Enquiries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Input 
              placeholder="Search enquiries..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow"
            />
            {/* <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="processed">Processed</SelectItem>
                <SelectItem value="unprocessed">Unprocessed</SelectItem>
              </SelectContent>
            </Select> */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {EnquiryTypesArray.map(et => (
                  <SelectItem key={nanoid()} value={et}>{et}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleExport} disabled={exporting || isLoading}>
              {exporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
              Export
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Enquiry ID</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                    Name {renderSortIcon("name")}
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("createdAt")}>
                    Date {renderSortIcon("createdAt")}
                  </TableHead>
                  <TableHead>Mobile No</TableHead>
                  <TableHead>Enquiry Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {isLoading ? (
                    [...Array(5)].map((_, index) => (
                      <TableRow key={index}>
                        <TableCell colSpan={9}>
                          <Skeleton className="h-12 w-full" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    enquiries?.docs.map((enquiry: Enquiry) => (
                      <motion.tr
                        key={enquiry._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="hover:bg-muted/50 cursor-pointer"
                        onClick={() => { setSelectedEnquiry(enquiry); setIsDetailSheetOpen(true); }}
                      >
                        <TableCell className="font-medium">{enquiry._id.slice(0, 8)}...</TableCell>
                        <TableCell>{enquiry.name}</TableCell>
                        <TableCell>{enquiry.businessEmail}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${enquiry.consentGiven ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {enquiry.consentGiven ? "Processed" : "Unprocessed"}
                          </span>
                        </TableCell>
                        <TableCell>{enquiry.mobileNo}</TableCell>
                        <TableCell>{enquiry.enquiryType}</TableCell>
                        <TableCell>{enquiry.description.slice(0, 30)}{enquiry.description.length > 30 ? '...' : ''}</TableCell>
                        <TableCell>{new Date(enquiry.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="space-x-2">
                          <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedEnquiry(enquiry); setIsDetailSheetOpen(true); }}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={(e) => { e.stopPropagation(); setEnquiryIdToDelete(enquiry._id); setIsDeleteDialogOpen(true); }}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, enquiries?.total || 0)} of {enquiries?.total || 0} entries
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min((enquiries?.totalPages || 1), prev + 1))}
                disabled={currentPage === (enquiries?.totalPages || 1)}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the enquiry.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={() => {
            if (enquiryIdToDelete) {
              handleDelete(enquiryIdToDelete);
            }
            setIsDeleteDialogOpen(false);
          }}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <Sheet open={isDetailSheetOpen} onOpenChange={setIsDetailSheetOpen}>
      <SheetContent className="sm:max-w-lg w-[90vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Enquiry Details</SheetTitle>
          <SheetDescription>Viewing full details for enquiry ID: {selectedEnquiry?._id.slice(0,8)}...</SheetDescription>
        </SheetHeader>
        {selectedEnquiry && (
          <div className="space-y-4 py-4">
            <div>
              <h4 className="font-semibold">Name:</h4>
              <p>{selectedEnquiry.name}</p>
            </div>
            <div>
              <h4 className="font-semibold">Business Email:</h4>
              <p>{selectedEnquiry.businessEmail}</p>
            </div>
            <div>
              <h4 className="font-semibold">Company:</h4>
              <p>{selectedEnquiry.company}</p>
            </div>
            <div>
              <h4 className="font-semibold">Mobile No:</h4>
              <p>{selectedEnquiry.mobileNo}</p>
            </div>
            <div>
              <h4 className="font-semibold">Enquiry Type:</h4>
              <p>{selectedEnquiry.enquiryType}</p>
            </div>
            <div>
              <h4 className="font-semibold">Description:</h4>
              <p className="whitespace-pre-wrap">{selectedEnquiry.description}</p>
            </div>
            <div>
              <h4 className="font-semibold">Consent Given:</h4>
              <p>{selectedEnquiry.consentGiven ? 'Yes' : 'No'}</p>
            </div>
             <div>
              <h4 className="font-semibold">OTP Validated:</h4>
              <p>{selectedEnquiry.otpValidated ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <h4 className="font-semibold">Received At:</h4>
              <p>{new Date(selectedEnquiry.createdAt).toLocaleString()}</p>
            </div>
          </div>
        )}
        <SheetClose asChild>
          <Button type="button" variant="outline" className="w-full mt-4">Close</Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
   </>
  );
}