import BreadCrumb from '@/components/BreadCrumb';
import { Heading } from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';
import MutateWebinar from '@/components/webinar/MutateWebinar';



const CreateNewWebinarPage = () => {

    const breadcrumbItems = [{ title: "New Webinar", link: "/admin/webinar/create" }];

    return (
        <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
            <BreadCrumb items={breadcrumbItems} />

            <div className="flex items-start justify-between">
                <Heading
                    title={'Create Webinar'}
                    description={'Create New Webinar'}
                />
            </div>
            <Separator />

            <MutateWebinar />
        </div>
    )
}

export default CreateNewWebinarPage