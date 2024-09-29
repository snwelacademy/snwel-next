import { UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type SMTPEmailIntegrationProps = {
  form: UseFormReturn<any>
}

export default function SMTPEmailIntegration({ form }: SMTPEmailIntegrationProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="config.host"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SMTP Host</FormLabel>
            <FormControl>
              <Input placeholder="Enter SMTP Host" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="config.port"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SMTP Port</FormLabel>
            <FormControl>
              <Input placeholder="Enter SMTP Port" type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="config.auth.username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SMTP Username</FormLabel>
            <FormControl>
              <Input placeholder="Enter SMTP Username" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="config.auth.password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SMTP Password</FormLabel>
            <FormControl>
              <Input placeholder="Enter SMTP Password" type="password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}