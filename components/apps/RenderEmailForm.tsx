import { UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type RenderEmailIntegrationProps = {
  form: UseFormReturn<any>
}

export default function RenderEmailIntegration({ form }: RenderEmailIntegrationProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="config.apiKey"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Render Email API Key</FormLabel>
            <FormControl>
              <Input placeholder="Enter Render Email API Key" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="config.templateId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Template ID</FormLabel>
            <FormControl>
              <Input placeholder="Enter Template ID" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}