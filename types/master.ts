
import { z } from 'zod';

export const master_type_array = [
  'MASTER',
  'SUB_MASTER',
  'PAGE_TEMPLATE'
] as const;

const master_enum = z.enum(master_type_array);

export type MASTER_TYPE = z.infer<typeof master_enum>

export const MASTER_CODES = {
  CURRICULUM_TYPE: 'CURRICULUM-TYPE',
  QUALIFICATIONS: 'QUALIFICATIONS',
  TRAINING_MODE: 'TRAINING-MODE',
  CANDIDATE_STATUS: 'CANDIDATE-STATUS'
}

// Master schema
export const createMasterSchema = z.object({
  code: z.string().min(1, "Code is required"),
  parentCode: z.string().optional(),
  isActive: z.boolean().default(true),
  name: z.string().min(1, "Name is required"),
  meta: z.record(z.any()).optional(),
  sequence: z.number().default(0),
  type: master_enum
});

export const updateMasterSchema = createMasterSchema.partial();

// TypeScript types inferred from the schema
export type CreateMasterDTO = z.infer<typeof createMasterSchema>;
export type UpdateMasterDTO = z.infer<typeof updateMasterSchema>;


export interface Master {
  _id: string;
  code: string;
  parentCode?: string;
  isActive: boolean;
  name: string;
  meta?: Record<string, any>;
  sequence: number;
  type: MASTER_TYPE;
}