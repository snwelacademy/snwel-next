import { UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type PushNotificationIntegrationProps = {
  form: UseFormReturn<any>
}

export default function PushNotificationIntegration({ form }: PushNotificationIntegrationProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="config.serverKey"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Server Key</FormLabel>
            <FormControl>
              <Input placeholder="Enter Server Key" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="config.appId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>App ID</FormLabel>
            <FormControl>
              <Input placeholder="Enter App ID" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}