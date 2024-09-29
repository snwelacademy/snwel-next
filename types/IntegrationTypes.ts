// types/IntegrationTypes.ts
import { z } from 'zod';

export interface IntegrationType {
  _id: string;
  serviceName: string;
  config: Record<string, any>;  // API keys, credentials, etc.
  enabled: boolean;
  supportedActions: string[];  // e.g., ['otp', 'promotionalEmail']
  createdAt: Date;
  updatedAt: Date;
}

// Zod schema for creating a new integration
export const CreateIntegrationSchema = z.object({
  serviceName: z.string().min(1, 'Service name is required'),
  config: z.record(z.any()), // Validates as an object with any structure
  enabled: z.boolean().optional().default(true),  // Optional, default is true
  supportedActions: z.array(z.string()).min(1, 'At least one action is required'),
});

export type CreateIntegration = z.infer<typeof CreateIntegrationSchema>; // Export the type inferred from the schema

// Zod schema for updating an integration
export const UpdateIntegrationSchema = z.object({
  serviceName: z.string().optional(),
  config: z.record(z.any()).optional(),
  enabled: z.boolean().optional(),
  supportedActions: z.array(z.string()).optional(),
});

export type UpdateIntegration = z.infer<typeof UpdateIntegrationSchema>; // Export the type inferred from the schema
