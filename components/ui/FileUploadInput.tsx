"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Loader2, Upload, X } from "lucide-react"
import { uploadFile } from "@/services/file"
import { useToast } from "./use-toast"

interface CVUploadProps {
    value: string
    onChange: (file: string) => void
    placeholder: string
}

export default function FileUploadInput({ value, onChange, placeholder }: CVUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const { toast } = useToast()

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsUploading(true)
        try {
            const file = event.target.files?.[0] || null
            if (file) {
                const res = await uploadFile(file);
                onChange(res?.filePath || '');
                toast({ title: "File uploaded successfully!", variant: 'success' })
            }
        } catch (error: any) {
            toast({ title: "File uploading failed", variant: 'destructive', description: error?.message || 'There is problem in uploading this file.' })
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="space-y-4">
            <Label htmlFor="cv-upload" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Upload your CV
            </Label>
            <div className="flex items-center space-x-4">
                <Input
                    id="cv-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                />
                <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="w-full max-w-md"
                    onClick={() => document.getElementById('cv-upload')?.click()}
                    disabled={isUploading}
                >
                    {isUploading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Upload className="mr-2 h-4 w-4" />
                    )}
                    {value ? 'Change File' : placeholder}
                </Button>

            </div>
            {value && !isUploading && (
                <div className="flex items-center justify-between p-2 bg-secondary rounded-md">
                    <div className="flex items-center space-x-2 truncate">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium truncate">{value}</span>
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => onChange("")}
                        className="text-destructive hover:text-destructive/90"
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove file</span>
                    </Button>
                </div>
            )}
            {isUploading && (
                <div className="w-full max-w-xs bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full animate-pulse" style={{ width: '100%' }}></div>
                </div>
            )}
        </div>
    )
}