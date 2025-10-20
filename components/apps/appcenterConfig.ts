import { Grid, MessageSquare, Mail, Send, BellRing, Smartphone, AppWindow, Command, Map, Tags, Target } from 'lucide-react'
import { z } from 'zod';
import { GoogleMapSchema } from './GoogleMap';

export const apps = [
    { id: 'whatsapp', name: 'WhatsApp', icon: MessageSquare, fields: ['API Key', 'Phone Number'], color: 'text-green-500', hoverColor: 'bg-green-500' },
    { id: 'smtp', name: 'SMTP Email', icon: Mail, fields: ['Host', 'Port', 'Username', 'Password'], color: 'text-blue-500', hoverColor: 'bg-blue-500' },
    { id: 'render', name: 'Render Email', icon: Send, fields: ['API Key', 'Template ID'], color: 'text-purple-500', hoverColor: 'bg-purple-500' },
    { id: 'telegram', name: 'Telegram', icon: Send, fields: ['Bot Token', 'Chat ID'], color: 'text-cyan-500', hoverColor: 'bg-cyan-500' },
    { id: 'sms', name: 'SMS', icon: Smartphone, fields: ['API Key', 'From Number'], color: 'text-yellow-500', hoverColor: 'bg-yellow-500' },
    { id: 'push', name: 'Push Notifications', icon: BellRing, fields: ['Server Key', 'App ID'], color: 'text-red-500', hoverColor: 'bg-red-500' },
    { id: 'gmap', name: 'Google Map', icon: Map, fields: ['Server Key', 'App ID'], color: 'text-yellow-500', hoverColor: 'bg-yellow-500' },
    { id: 'snwel', name: 'Snwel.com SMTP', icon: Command, fields: ['Server Key', 'App ID'], color: 'text-cyan-500', hoverColor: 'bg-cyan-500' },
    { id: 'tagmanger', name: 'Tag Manager', icon: Tags, fields: ['Server Key', 'App ID'], color: 'text-blue-500', hoverColor: 'bg-blue-500' },
    { id: 'pixal', name: 'Meta Pixal', icon: Target, fields: ['Server Key', 'App ID'], color: 'text-blue-800', hoverColor: 'bg-blue-800' },
  ]


  export const CreateIntegrationSchema = z.object({
    serviceName: z.string().min(1, 'Service name is required'),
    config: z.record(z.any()), // This will be refined based on the serviceName
    enabled: z.boolean().optional().default(true),
    supportedActions: z.array(z.string()).min(1, 'At least one action is required'),
  });
  
  // Different config schemas based on serviceName
  const WhatsAppConfigSchema = z.object({
    apiKey: z.string().min(1, 'API Key is required'),
    phoneNumber: z.string().min(1, 'Phone Number is required'),
  });
  
  const SMTPConfigSchema = z.object({
    host: z.string().min(1, 'Host is required'),
    port: z.number().min(1, 'Port is required'),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
  });
  
  // Add a mapping of config schemas based on the serviceName
  const configSchemas = {
    whatsapp: WhatsAppConfigSchema,
    smtp: SMTPConfigSchema,
    gmap: GoogleMapSchema
  };
  
  // Extend the base schema and add conditional validation
  export const DynamicIntegrationSchema = CreateIntegrationSchema.superRefine((data, ctx) => {
    const { serviceName, config } = data;
    // Check if there's a schema for the given serviceName
    const ConfigSchema = configSchemas[serviceName as keyof typeof configSchemas];
    console.log(config, serviceName)
    if (ConfigSchema) {
        const confSchema = z.object({
            config: ConfigSchema
        })
      const result = confSchema.safeParse(config);
      if (!result.success) {
          result.error.issues.forEach(issue => ctx.addIssue(issue));
          console.log(result.error)
      }
    } else {
      // Handle case where no schema is defined for this service
    //   ctx.addIssue({
    //     code: "custom",
    //     path: ['config'],
    //     message: `No configuration schema defined for service: ${serviceName}`,
    //   });
    }
  });
  