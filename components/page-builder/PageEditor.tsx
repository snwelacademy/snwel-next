'use client'

import { Button, Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import { conf } from "./builder";
import { Master, updateMasterSchema } from "@/types/master";
import { z } from "zod";
import { updateMaster, createMaster } from "@/services/admin/admin-master";
import { useToast } from "../ui/use-toast";
import { inavlidateHomePage } from "@/server-actions/page-actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button as UiButton } from '@/components/ui/button';
import { useState } from "react";

// Render Puck editor
export function PageEditor({ data }: { data?: Master }) {
  const { toast } = useToast();
  const [templateName, setTemplateName] = useState('');
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isSeoDialogOpen, setIsSeoDialogOpen] = useState(false);
  const [seoData, setSeoData] = useState({
    title: data?.meta?.root?.seo?.title || data?.name || '',
    description: data?.meta?.root?.seo?.description || '',
    keywords: data?.meta?.root?.seo?.keywords || '',
    image: data?.meta?.root?.seo?.image || ''
  });
  const [loading, setLoading] = useState(false);

  const handleSeoChange = (key: string, value: string) => {
    setSeoData(prev => ({ ...prev, [key]: value }));
  };

  const save = async (pageData: any) => {
    try {
      if (!data) return;
      await updateMaster(data._id, { ...data, meta: pageData } as z.infer<typeof updateMasterSchema>);
      toast({ title: 'Page Updated Successfully!!', variant: 'success' });
      await inavlidateHomePage();
    } catch (error) {
      toast({ title: 'Something wrong while updating page', variant: 'destructive' })
    }
  };

  const saveSeo = async () => {
    try {
      if (!data) return;
      setLoading(true);

      // Construct the new meta object with updated SEO
      const currentMeta = data.meta || {};
      const newMeta = {
        ...currentMeta,
        root: {
          ...currentMeta.root,
          seo: seoData
        }
      };

      await updateMaster(data._id, { ...data, meta: newMeta } as z.infer<typeof updateMasterSchema>);
      toast({ title: 'SEO Settings Saved!', variant: 'success' });
      setIsSeoDialogOpen(false);
      await inavlidateHomePage();
    } catch (error) {
      toast({ title: 'Failed to save SEO settings', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const saveAsTemplate = async (appData: any) => {
    if (!templateName) return;
    try {
      setLoading(true);
      await createMaster({
        name: templateName,
        code: templateName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        parentCode: 'PAGE_TEMPLATE',
        type: 'SUB_MASTER',
        isActive: true,
        sequence: 0,
        meta: appData
      });
      toast({ title: 'Template Saved Successfully!', variant: 'success' });
      setIsTemplateDialogOpen(false);
      setTemplateName('');
    } catch (error) {
      toast({ title: 'Failed to save template', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return <div>
    <Puck
      data={data?.meta || {}}
      config={conf as any}
      onPublish={save}
      overrides={{
        headerActions: ({ children, appState }: any) => (
          <div className="flex gap-2 items-center">
            <div className="flex gap-2">
              <Button href={'/admin'} newTab variant="secondary">
                Home
              </Button>

              {data?.code && (
                <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-md border">
                  <span className="text-xs text-muted-foreground font-mono max-w-[150px] truncate">
                    /{data.code}
                  </span>
                  <Button href={`/${data.code}`} newTab variant="secondary" size="medium">
                    View Live
                  </Button>
                </div>
              )}

              <Dialog open={isSeoDialogOpen} onOpenChange={setIsSeoDialogOpen}>
                <DialogTrigger asChild>
                  <UiButton variant="outline" size="icon" title="SEO Settings">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.72l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                  </UiButton>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>SEO Settings</DialogTitle></DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Page Title</Label>
                      <Input value={seoData.title} onChange={e => handleSeoChange('title', e.target.value)} placeholder="My Awesome Page" />
                    </div>
                    <div className="space-y-2">
                      <Label>Meta Description</Label>
                      <Input value={seoData.description} onChange={e => handleSeoChange('description', e.target.value)} placeholder="A brief description of your page..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Keywords</Label>
                      <Input value={seoData.keywords} onChange={e => handleSeoChange('keywords', e.target.value)} placeholder="react, nextjs, web development" />
                    </div>
                    <div className="space-y-2">
                      <Label>Social Image URL (OG:Image)</Label>
                      <Input value={seoData.image} onChange={e => handleSeoChange('image', e.target.value)} placeholder="https://example.com/image.jpg" />
                    </div>
                  </div>
                  <DialogFooter>
                    <UiButton onClick={saveSeo} disabled={loading}>{loading ? 'Saving...' : 'Save Settings'}</UiButton>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
                <DialogTrigger asChild>
                  <UiButton variant="secondary">Save as Template</UiButton>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Save as Template</DialogTitle></DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Template Name</Label>
                      <Input
                        value={templateName}
                        onChange={e => setTemplateName(e.target.value)}
                        placeholder="e.g. Landing Page V1"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <UiButton
                      onClick={() => saveAsTemplate(appState.data)}
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Template'}
                    </UiButton>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {children}
          </div>
        ),
      }}
    />
  </div>
}