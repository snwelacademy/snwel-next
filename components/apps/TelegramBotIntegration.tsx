import { UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type TelegramBotIntegrationProps = {
  form: UseFormReturn<any>
}

export default function TelegramBotIntegration({ form }: TelegramBotIntegrationProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="config.botToken"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telegram Bot Token</FormLabel>
            <FormControl>
              <Input placeholder="Enter Telegram Bot Token" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="config.chatId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Chat ID</FormLabel>
            <FormControl>
              <Input placeholder="Enter Chat ID" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}