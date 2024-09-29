import { z } from "zod";


export enum SETTINGS {
    INTEGRATION = 'INTEGRATION',
    GENERAL = 'GENERAL',
    EMAIL = 'EMAIL',
    MENUBUILDER = 'MENUBUILDER'
}


export type Setting<T = any> = {
    _id: string,
    code: SETTINGS,
    data: T,
    isChangable: boolean
}

const settings_array = [
    'INTEGRATION',
    'GENERAL',
    'EMAIL'
] as const;

export const SettingSchema = z.object({
    code: z.enum(settings_array),
    data: z.any(),
    isChangable: z.boolean().optional().default(false)
})


export type CreateSettingInput<T=any> = {
    code: SETTINGS,
    data: T,
    isChangable: boolean
}
export type UpdateSettingInput<T=any> = {
    code?: string
    data: T,
    isChangable: boolean
}

export type GeneralSettingType = {
    email?: string,
    loc?: {
        city: string,
        country: string,
        zipcode: string,
        address: string
    },
    logoUrl?: string,
    phone?: string,
}


export enum EMAIL_TRANSPORTER {
    SENDGRID = 'SENDGRID',
    NODEMAILER = 'NODEMAILER',
    RESEND = 'RESEND'
}


export const IntegrationSettingTypeSchema = SettingSchema.merge(z.object({
    code: z.enum([SETTINGS.INTEGRATION]),
    data: z.object({
        whatsapp: z.object({
            url: z.string(),
            appKey: z.string(),
            authKey: z.string(),
            message: z.string().optional()
        }).optional(),
    })
}));


export type IntegrationSetting = z.infer<typeof IntegrationSettingTypeSchema>;

export const EmailSettingTypeSchema = SettingSchema.merge(z.object({
    code: z.enum([SETTINGS.EMAIL]),
    data: z.object({
        [EMAIL_TRANSPORTER.NODEMAILER]: z.object({
            host: z.string(),
            port: z.string(),
            secure: z.boolean(),
            auth: z.object({
                user: z.string(),
                pass: z.string()
            })
        }).optional(),
    })
}));

export type EmailSetting = z.infer<typeof EmailSettingTypeSchema>;


export const GeneralSettingSchema = SettingSchema.merge(z.object({
    code: z.enum([SETTINGS.GENERAL]),
    data: z.object({
        siteName: z.string(),
        logoUrl: z.string().optional(),
        location: z.object({
            address: z.string(),
            city: z.string(),
            state: z.string(),
            country: z.string()
        }).optional(),
        contacts: z.object({
            phone: z.string().optional(),
            email: z.string().optional(),
        }).optional(),
        senderEmail: z.string(),
        socialLinks: z.object({
            facebook: z.string().optional(),
            insta: z.string().optional(),
            x: z.string().optional(),
            youtube: z.string().optional(),
            linkedin: z.string().optional()
        }).optional()
    })
}))

export type GeneralSetting = z.infer<typeof GeneralSettingSchema>;

export const MenuItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    href: z.string().optional(),
    icon: z.string().optional(),
    img: z.string().optional(),
    index: z.number().nullable().optional(),
    parentId: z.string().nullable().optional(),
    depth: z.number().optional()
})

export const MenuSchemaWithChildren = MenuItemSchema.merge(z.object({children: z.array(MenuItemSchema).optional().default([])}))

export const MenuSettingSchema = SettingSchema.merge(z.object({
    code: z.enum([SETTINGS.MENUBUILDER]),
    data: z.object({
        menus: z.array(MenuSchemaWithChildren).default([]),
        footerMenu: z.array(MenuSchemaWithChildren).default([])
    })
}))

export type MenuSetting = z.infer<typeof MenuSettingSchema>;

export type MenuSchemaWithChildrenType = z.infer<typeof MenuSchemaWithChildren>;




