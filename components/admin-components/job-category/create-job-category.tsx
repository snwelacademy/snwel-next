import BreadCrumb from '@/components/BreadCrumb';
import MutateJobCategory from '@/components/job-category/mutate-job-category';
import { Heading } from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';




const CreateNewJobCategoryPage = () => {

    const breadcrumbItems = [{ title: "New Category", link: "/admin/job-category/create" }];

    return (
        <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
            <BreadCrumb items={breadcrumbItems} />

            <div className="flex items-start justify-between">
                <Heading
                    title={'Create Category'}
                    description={'Create New Job Category'}
                />
            </div>
            <Separator />

            <MutateJobCategory />
        </div>
    )
}

export default CreateNewJobCategoryPage