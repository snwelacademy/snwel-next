'use client'

import { Button, Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import { conf, UserConfig } from "./builder";
import { Master, updateMasterSchema } from "@/types/master";
import { z } from "zod";
import { updateMaster } from "@/services/admin/admin-master";
import { useToast } from "../ui/use-toast";


// Describe the initial data
// const initialData = {};

// Save the data to your database


// Render Puck editor
export function PageEditor({ data }: { data?: Master }) {
  const { toast } = useToast();
  const save = async (pageData: any) => {
    try {
      console.log("Publishing", pageData)
      if (!data) return;
      await updateMaster(data._id, { ...data, meta: pageData } as z.infer<typeof updateMasterSchema>);
      toast({ title: 'Page Updated Successfully!!', variant: 'success' })
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