"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Plus, Trash2, Eye, Edit, Upload } from "lucide-react"
import Image from "next/image"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ListOptions } from "@/types/ListOptions"
import { bulkUpsertGalleryAsset, deleteGalleryAsset, getAllGalleryAssets } from "@/services/admin/gallery-service"
import { useToast } from "../ui/use-toast"
import { GalleryAsset } from "@/types/GalleryAsset"
import FileManagerPopup from "../modal/FileManager"
import { nanoid } from "nanoid"
import { ListManager } from "react-beautiful-dnd-grid";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { cn, extractYouTubeVideoId } from "@/lib/utils"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { usePermission } from "@/hooks/usePermissions"
import { GALLERY_PERMISSIONS } from "@/constants/permissions"
import { handlePermissionError } from "@/lib/permissionErrorHandler"
import { PermissionGuard } from "@/components/guards/PermissionGuard"
import { withErrorHandling } from "@/components/hoc/withErrorHandling"

interface IGalleryAsset {
  _id: string
  name: string
  description?: string
  link: string
  timestamp: Date
  likesCount: number
  linkType: 'image' | 'youtube'
  extension?: string
  sequence: number
}

interface CreateAssetItem {
  link: string,
  name?: string,
  description?: string
}

function ManageGalleryContent() {
  const canCreateGallery = usePermission(GALLERY_PERMISSIONS.GALLERY_CREATE);
  const canUpdateGallery = usePermission(GALLERY_PERMISSIONS.GALLERY_UPDATE);
  const canDeleteGallery = usePermission(GALLERY_PERMISSIONS.GALLERY_DELETE);
  const [activeTab, setActiveTab] = useState<'image' | 'youtube'>('image')
  const [newAsset, setNewAsset] = useState<Partial<IGalleryAsset>>({
    name: '',
    description: '',
    link: '',
    linkType: 'image'
  })
  const [previewAsset, setPreviewAsset] = useState<IGalleryAsset | null>(null)
  const [editAsset, setEditAsset] = useState<IGalleryAsset | null>(null)
  const [isFileManagerOpen, setIsFileManagerOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [options, setOptions] = useState<ListOptions>({ limit: 20, page: 1, filter: { linkType: activeTab } })
  const { data: assets, isLoading } = useQuery({
    queryKey: ['/admin/gallery', JSON.stringify(options)],
    queryFn: () => getAllGalleryAssets(options)
  });
  const { toast } = useToast();
  const client = useQueryClient()

  useEffect(() => {
    setOptions(opt => ({...opt, filter: {...opt.filter, linkType: activeTab}}))
  }, [activeTab])

  const addAsset = async (data: CreateAssetItem | CreateAssetItem[]) => {
    if (!canCreateGallery) {
      toast({ title: "Permission Denied", description: "You don't have permission to create gallery assets", variant: 'destructive' });
      return;
    }
    try {
      let sequense = (assets?.total || 0) + 1;
      const items = Array.isArray(data) ? data : [data];
      const preparedData: any[] = items.map(dt => ({
        name: dt.name || `Item ${sequense++}`,
        description: dt.description,
        linkType: activeTab,
        link: dt.link
      }))
      const response = await bulkUpsertGalleryAsset(preparedData);
      await client.invalidateQueries({ queryKey: ['/admin/gallery', JSON.stringify(options)] });
      toast({ title: "Assets successfully added!", variant: 'success' })
    } catch (error: any) {
      handlePermissionError(error, 'Failed to add gallery assets');
      toast({ title: "Adding asset failed", description: error.message || "There is problem in adding assets.", variant: 'destructive' })
    }

  }

  const deleteAsset = async (id: string) => {
    if (!canDeleteGallery) {
      toast({ title: "Permission Denied", description: "You don't have permission to delete gallery assets", variant: 'destructive' });
      return;
    }
    try {

      const response = await deleteGalleryAsset(id);
      await client.invalidateQueries({ queryKey: ['/admin/gallery', JSON.stringify(options)] });
      toast({ title: "Assets successfully delted!", variant: 'success' })
    } catch (error: any) {
      handlePermissionError(error, 'Failed to delete gallery asset');
      toast({ title: "Deleting asset failed", description: error.message || "There is problem in deleting assets.", variant: 'destructive' })
    }
  }

  const updateAsset = async (data: Partial<GalleryAsset> | Partial<GalleryAsset>[]) => {
    if (!canUpdateGallery) {
      toast({ title: "Permission Denied", description: "You don't have permission to update gallery assets", variant: 'destructive' });
      return;
    }
    try {
      const response = await bulkUpsertGalleryAsset(Array.isArray(data) ? data : [data]);
      await client.invalidateQueries({ queryKey: ['/admin/gallery', JSON.stringify(options)] });
      toast({ title: "Assets successfully updated!", variant: 'success' })
    } catch (error: any) {
      handlePermissionError(error, 'Failed to update gallery assets');
      toast({ title: "Updating asset failed", description: error.message || "There is problem in updating assets.", variant: 'destructive' })
    }
  }

  const onDragEnd = async (result: any) => {
    if (!result.destination) return

    const items = assets?.docs || [];
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    await updateAsset(items.map((item, index) => ({ ...item, sequence: index, })));
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {

    setIsFileManagerOpen(false)

  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Gallery</h1>
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'image' | 'youtube')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="image">Images</TabsTrigger>
          <TabsTrigger value="youtube">Videos</TabsTrigger>
        </TabsList>
        <TabsContent value="image">
          <Card>
            <CardContent className="pt-6">
              <FileManagerPopup trigger={<Button>Add Image</Button>} multiSelect onChange={value => addAsset(value.map(v => ({ link: v })))} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="youtube">
          <AddAssetForm
            addAsset={addAsset}
            linkType="video"
          />
        </TabsContent>
      </Tabs>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={nanoid()}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <AnimatePresence>
                {assets?.docs.filter(asset => asset.linkType === activeTab).map((asset, index) => (
                  <Draggable key={asset._id} draggableId={asset._id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      // initial={{ opacity: 0, y: 20 }}
                      // animate={{ opacity: 1, y: 0 }}
                      // exit={{ opacity: 0, y: -20 }}
                      // transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.2 }}
                        >
                          <AssetCard
                            asset={asset}
                            onDelete={() => deleteAsset(asset._id)}
                            onPreview={() => setPreviewAsset(asset)}
                            onEdit={() => setEditAsset(asset)}
                          />
                        </motion.div>
                      </div>
                    )}
                  </Draggable>
                ))}
              </AnimatePresence>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* <ListManager
        items={assets?.docs.map(dt => ({...dt, id: dt._id}))||[]}
        direction="horizontal"
        maxItems={assets?.docs.length||10}
        render={asset => <AssetCard
          asset={asset}
          onDelete={() => deleteAsset(asset._id)}
          onPreview={() => setPreviewAsset(asset)}
          onEdit={() => setEditAsset(asset)}
        />}
        onDragEnd={onDragEnd}
      /> */}

      {assets?.docs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <h2 className="text-2xl font-semibold mb-2">No {activeTab === 'image' ? 'images' : 'videos'} found</h2>
          <p className="text-muted-foreground">Add some {activeTab === 'image' ? 'images' : 'videos'} to get started!</p>
        </motion.div>
      )}

      {previewAsset && (
        <PreviewModal asset={previewAsset} onClose={() => setPreviewAsset(null)} />
      )}

      {editAsset && (
        <EditAssetModal
          asset={editAsset}
          onSave={(updatedAsset) => {
            updateAsset(updatedAsset)
            setEditAsset(null)
          }}
          onClose={() => setEditAsset(null)}
        />
      )}

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileSelect}
        multiple
        accept="image/*"
      />

      <Dialog open={isFileManagerOpen} onOpenChange={setIsFileManagerOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Images</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-sm text-gray-600 mb-2">Drag and drop your images here, or click to select files</p>
            <Button onClick={() => fileInputRef.current?.click()}>Select Files</Button>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsFileManagerOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const addAssetSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  link: z.string(),
  linkType: z.string().default('youtube')
})

function AddAssetForm({ addAsset, linkType }: {
  addAsset: (items: any) => void
  linkType: 'image' | 'video' | 'youtube',
}) {
  const [open, setIsOpen] = useState(false)
  const form = useForm<z.infer<typeof addAssetSchema>>({
    resolver: zodResolver(addAssetSchema),
    defaultValues: {
      linkType
    }
  })

  const handleSubMit = async(value: any) => {
    await addAsset(value);
    setIsOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button>Add Youtube Link</Button>
      </DialogTrigger>

      <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Add Youtube Link
          </DialogTitle>
      </DialogHeader>
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubMit)} className="space-y-4">
                <div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Asset item" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Link</FormLabel>
                        <FormControl>
                          <Input type="url" placeholder="Link..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit">
                  <Plus className="mr-2 h-4 w-4" /> Add {linkType === 'image' ? 'Image' : 'Video'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card >
      </DialogContent>
    </Dialog>
  )
}

function AssetCard({ asset, onDelete, onPreview, onEdit }: {
  asset: IGalleryAsset
  onDelete: () => void
  onPreview: () => void
  onEdit: () => void
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="aspect-video relative mb-4">
          {asset.linkType === 'image' ? (
            <img src={asset.link} alt={asset.name} className="rounded-md max-w-full " />
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${extractYouTubeVideoId(asset.link)}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-md"
            />
          )}
        </div>
        <h3 className="font-semibold mb-2">{asset.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{asset.description}</p>
        <div className="flex justify-between">
          <Button variant="outline" size="sm" onClick={onPreview}>
            <Eye className="mr-2 h-4 w-4" /> Preview
          </Button>
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={onDelete}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const YouTubePlayer = ({ videoId, onClose }: { videoId: string, onClose: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className={cn([
        "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      ])}
    >
      <motion.div
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        exit={{ y: "100vh" }}
        transition={{ type: "spring", damping: 15, stiffness: 100 }}
        className="relative w-full max-w-4xl aspect-video bg-white rounded-lg overflow-hidden"
      >
        <Button
          className="absolute top-2 right-2 z-10"
          variant="ghost"
          size="icon"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </motion.div>
    </motion.div>
  )
}

function PreviewModal({ asset, onClose }: { asset: IGalleryAsset; onClose: () => void }) {
  const videoId = extractYouTubeVideoId(asset.link);
  console.log({ videoId })
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>{asset.name}</DialogTitle>
        </DialogHeader>
        {asset.linkType === 'image' ? (
          <div className="relative w-full aspect-video bg-center bg-contain bg-no-repeat " style={{ backgroundImage: `url(${asset.link})` }} >
            <img src={asset.link} alt={asset.name} className="rounded-md max-w-full hidden" />
          </div>
        ) : (
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${videoId || ''}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-md"
            />
          </div>
        )}
        <p className="text-muted-foreground">{asset.description}</p>
      </DialogContent>
    </Dialog>
  )
}

function EditAssetModal({ asset, onSave, onClose }: {
  asset: IGalleryAsset
  onSave: (updatedAsset: IGalleryAsset) => void
  onClose: () => void
}) {
  const [editedAsset, setEditedAsset] = useState(asset)

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Asset</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => { e.preventDefault(); onSave(editedAsset); }}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={editedAsset.name}
                onChange={(e) => setEditedAsset({ ...editedAsset, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={editedAsset.description}
                onChange={(e) => setEditedAsset({ ...editedAsset, description: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default withErrorHandling(function ProtectedManageGallery() {
  return (
    <PermissionGuard permission={GALLERY_PERMISSIONS.GALLERY_VIEW}>
      <ManageGalleryContent />
    </PermissionGuard>
  )
})