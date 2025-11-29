'use client'
import { CustomIcon } from '@/components/icons';
import { getListOptionsFromSearchParams } from '@/lib/utils';
import { createMaster, getAllMasters, deleteMaster } from '@/services/admin/admin-master';
import { useQuery } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { PAGE_PERMISSIONS } from '@/constants/permissions';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";


const PageCard = ({ title, data, onDelete }: { title: string, data?: any, createdAt?: string, onDelete?: () => void }) => {
    return (
        <div className='space-y-3 group relative'>
            <div className='aspect-[2/3] rounded-xl shadow-xl w-full h-full group-hover:shadow group-hover:shadow-primary/15 transition-all duration-300 relative overflow-hidden bg-white'>
                {onDelete && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDelete();
                        }}
                        className="absolute top-2 right-2 z-10 p-2 bg-white/90 hover:bg-destructive hover:text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                        title="Delete Page"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                )}
                {
                    !data ? <div className='w-full h-full grid place-content-center'>
                        <span className='w-[100px] text-center font-bold text-gray-500'>No Page Content Available</span>
                    </div>
                        : <div className='w-full h-full grid place-content-center'>
                            <span className='w-[100px] text-center font-bold text-gray-500'>{data.name}</span>
                        </div>
                }
            </div>
            <div className='flex items-center gap-2 transition-all duration-300'>
                <CustomIcon icon='pages' className='group-hover:text-primary ' />
                <p className='font-bold text-gray-600 group-hover:text-primary'>{title}</p>
            </div>
        </div>
    )
}

const CreatePageDialog = ({ children, onCreated }: { children: React.ReactNode, onCreated?: () => void }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState<string>('blank');
    const router = useRouter();
    const { toast } = useToast();
    const { hasPerm } = useAuth();

    if (!hasPerm(PAGE_PERMISSIONS.PAGE_CREATE)) {
        return null;
    }

    const { data: templates } = useQuery({
        queryKey: ['templates'],
        queryFn: () => getAllMasters(getListOptionsFromSearchParams(new URLSearchParams({ parentCode: 'PAGE_TEMPLATE' })))
    });

    const handleCreate = async () => {
        if (!name || !code) return;
        try {
            setLoading(true);

            let meta = {};
            if (selectedTemplate && selectedTemplate !== 'blank') {
                const template = templates?.docs.find(t => t._id === selectedTemplate);
                if (template) meta = template.meta || {};
            }

            const res = await createMaster({
                name,
                code,
                parentCode: 'PAGE',
                type: 'SUB_MASTER',
                isActive: true,
                sequence: 0,
                meta
            });
            toast({ title: 'Page Created Successfully', variant: 'default' });
            setOpen(false);
            if (onCreated) onCreated();
            router.push(`/admin/pages/${res._id}?mode=edit`);
        } catch (e) {
            toast({ title: 'Failed to create page', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader><DialogTitle>Create New Page</DialogTitle></DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Page Name</Label>
                        <Input value={name} onChange={e => {
                            setName(e.target.value);
                            setCode(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                        }} placeholder="e.g. About Us" />
                    </div>
                    <div className="space-y-2">
                        <Label>Page Slug (Code)</Label>
                        <Input value={code} onChange={e => setCode(e.target.value)} placeholder="e.g. about-us" />
                    </div>
                    <div className="space-y-2">
                        <Label>Template</Label>
                        <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a template" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="blank">Blank Page</SelectItem>
                                {templates?.docs.map(t => (
                                    <SelectItem key={t._id} value={t._id}>{t.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleCreate} disabled={loading}>{loading ? 'Creating...' : 'Create Page'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const PageList = () => {
    const { toast } = useToast();
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const { data, refetch } = useQuery({
        queryKey: ['/admin/masters', getListOptionsFromSearchParams(new URLSearchParams({ parentCode: 'PAGE' }))],
        queryFn: () => getAllMasters(getListOptionsFromSearchParams((new URLSearchParams({ parentCode: 'PAGE' }))))
    });

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await deleteMaster(deleteId);
            toast({ title: 'Page Deleted Successfully', variant: 'default' });
            refetch();
        } catch (error) {
            toast({ title: 'Failed to delete page', variant: 'destructive' });
        } finally {
            setDeleteId(null);
        }
    };

    return (
        <>
            <div className='grid grid-cols-2 md:grid-cols-4 items-center justify-items-center gap-5 container mx-auto pt-6'>
                <CreatePageDialog onCreated={() => refetch()}>
                    <div className='space-y-3 group cursor-pointer w-full h-full'>
                        <div className='aspect-[2/3] rounded-xl border-2 border-dashed border-gray-300 w-full h-full flex flex-col items-center justify-center hover:border-primary hover:bg-primary/5 transition-all duration-300 bg-muted/30'>
                            <Plus className="w-10 h-10 text-gray-400 group-hover:text-primary transition-colors" />
                            <span className="font-semibold text-gray-500 group-hover:text-primary mt-2">Create New Page</span>
                        </div>
                        <div className='flex items-center gap-2 opacity-0'>
                            <CustomIcon icon='pages' />
                            <p className='font-bold'>Placeholder</p>
                        </div>
                    </div>
                </CreatePageDialog>
                {
                    data?.docs.map(dt => {
                        return (
                            <Link href={{ pathname: `pages/${dt._id}`, search: 'mode=edit' }} className='w-full' key={(nanoid())}>
                                <PageCard
                                    title={dt.name}
                                    data={dt}
                                    onDelete={() => setDeleteId(dt._id)}
                                />
                            </Link>
                        )
                    })
                }
            </div>

            <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the page.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default PageList