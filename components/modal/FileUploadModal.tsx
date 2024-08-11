'use client'
import { ReactNode, useEffect, useState } from "react"
import { Dialog, DialogClose, DialogFooter, DialogTrigger,DialogContent } from "../ui/dialog"
import { useListOptions } from "@/hooks/useListOption"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getFiles } from "@/services/file"
import { Skeleton } from "../ui/skeleton"
import { FileUploadResponse } from "@/types/ApiResponses"
import { Button } from "../ui/button"
import { cn, fileUrl } from "@/lib/utils"
import FileUpload from "../FileUpload"
import { ScrollArea } from "../ui/scroll-area"
import { nanoid } from "nanoid"


const BaseTrigger = () => {
    return <div className="border border-dashed border-gray-500 flex items-center justify-center">
        <div className="text-center p-10  m-auto">
            <h4>
                Drop files anywhere to upload
                <br />or
            </h4>
            <p className="">Select Files</p>
        </div>
    </div>
}

// const PreviewImage = ({ url }: { url?: string }) => {
//     return <div className="w-full rounded-2xl overflow-hidden">
//         <img className="h-auto max-w-full" src={url} />
//     </div>
// }

const FilesLoading = () => {
    return <div className="max-w-4xl w-full grid grid-cols-4 gap-3 items-center justify-items-center">
        {
            Array(4).map(() => {
                return <Skeleton key={nanoid()} className="aspect-square rounded-2xl" />
            })
        }
    </div>
}

const FileCardGrid = ({ files, isLoading, onFileSelect, selected }: { files: FileUploadResponse[], isLoading?: boolean, onFileSelect?: (file: FileUploadResponse) => void, selected?: FileUploadResponse }) => {
    const mutate = useQueryClient();
    if (isLoading) {
        return <FilesLoading />
    }

    const handleAfterUpload = async() => {
       await mutate.invalidateQueries({queryKey: ['file/files']});
    }

    // if(!isLoading && files.length < 1){
    //     return <div className="w-full py-10 flex items-center justify-center">
    //         <h2 className="text-muted-foreground">No Files found!</h2>
    //     </div>
    // }

    return (
        <div className="grid grid-cols-4 gap-3 items-center justify-items-center">
            <FileUpload onUpload={handleAfterUpload}/>
            {
                files.map(file => {
                    return <div
                    key={nanoid()}
                        onClick={() => onFileSelect?.(file)}
                        className={cn([
                            'aspect-square rounded-2xl hover:ring-2 duration-200 w-full bg-cover bg-center cursor-pointer',
                            {
                                'ring-2 ring-primary shadow-xl ': selected && selected._id === file._id
                            }
                        ])}
                        style={{ backgroundImage: `url(${fileUrl(file.filePath)})` }}
                    ></div>
                })
            }
        </div>
    )
}

const FileUploadModal = ({
    trigger,
    value,
    onChange
}: {
    trigger?: ReactNode,
    value?: string,
    onChange?: (value: string) => void
}) => {
    const [options, setOptions] = useListOptions();
    const { data, isLoading } = useQuery({
        queryKey: ['file/files', options],
        queryFn: () => getFiles({...options, limit: 100}),
    })
    const [selected, setSelected] = useState<FileUploadResponse | undefined>();

    useEffect(() => {
        if(value && data && data.docs?.length > 0){
            const file = data.docs.find(d => d.filePath === value);
            if(file) setSelected(file)
        }
    }, [data, value])
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger || <BaseTrigger />}</DialogTrigger>
            <DialogContent className="max-w-6xl w-full">
                <ScrollArea className="h-[600px]" >
                <div className="p-5">
                    <FileCardGrid files={data?.docs || []} isLoading={isLoading} onFileSelect={setSelected} selected={selected} />
                </div>

                {
                    data?.hasNext && <div className="mb-4">
                    <Button onClick={() => setOptions({page: ++data.currentPage})}>Load More</Button>
                </div>
                }
                </ScrollArea>
            <DialogFooter>
                <DialogClose><Button disabled={!selected} onClick={() => onChange?.(selected?.filePath||'')}>Select</Button></DialogClose>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default FileUploadModal