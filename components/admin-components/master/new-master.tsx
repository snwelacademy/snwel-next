import BreadCrumb from '@/components/BreadCrumb';
import MutateMaster from '@/components/master/mutateMasterForm';
import { Heading } from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';




const CreateNewMasterPage = () => {

    const breadcrumbItems = [{ title: "New Webinar", link: "/admin/vacancy/create" }];

    return (
        <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
            <BreadCrumb items={breadcrumbItems} />

            <div className="flex items-start justify-between">
                <Heading
                    title={'Create Master'}
                    description={'Create New Master'}
                />
            </div>
            <Separator />

            <MutateMaster />
        </div>
    )
}

export default CreateNewMasterPage