import { UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type WhatsAppIntegrationProps = {
  form: UseFormReturn<any>
}

export default function WhatsAppIntegration({ form }: WhatsAppIntegrationProps) {
  return (
    <div className="space-y-4">
      <FormField
        // control={form.control}
        name="config.url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>WhatsApp API URL</FormLabel>
            <FormControl>
              <Input type="url" placeholder="Enter WhatsApp API URL" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        // control={form.control}
        name="config.apiKey"
        render={({ field }) => (
          <FormItem>
            <FormLabel>WhatsApp API Key</FormLabel>
            <FormControl>
              <Input placeholder="Enter WhatsApp API Key" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        // control={form.control}
        name="config.phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>WhatsApp Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="Enter WhatsApp Phone Number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}