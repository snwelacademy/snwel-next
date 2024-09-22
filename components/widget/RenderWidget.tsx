"use client"

import { fetchWidgetById } from '@/services/widget-service';
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Loader from '../Loader';
import { WidgetType } from '@/types/WidgetTypes';
import CdtWidget from './cdt-widget/CdtWidget';

const WidgetUiRegistery: Record<Partial<WidgetType>, any> = {
    'Slider': <div></div>,
    'cdtWidget': CdtWidget,
    'ctaBanner': <div></div>,
    'marketingPopup': <div></div>
  }

const RenderWidget = ({code}: {code?: string}) => {
    const { data, isLoading } = useQuery({
        queryKey: [`widget`, code],
        queryFn: () => fetchWidgetById(code! as string)
      });
      const Component = WidgetUiRegistery[data?.type||"cdtWidget"] as any;
    if(isLoading){
        return <Loader type='default' />
    }
    if(!data || !data._id){
        console.log({data})
        return <div>Widget Not Found</div>
    }
  return (
    <Component data={data} />
  )
}

export default RenderWidget