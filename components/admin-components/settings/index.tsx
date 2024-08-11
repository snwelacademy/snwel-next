
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BreadCrumb from '@/components/BreadCrumb';
import { Heading } from '@/components/ui/Heading';
import { Separator } from '@radix-ui/react-select';
import { SETTINGS } from "@/types";
import GeneralSettingForm from "@/components/settings/GeneralSettings";
import EmailSettingForm from "@/components/settings/EmailSetting";
import IntegrationSettingForm from "@/components/settings/IntegrationSetting";



const Settings = () => {
    const breadcrumbItems = [{ title: "Settings", link: "/admin/settings" }];

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
            <BreadCrumb items={breadcrumbItems} />

            <div className="flex items-start justify-between">
                <Heading
                    title={'Settings'}
                    description={'Adjust settings of you portal.'}
                />
            </div>
            <Separator />

            <Tabs defaultValue={SETTINGS.GENERAL} className="w-full max-w-full" >
                <TabsList>
                    <TabsTrigger value={SETTINGS.GENERAL}>General Settings</TabsTrigger>
                    <TabsTrigger value={SETTINGS.EMAIL}>Email Setting</TabsTrigger>
                    <TabsTrigger value={SETTINGS.INTEGRATION}>Integration Setting</TabsTrigger>
                </TabsList>
                <TabsContent value={SETTINGS.GENERAL}><GeneralSettingForm/></TabsContent>
                <TabsContent value={SETTINGS.EMAIL}><EmailSettingForm/></TabsContent>
                <TabsContent value={SETTINGS.INTEGRATION}><IntegrationSettingForm/></TabsContent>
            </Tabs>
        </div>
        </>
    )
}

export default Settings