"use client"

import { useState, useRef, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileIcon, ImageIcon, FileTextIcon, FileAudioIcon, FileVideoIcon, Upload, Plus, Check, X, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { ScrollArea } from '../ui/scroll-area'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getFiles, uploadMultipleFile } from '@/services/file'
import { useListOptions } from '@/hooks/useListOption'
import { FileUploadResponse } from '@/types/ApiResponses'
import { useToast } from '../ui/use-toast'

interface FileData {
    _id: string
    fileName: string
    filePath: string
    mimeType: string
    uploadDate: string
    createdAt: string
    updatedAt: string
    __v: number
}

const FilePreview = ({ file, isSelected, onSelect, onPreview }: {
    file: FileUploadResponse;
    isSelected: boolean;
    onSelect: () => void;
    onPreview: () => void;
}) => {
    const [isHovered, setIsHovered] = useState(false)

    const getFileIcon = () => {
        if (file.mimeType.startsWith('image/')) {
            return <ImageIcon className="w-12 h-12 text-blue-500" />
        } else if (file.mimeType === 'application/pdf') {
            return <FileTextIcon className="w-12 h-12 text-red-500" />
        } else if (file.mimeType.startsWith('audio/')) {
            return <FileAudioIcon className="w-12 h-12 text-green-500" />
        } else if (file.mimeType.startsWith('video/')) {
            return <FileVideoIcon className="w-12 h-12 text-purple-500" />
        } else {
            return <FileIcon className="w-12 h-12 text-gray-500" />
        }
    }

    return (
        <motion.div
            className={cn(
                "bg-white p-4 rounded-lg shadow-md cursor-pointer relative",
                isSelected && "ring-2 ring-primary"
            )}
            whileHover={{ scale: 1.05 }}
            onClick={onSelect}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <div className="relative aspect-square mb-2 overflow-hidden rounded-md" onClick={(e) => { e.stopPropagation(); onPreview(); }}>
                {file.mimeType.startsWith('image/') ? (
                    <img
                        src={file.filePath}
                        alt={file.fileName}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        {getFileIcon()}
                    </div>
                )}
            </div>
            <motion.div
                className="text-sm font-medium truncate"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered || isSelected ? 1 : 0 }}
            >
                {file.fileName}
            </motion.div>
            <motion.div
                className="text-xs text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered || isSelected ? 1 : 0 }}
            >
                {new Date(file.uploadDate).toLocaleDateString()}
            </motion.div>
            <AnimatePresence>
                {isSelected && (
                    <motion.div
                        className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                    >
                        <Check className="w-4 h-4" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

const FilePreviewGrid = ({ files, selectedFiles, onSelectFile, onPreviewFile, multiSelect, isLoading }: {
    files: FileUploadResponse[];
    selectedFiles: string[];
    onSelectFile: (fileId: string) => void;
    onPreviewFile: (fileId: string) => void;
    multiSelect: boolean;
    isLoading: boolean;
}) => {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    if (files.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <FileIcon className="w-16 h-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No files found</h3>
                <p className="text-gray-500">Upload some files to get started</p>
            </div>
        )
    }

    return (
        <ScrollArea className='h-[600px]'>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {files.map((file) => (
                    <FilePreview
                        key={file._id}
                        file={file}
                        isSelected={selectedFiles.includes(file._id)}
                        onSelect={() => onSelectFile(file._id)}
                        onPreview={() => onPreviewFile(file._id)}
                    />
                ))}
            </div>
        </ScrollArea>
    )
}

const SingleFilePreview = ({ file, onClose }: { file: FileUploadResponse; onClose: () => void }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg max-w-3xl max-h-[90vh] overflow-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{file.fileName}</h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <div className="aspect-square w-full max-h-[70vh] overflow-hidden rounded-md mb-4">
                    {file.mimeType.startsWith('image/') ? (
                        <img src={file.filePath} alt={file.fileName} className="w-full h-full object-contain" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <FileIcon className="w-24 h-24 text-gray-500" />
                        </div>
                    )}
                </div>
                <div className="text-sm text-gray-500">
                    <p>Type: {file.mimeType}</p>
                    <p>Uploaded: {new Date(file.uploadDate).toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default function FileManagerPopup(
    {
        multiSelect = false,
        onChange,
        onSelect,
        value,
        trigger
    }
        : {
            multiSelect?: boolean,
            onSelect?: string[],
            value?: string | string[],
            onChange?: (value: string[]) => void,
            trigger?: ReactNode
        }) {
    const [options, setOptions] = useListOptions();
    const [open, setOpen] = useState(false)
    const { toast } = useToast()
    const mutate = useQueryClient();
    const [selectedFiles, setSelectedFiles] = useState<string[]>([])
    const [recentFiles, setRecentFiles] = useState<FileUploadResponse[]>([])
    const [isUploading, setIsUploading] = useState(false)
    const [previewFile, setPreviewFile] = useState<FileData | null | FileUploadResponse>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { data: files, isLoading } = useQuery({
        queryKey: ['file/files', options],
        queryFn: () => getFiles({ ...options, limit: 100 }),
    })

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = event.target.files
        console.log({ newFiles })
        if (!newFiles) return

        setIsUploading(true)
        try {
            const res = await uploadMultipleFile(Array.from(newFiles));
            setRecentFiles(prev => 
                [...prev, ...res].sort((a, b) => {
                  const dateA = new Date(a.uploadDate).getTime(); // Convert to timestamp
                  const dateB = new Date(b.uploadDate).getTime(); // Convert to timestamp
                  return dateB - dateA; // Sort in descending order
                })
              );
            await mutate.invalidateQueries({ queryKey: ['file/files', options] });
            toast({ title: `${newFiles.length} Files uploaded successfully` });
        } catch (error: any) {
            toast({ title: "File Uploading failed", description: error.message || "There is problem in uploading file." })
        } finally {
            setIsUploading(false)
        }


    }

    const handleSelectFile = (fileId: string) => {
        if (multiSelect) {
            setSelectedFiles(prev =>
                prev.includes(fileId)
                    ? prev.filter(id => id !== fileId)
                    : [...prev, fileId]
            )
        } else {
            setSelectedFiles([fileId])
        }
    }

    const handlePreviewFile = (fileId: string) => {
        const file = files?.docs.find(f => f._id === fileId)
        if (file) {
            setPreviewFile(file)
        }
    }

    const getSelectedFilesUrls = () => {
        const sfs = files?.docs
            .filter(file => selectedFiles.includes(file._id))
            .map(file => file.filePath);
        onChange?.(sfs || []);

        setOpen(false)
    }

    const loadMoreFiles = async () => {
        const nextPage = files?.nextPage;
        if (nextPage) {
            setOptions({ page: nextPage })
        }
    }

    useEffect(() => {
        if (value && files && files.docs?.length > 0) {
            if (typeof value === 'string') {
                // Handle when value is a single string
                const file = files.docs.find(d => d.filePath === value);
                if (file) setSelectedFiles([file.filePath]); // Wrap in array
            } else if (Array.isArray(value)) {
                // Handle when value is an array of strings
                const matchingFiles = files.docs
                    .filter(d => value.includes(d.filePath))
                    .map(d => d.filePath); // Extract file paths into an array

                if (matchingFiles.length > 0) {
                    setSelectedFiles(matchingFiles); // Set array of matching file paths
                }
            }
        }
    }, [files, value]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {
                    trigger || <Button>
                        <Upload className="mr-2 h-4 w-4" /> Manage Files
                    </Button>
                }
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>File Manager</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    <FilePreviewGrid
                        files={files?.docs ? [...recentFiles, ...files.docs] : []}
                        selectedFiles={selectedFiles}
                        onSelectFile={handleSelectFile}
                        onPreviewFile={handlePreviewFile}
                        multiSelect={multiSelect}
                        isLoading={isLoading}
                    />
                </div>
                <div className="mt-4 space-y-2">
                    <div className="flex justify-between gap-2">
                        <Button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="flex-1"
                        >
                            {isUploading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Plus className="mr-2 h-4 w-4" />
                            )}
                            {isUploading ? "Uploading..." : "Add New Files"}
                        </Button>
                        <Button
                            onClick={loadMoreFiles}
                            disabled={isLoading}
                            variant="outline"
                            className="flex-1"
                        >
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Load More Files
                        </Button>
                    </div>
                    <Button
                        onClick={getSelectedFilesUrls}
                        disabled={selectedFiles.length === 0}
                        className="w-full"
                        variant="outline"
                    >
                        Use Selected Files
                    </Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        className="hidden"
                        multiple={multiSelect}
                    />
                </div>
            </DialogContent>
            {/* {previewFile && (
                <SingleFilePreview file={previewFile} onClose={() => setPreviewFile(null)} />
            )} */}
        </Dialog>
    )
}