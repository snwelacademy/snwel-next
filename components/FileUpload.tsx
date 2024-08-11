/* eslint-disable @typescript-eslint/no-unused-vars */
import { uploadFile } from '@/services/file';
import React, { useState } from 'react'
import { useToast } from './ui/use-toast';
import { FileUploadResponse } from '@/types/ApiResponses';
import { Loader2Icon } from 'lucide-react';


const FileUpload = ({ onUpload }: { onUpload?: (response?: FileUploadResponse) => void}) => {
    const [loading, setLoading] = useState(false);
    const [, setPreviewImage] = useState<string | undefined>();
    const {toast} = useToast()

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setLoading(true);
            const files = (event.target as HTMLInputElement).files;
            if (files && files.length > 0) {
                const uploaded = await uploadFile(files[0]);
                setPreviewImage(uploaded?.filePath);
                onUpload?.(uploaded)
            }
        } catch (error) {
            toast({title: 'File uploading failed', variant: 'destructive'})
        }finally{
            setLoading(false);
        }
    }
    return (
        <div className="border border-dashed border-gray-500 relative rounded-2xl hover:cursor-pointer">
        {
            loading ? 
            <div className='w-full h-full flex items-center justify-center'><Loader2Icon className='animate-spin w-8 h-8' /></div>
            : <>
            <input type="file" onChange={handleUpload } multiple className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50" />
            <div className="text-center p-10 absolute top-0 right-0 left-0 m-auto">
                <h4>
                    Drop files anywhere to upload
                    <br />or
                </h4>
                <p className="">Select Files</p>
            </div>
            </>
        }
    </div>
    )
}

export default FileUpload