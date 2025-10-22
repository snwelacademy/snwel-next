'use client'

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { toast as sonnerToast } from 'sonner';
import CdtWidget from '@/components/widget/cdt-widget/CdtWidget';
import MutateWidgetForm from '@/components/widget/MutateWidgetForm'
import { createWidget, updateWidgetById } from '@/services/admin/admin-widget-service';
import { _WidgetType, CreateWidget, UpdateWidget, Widget, WidgetType } from '@/types/WidgetTypes';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom';
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  Eye, 
  Settings, 
  Save, 
  ArrowLeft,
  Palette,
  Code
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ModernLoader from '@/components/ModernLoader';
import { Input } from '@/components/ui/input';

const WidgetUiRegistery: Record<Partial<WidgetType>, any> = {
  'Slider': <div></div>,
  'cdtWidget': CdtWidget,
  'ctaBanner': <div></div>,
  'marketingPopup': <div></div>
}

export const IFrame = ({
  children,
  ...props
}: any) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const mountNode =
    iframeRef?.current?.contentWindow?.document?.body
  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDocument) {
        const link = iframeDocument.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/_next/static/css/app/layout.css';
        iframeDocument.head.appendChild(link);
      }
    }
  }, []);

  return (
    <iframe {...props} ref={iframeRef}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  )
}

const WidgetEditor = ({ widgetData, type }: { widgetData?: any, type: WidgetType }) => {
  const router = useRouter();
  const [widgetState, setWidgetState] = useState<_WidgetType|Widget|null>(widgetData);
  const [currentId, setCurrentId] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const { toast } = useToast()

  // Helper to update nested widget styles
  const updateWidgetStyle = (path: string, value: any) => {
    setWidgetState((prev: any) => {
      const newState = { ...prev }
      const keys = path.split('.')
      let current = newState
      
      // Navigate to the nested property
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {}
        current = current[keys[i]]
      }
      
      // Set the value
      current[keys[keys.length - 1]] = value
      return newState
    })
  }

  // Helper to get nested value
  const getWidgetStyle = (path: string, defaultValue: any = '') => {
    if (!widgetState) return defaultValue
    const keys = path.split('.')
    let current: any = widgetState
    
    for (const key of keys) {
      if (current[key] === undefined) return defaultValue
      current = current[key]
    }
    
    return current || defaultValue
  }

  const handleSubmit = async (values: any) => {
    const id = currentId || widgetData?._id;
    try {
      setLoading(true);
      if (id) {
        const res = await updateWidgetById(id || '', values as UpdateWidget);
        setCurrentId(res._id)
        sonnerToast.success('Widget updated successfully!')
      } else {
        const res = await createWidget(values as CreateWidget);
        setCurrentId(res?._id)
        sonnerToast.success('Widget created successfully!')
      }
    } catch (error: any) {
      sonnerToast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deviceSizes = {
    desktop: 'w-full',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]'
  };
  const Component = WidgetUiRegistery[type] as any;

  useEffect(() => {
    setWidgetState(widgetData)
  }, [widgetData])
  

  if (!Component) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Unknown Widget Type</CardTitle>
            <CardDescription>The widget type "{type}" is not recognized.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b shadow-sm">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">
                    {widgetState?.title || 'Untitled Widget'}
                  </h1>
                  <Badge variant="secondary">{type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Design and configure your widget with live preview
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={loading}
                onClick={() => handleSubmit(widgetState)}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                Save Draft
              </Button>
              <Button 
                size="sm" 
                disabled={loading}
                onClick={() => handleSubmit(widgetState)}
                className="gap-2"
              >
                {loading ? (
                  <ModernLoader variant="dots" size="sm" />
                ) : (
                  <><Save className="h-4 w-4" /> Save & Publish</>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-120px)]">
        {/* Preview Panel */}
        <div className="flex-1 flex flex-col bg-muted/30">
          <div className="border-b bg-background px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Live Preview</span>
              </div>
              <div className="flex items-center gap-1 bg-muted rounded-md p-1">
                <Button
                  variant={deviceMode === 'desktop' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setDeviceMode('desktop')}
                  className="h-8 w-8 p-0"
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant={deviceMode === 'tablet' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setDeviceMode('tablet')}
                  className="h-8 w-8 p-0"
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  variant={deviceMode === 'mobile' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setDeviceMode('mobile')}
                  className="h-8 w-8 p-0"
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
            <div className={cn(
              "transition-all duration-300 bg-white rounded-lg shadow-lg overflow-hidden",
              deviceSizes[deviceMode]
            )}>
              <IFrame className="block w-full min-h-[600px] border-0">
                <div className="w-full min-h-[600px] flex items-center justify-center p-4">
                  <Component data={widgetState} />
                </div>
              </IFrame>
            </div>
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="w-96 border-l bg-background flex flex-col">
          <Tabs defaultValue="settings" className="flex-1 flex flex-col h-full">
            <div className="border-b px-4 flex-shrink-0">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="settings" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </TabsTrigger>
                <TabsTrigger value="style" className="gap-2">
                  <Palette className="h-4 w-4" />
                  Style
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="settings" className="flex-1 overflow-y-auto p-4 mt-0">
              <MutateWidgetForm 
                onChange={setWidgetState} 
                type={type} 
                widgetData={widgetData} 
              />
            </TabsContent>
            
            <TabsContent value="style" className="flex-1 overflow-y-auto p-4 mt-0">
              <div className="space-y-6">
                <div className="text-sm text-muted-foreground mb-4">
                  Customize the appearance of your widget
                </div>

                {/* Widget Colors Section */}
                {type === 'cdtWidget' && (
                  <>
                    <div>
                      <h3 className="text-sm font-semibold mb-3">Widget Colors</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Timer Color</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={getWidgetStyle('settings.appearance.colors.timerColor', '#3b82f6')}
                              onChange={(e) => updateWidgetStyle('settings.appearance.colors.timerColor', e.target.value)}
                              className="h-10 w-20 rounded border cursor-pointer"
                            />
                            <Input
                              type="text"
                              value={getWidgetStyle('settings.appearance.colors.timerColor', '#3b82f6')}
                              onChange={(e) => updateWidgetStyle('settings.appearance.colors.timerColor', e.target.value)}
                              className="flex-1 h-10"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Timer Text Color</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={getWidgetStyle('settings.appearance.colors.timerTextColor', '#ffffff')}
                              onChange={(e) => updateWidgetStyle('settings.appearance.colors.timerTextColor', e.target.value)}
                              className="h-10 w-20 rounded border cursor-pointer"
                            />
                            <Input
                              type="text"
                              value={getWidgetStyle('settings.appearance.colors.timerTextColor', '#ffffff')}
                              onChange={(e) => updateWidgetStyle('settings.appearance.colors.timerTextColor', e.target.value)}
                              className="flex-1 h-10"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Labels Color</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={getWidgetStyle('settings.appearance.colors.labelsColor', '#64748b')}
                              onChange={(e) => updateWidgetStyle('settings.appearance.colors.labelsColor', e.target.value)}
                              className="h-10 w-20 rounded border cursor-pointer"
                            />
                            <Input
                              type="text"
                              value={getWidgetStyle('settings.appearance.colors.labelsColor', '#64748b')}
                              onChange={(e) => updateWidgetStyle('settings.appearance.colors.labelsColor', e.target.value)}
                              className="flex-1 h-10"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Message Color</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={getWidgetStyle('settings.appearance.colors.messageColor', '#1e293b')}
                              onChange={(e) => updateWidgetStyle('settings.appearance.colors.messageColor', e.target.value)}
                              className="h-10 w-20 rounded border cursor-pointer"
                            />
                            <Input
                              type="text"
                              value={getWidgetStyle('settings.appearance.colors.messageColor', '#1e293b')}
                              onChange={(e) => updateWidgetStyle('settings.appearance.colors.messageColor', e.target.value)}
                              className="flex-1 h-10"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Button Color</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={getWidgetStyle('settings.appearance.colors.buttonColor', '#3b82f6')}
                              onChange={(e) => updateWidgetStyle('settings.appearance.colors.buttonColor', e.target.value)}
                              className="h-10 w-20 rounded border cursor-pointer"
                            />
                            <Input
                              type="text"
                              value={getWidgetStyle('settings.appearance.colors.buttonColor', '#3b82f6')}
                              onChange={(e) => updateWidgetStyle('settings.appearance.colors.buttonColor', e.target.value)}
                              className="flex-1 h-10"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Button Text Color</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={getWidgetStyle('settings.appearance.colors.buttonTextColor', '#ffffff')}
                              onChange={(e) => updateWidgetStyle('settings.appearance.colors.buttonTextColor', e.target.value)}
                              className="h-10 w-20 rounded border cursor-pointer"
                            />
                            <Input
                              type="text"
                              value={getWidgetStyle('settings.appearance.colors.buttonTextColor', '#ffffff')}
                              onChange={(e) => updateWidgetStyle('settings.appearance.colors.buttonTextColor', e.target.value)}
                              className="flex-1 h-10"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Background Color</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={getWidgetStyle('settings.appearance.colors.bgColor', '#ffffff')}
                              onChange={(e) => updateWidgetStyle('settings.appearance.colors.bgColor', e.target.value)}
                              className="h-10 w-20 rounded border cursor-pointer"
                            />
                            <Input
                              type="text"
                              value={getWidgetStyle('settings.appearance.colors.bgColor', '#ffffff')}
                              onChange={(e) => updateWidgetStyle('settings.appearance.colors.bgColor', e.target.value)}
                              className="flex-1 h-10"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Info for other widget types */}
                {type !== 'cdtWidget' && (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground text-center">
                        Styling options for {type} widget will be available soon.
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button 
                    className="w-full gap-2" 
                    onClick={() => {
                      handleSubmit(widgetState)
                    }}
                    disabled={loading}
                  >
                    <Save className="h-4 w-4" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Changes are applied in real-time to the preview
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default WidgetEditor