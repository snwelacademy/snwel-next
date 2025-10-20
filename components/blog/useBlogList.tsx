import { getAllBlogs } from '@/services/admin/admin-blog-service';
import { Blog } from '@/types';
import { ListOptions } from '@/types/ListOptions';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useState, useEffect } from 'react';

export const useBlogList = () => {
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState<keyof Blog>("createdAt");
    const debouncedSearch = useDebounce(search, 300);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [statusFilter, setStatusFilter] = useState("all");
    const [options, setOptions] = useState<ListOptions>({ page: 1, limit: 10 });
    const { data: blogs, isLoading } = useQuery({
        queryKey: ['/blogs', debouncedSearch, sortField, sortOrder, currentPage],
        queryFn: async () => getAllBlogs(options)
    });

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


    return {
        blogs,
        isLoading,
        search,
        setSearch,
        sortField,
        setSortField,
        sortOrder,
        setSortOrder,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        statusFilter,
        setStatusFilter,
    };
};
