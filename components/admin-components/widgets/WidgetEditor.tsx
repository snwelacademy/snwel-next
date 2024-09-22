'use client'

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import CdtWidget from '@/components/widget/cdt-widget/CdtWidget';
import MutateWidgetForm from '@/components/widget/MutateWidgetForm'
import { createWidget, updateWidgetById } from '@/services/admin/admin-widget-service';
import { _WidgetType, CreateWidget, UpdateWidget, Widget, WidgetType } from '@/types/WidgetTypes';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom';


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
  const [widgetState, setWidgetState] = useState<_WidgetType|Widget|null>(widgetData);
  const [currentId, setCurrentId] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const handleSubmit = async (values: any) => {
    const id = currentId || widgetData?._id;
    try {
      setLoading(true);
      if (id) {
        const res = await updateWidgetById(id || '', values as UpdateWidget);
        setCurrentId(res._id)
      } else {
        const res = await createWidget(values as CreateWidget);
        setCurrentId(res?._id)
      }
      toast({ title: `Course ${id ? 'Updated' : 'created'} successfully!`, variant: 'success' })
    } catch (error: any) {
      toast({ title: `Error: ${error.message}`, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };
  const Component = WidgetUiRegistery[type] as any;

  useEffect(() => {
    setWidgetState(widgetData)
  }, [widgetData])
  

  if (!Component) {
    return <div>Unknown Widget</div>
  }
  return (

    <div className='space-y-5'>
     <div className='space-y-3'>
     <div className="flex items-start justify-between">
        <Heading
          title={widgetState?.title||'Untitled'}
          description=''
        />

        <Button disabled={loading} onClick={() => handleSubmit(widgetState)}>Save</Button>
      </div>
      <Separator />
     </div>
      <div className='flex'>
        <div className='flex-grow p-10 bg-gray-200'>
          <div className='bg-white w-full h-full'>
            <IFrame className="block w-full h-full">
              <div className="w-full h-full flex items-center">
                <Component data={widgetState} />
              </div>
            </IFrame>
          </div>
        </div>
        <div className='max-w-sm overflow-y-auto max-h-screen'>
          <MutateWidgetForm onChange={setWidgetState} type={type} widgetData={widgetData} />
        </div>
      </div>
    </div>
  )
}

export default WidgetEditor