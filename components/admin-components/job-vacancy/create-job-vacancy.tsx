import BreadCrumb from '@/components/BreadCrumb';
import { PermissionGuard } from '@/components/gaurds/PermissionGaurd';
import { withErrorHandling } from '@/components/hoc/withErrorHandling';
import MutateJobVacancy from '@/components/job-vacancy/mutateJobVacancy';
import { Heading } from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';
import { AdminPanelPermissions } from '@/data/permissions-list';




const CreateNewJobVacancyPage = () => {

    const breadcrumbItems = [{ title: "New Webinar", link: "/admin/vacancy/create" }];

    return (
        <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
            <BreadCrumb items={breadcrumbItems} />

            <div className="flex items-start justify-between">
                <Heading
                    title={'Create Vacancy'}
                    description={'Create New Vacancy'}
                />
            </div>
            <Separator />

            <MutateJobVacancy />
        </div>
    )
}

export default withErrorHandling(function ProtectedCreateJobVacancyPage() {
    return (
        <PermissionGuard permission={AdminPanelPermissions.CREATE_JOB_VACANCIES}>
            <CreateNewJobVacancyPage />
        </PermissionGuard>
    )
})
