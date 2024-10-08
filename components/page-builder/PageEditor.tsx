'use client'

import { Button, Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import { conf, UserConfig } from "./builder";
import { Master, updateMasterSchema } from "@/types/master";
import { z } from "zod";
import { updateMaster } from "@/services/admin/admin-master";
import { useToast } from "../ui/use-toast";
import { inavlidateHomePage } from "@/server-actions/page-actions";


// Describe the initial data
// const initialData = {};

// Save the data to your database


// Render Puck editor
export function PageEditor({ data }: { data?: Master }) {
  const { toast } = useToast();
  const save = async (pageData: any) => {
    try {
      if (!data) return;
      await updateMaster(data._id, { ...data, meta: pageData } as z.infer<typeof updateMasterSchema>);
      toast({ title: 'Page Updated Successfully!!', variant: 'success' });
      await inavlidateHomePage();
    } catch (error) {
      toast({ title: 'Something wrong while updating page', variant: 'destructive' })
    }
  };
  return <div>
  
    <Puck
      data={data?.meta || {}}
      config={conf as any}
      onPublish={save}
      overrides={{
        // header: ({children}) => {
        //   return <div className="mt-12 w-full ">
        //     {children}
        //   </div>
        // },
        headerActions: ({ children }) => (
          <>
            <div>
              <Button href={'/admin'} newTab variant="secondary">
                Home
              </Button>
            </div>

            {children}
          </>
        ),
      }}
    />
  </div>
}