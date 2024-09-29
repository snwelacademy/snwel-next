import { UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type SMSSendIntegrationProps = {
  form: UseFormReturn<any>
}

export default function SMSSendIntegration({ form }: SMSSendIntegrationProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="config.apiKey"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SMS API Key</FormLabel>
            <FormControl>
              <Input placeholder="Enter SMS API Key" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="config.fromNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>From Number</FormLabel>
            <FormControl>
              <Input placeholder="Enter From Number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}