'use client'
import { useSearchParams } from 'next/navigation';
import WidgetEditor from './WidgetEditor';
import { WidgetType } from '@/types/WidgetTypes';
import { useQuery } from '@tanstack/react-query';





const CreateNewWidgetPage = () => {
    const searchParams = useSearchParams();
    
    return (
        <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
            {/* <BreadCrumb items={breadcrumbItems} /> */}

            {/* <div className="flex items-start justify-between">
                <Heading
                    title={'Create Widget'}
                    description={'Create New Widget'}
                />

                <Button>Save</Button>
            </div>
            <Separator /> */}

            {/* <MutateWidgetForm type={searchParams.get('type') as any} /> */}

            <WidgetEditor type={searchParams.get('type') as WidgetType}/>
        </div>
    )
}

export default CreateNewWidgetPage