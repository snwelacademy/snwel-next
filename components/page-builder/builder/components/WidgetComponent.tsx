'use client'

import RenderWidget from "@/components/widget/RenderWidget";
import { ComponentConfig } from "@measured/puck";

export type WidgetComponentProps = {
    code: string
  };

export const WidgetComponent: ComponentConfig<WidgetComponentProps> = {
    fields: {
        code: {
            type: 'text'
        }
    },
    // resolveFields: async (data, { changed, lastFields }) =>  {
    //     if(!changed.code) return lastFields;

    //     const codes = await fetchAllWidgets();
    //     return {
    //         code: {
    //             type: 'select',
    //             options: codes.docs.map(dt => ({label: dt.title, value: dt.code}))
    //         },
    //     }
    // },
    render: (props) => {
        return  <div className="">
            <RenderWidget code={props.code} />
        </div> 
    }
}