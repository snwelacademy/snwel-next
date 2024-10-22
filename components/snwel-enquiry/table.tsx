"use client";

import { useState, useEffect } from "react";

import { ChevronDown, ChevronUp, Download, Loader2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@uidotdev/usehooks";

export default function EnhancedSnwelEnquiryTable() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [sortField, setSortField] = useState<keyof Enquiry>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState<"all" | "processed" | "unprocessed">("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
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
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {isLoading ? (
                    [...Array(5)].map((_, index) => (
                      <TableRow key={index}>
                        <TableCell colSpan={6}>
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
                        className="hover:bg-muted/50"
                      >
                        <TableCell className="font-medium">{enquiry._id.slice(0, 8)}...</TableCell>
                        <TableCell>{enquiry.name}</TableCell>
                        <TableCell>{enquiry.businessEmail}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${enquiry.consentGiven ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {enquiry.consentGiven ? "Processed" : "Unprocessed"}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(enquiry.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(enquiry._id)}>
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
  );
}