

import { defaultCdtValue } from '@/components/widget/cdt-widget/CdtType';
import dayjs from 'dayjs';
import { z } from 'zod';
export interface Widget {
  _id?: string;
  title: string,
  type: WidgetType;
  code: string,
  content: WidgetContent;
  settings: WidgetSettings;
  createdAt: string;
  updatedAt: string;
}

export type _WidgetType = {
  title: string,
  description: string,
  icon?: any,
  type: WidgetType,
  content: any,
  settings: any
}

export type WidgetType = 'Slider' | 'ctaBanner' | 'marketingPopup' | 'cdtWidget';

////////////////////  COUNT DOWN TIMER WIDGET ////////////////////////////////

export const CDT_POSITIONS = {
  DEFAULT: 'DEFAULT',
  STATIC_TOP: 'STATIC_TOP',
  FLOATING_TOP: 'FLOATING_TOP',
  FLOATING_BOTTOM: 'FLOATING_BOTTOM'
}

export const template = {
  DEFAULT: 'Default Template'
}

export const Widgets: Record<string, _WidgetType> = {
  'cdtWidget': defaultCdtValue as any
}


// ZOD SCHEMA
const CdtWidgetContent = z.object({
  startTime: z.string(),
  endTime: z.string(),
  timeZone: z.string(),
  position: z.nativeEnum(CDT_POSITIONS),
  message: z.string(),
});

const CdtWidgetSettings = z.object({
  countDisplay: z.object({
    day: z.object({ isActive: z.boolean(), label: z.string() }),
    hrs: z.object({ isActive: z.boolean(), label: z.string() }),
    minutes: z.object({ isActive: z.boolean(), label: z.string() }),
    seconds: z.object({ isActive: z.boolean(), label: z.string() }),
  }),
  button: z.object({
    isActive: z.boolean(),
    text: z.string(),
    link: z.string().optional()
  }),
  actionAfterComplete: z.object({
    action: z.enum(['HIDE', 'SHOW_MESSAGE']),
    showMesage: z.object({
      message: z.string(),
      showCounter: z.boolean(),
      showButton: z.boolean(),
      buttonLink: z.string().optional(),
      buttonText: z.string().optional(),
    }).optional(),
  }),
  appearance: z.object({
    colors: z.object({
      timerColor: z.string(),
      timerTextColor: z.string(),
      labelsColor: z.string(),
      messageColor: z.string(),
      buttonColor: z.string(),
      bgColor: z.string(),
      buttonTextColor: z.string()
    }),
  }),
});

// Specific content interfaces for each widget type
export interface SliderContent {
  slides: Slide[];
}

export interface Slide {
  imageUrl: string;
  caption: string;
}

export interface CtaBannerContent {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export interface MarketingPopupContent {
  message: string;
  imageUrl: string;
  link: string;
}

// Union type of all possible content interfaces
export type WidgetContent = SliderContent | CtaBannerContent | MarketingPopupContent;

// Settings interfaces (you can add more specific fields if needed)
export interface SliderSettings {
  autoPlay: boolean;
  delay: number;
}

export interface CtaBannerSettings {
  backgroundColor: string;
}

export interface MarketingPopupSettings {
  showOnPageLoad: boolean;
  delay: number;
}

// Union type of all possible settings interfaces
export type WidgetSettings = SliderSettings | CtaBannerSettings | MarketingPopupSettings;


// WidgetType as a Zod literal type
const WidgetType = z.enum(['Slider', 'ctaBanner', 'marketingPopup', 'cdtWidget']);

// SliderContent schema
const SliderContent = z.object({
  slides: z.array(z.object({
    imageUrl: z.string(),
    caption: z.string(),
  })),
});

// CtaBannerContent schema
const CtaBannerContent = z.object({
  title: z.string(),
  subtitle: z.string(),
  ctaText: z.string(),
  ctaLink: z.string(),
});

// MarketingPopupContent schema
const MarketingPopupContent = z.object({
  message: z.string(),
  imageUrl: z.string(),
  link: z.string(),
});



// SliderSettings schema
const SliderSettings = z.object({
  autoPlay: z.boolean(),
  delay: z.number(),
  template: z.string()
});

// CtaBannerSettings schema
const CtaBannerSettings = z.object({
  backgroundColor: z.string(),
});

// MarketingPopupSettings schema
const MarketingPopupSettings = z.object({
  showOnPageLoad: z.boolean(),
  delay: z.number(),
});

// Union of all possible content schemas
const WidgetContent = z.union([
  SliderContent,
  CtaBannerContent,
  MarketingPopupContent,
  CdtWidgetContent
]);

// Union of all possible settings schemas
const WidgetSettings = z.union([
  SliderSettings,
  CtaBannerSettings,
  MarketingPopupSettings,
  CdtWidgetSettings
]);

// Complete schema for creating a widget
export const createWidget = z.object({
  title: z.string(),
  type: WidgetType,
  code: z.string(),
  content: WidgetContent.optional(),
  settings: WidgetSettings.optional(),
});

// Complete schema for updating a widget
export const updateWidget = z.object({ _id: z.string() }).merge(createWidget.partial()); // Update allows partial data

// Types for create and update widget payloads
export type CreateWidget = z.infer<typeof createWidget>;
export type UpdateWidget = z.infer<typeof updateWidget>;



