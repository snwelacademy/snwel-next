import { UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type PixelIntegrationProps = {
    form: UseFormReturn<any>
}

export default function PixelIntegration({ form }: PixelIntegrationProps) {
    return (
        <div className="space-y-4">
            <FormField
                control={form.control}
                name="config.apiKey"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Facebook Pixel API Key</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter your API key" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="config.containerId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Pixel ID</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter your Container ID" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}