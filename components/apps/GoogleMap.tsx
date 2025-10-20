import { UseFormReturn } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from 'react'
import { Switch } from '../ui/switch'
import { Textarea } from '../ui/textarea'
import { z } from 'zod'

type GoogleMapIntegrationProps = {
    form: UseFormReturn<any>
}

export const GoogleMapSchema = z.object({
    apiKey: z.string().min(1, "API Key is required"),
    latitude: z.string().regex(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/, "Invalid latitude"),
    longitude: z.string().regex(/^-?(([-+]?)([\d]{1,3})((\.)(\d+))?)$/, "Invalid longitude"),
    zoom: z.string().regex(/^([1-9]|1[0-9]|20)$/, "Zoom must be between 1 and 20"),
    address: z.string().optional(),
    showMarker: z.boolean(),
    markerTitle: z.string().optional(),
    height: z.string().min(1, "Height is required"),
    width: z.string().min(1, "Width is required"),
})

export type GoogleMapIntegrationConfig = z.infer<typeof GoogleMapSchema>;

export default function GoogleMapIntegration({ form }: GoogleMapIntegrationProps) {
    const [showMarker, setShowMarker] = useState(true)

    return (
        <div className="space-y-4">
            <FormField
                name="config.apiKey"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Google Maps API Key</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter your API key" {...field} />
                        </FormControl>
                        <FormDescription>
                            Your Google Maps API key for authentication.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    name="config.latitude"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Latitude</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. 51.5074" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="config.longitude"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Longitude</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. -0.1278" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                name="config.zoom"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Zoom Level</FormLabel>
                        <FormControl>
                            <Input type="number" min="1" max="20" {...field} />
                        </FormControl>
                        <FormDescription>
                            Enter a value between 1 and 20.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                name="config.address"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Enter the full address" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                name="config.showMarker"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">Show Marker</FormLabel>
                            <FormDescription>
                                Display a marker on the map at the specified coordinates.
                            </FormDescription>
                        </div>
                        <FormControl>
                            <Switch
                                checked={field.value}
                                onCheckedChange={(checked) => {
                                    field.onChange(checked)
                                    setShowMarker(checked)
                                }}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
            {showMarker && (
                <FormField

                    name="config.markerTitle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Marker Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter marker title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}
            <div className="grid grid-cols-2 gap-4">
                <FormField

                    name="config.height"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Map Height</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. 400px" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField

                    name="config.width"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Map Width</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. 100%" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}