import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { z } from "zod";

const CDT_POSITIONS = {
    DEFAULT: 'DEFAULT',
    STATIC_TOP: 'STATIC_TOP',
    FLOATING_TOP: 'FLOATING_TOP',
    FLOATING_BOTTOM: 'FLOATING_BOTTOM'
  }

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
        buttonTextColor: z.string(),
      }),
    }),
  });


  const CdtWidgetContent = z.object({
    startTime: z.string(),
    endTime: z.string(),
    timeZone: z.string(),
    position: z.nativeEnum(CDT_POSITIONS),
    message: z.string(),
  });

export const CDTWidgetSchema = z.object({
    title: z.string(),
    type: z.string(),
    code: z.string(),
    content: CdtWidgetContent,
    settings: CdtWidgetSettings
})


export const defaultCdtValue = {
    title: 'Count Down Timer Widget',
    icon: 'sun',
    description: "This is count down timer widget",
    type: 'cdtWidget',
    code: nanoid(),
    content: {
      startTime: new Date().toLocaleString(),
      endTime: dayjs(Date.now()).add(2, 'day').toDate().toLocaleString(),
      timeZone: '',
      position: CDT_POSITIONS.DEFAULT,
      message: "🎂✨ Countdown to our birthday! ✨Epic things are going to happen in",
    },
    settings: {
      countDisplay: {
        'day': { isActive: true, label: 'Day' },
        'hrs': { isActive: true, label: 'Hours' },
        'minutes': { isActive: true, label: 'Minutes' },
        'seconds': { isActive: true, label: 'Seconds' },
      },
      button: {
        isActive: true,
        text: "Register",
        link: ''
      },
      actionAfterComplete: {
        action: 'HIDE',
        showMesage: {
          message: "The countdown is finished",
          showCounter: true,
          showButton: true,
          buttonLink: "",
          buttonText: "Register"
        },

      },
      appearance: {
        colors: {
          timerColor: '#fdf0d5',
          timerTextColor: '#003049',
          labelsColor: '#fdf0d5',
          messageColor: '#fdf0d5',
          buttonColor: '#000000',
          bgColor: '#c1121f',
          buttonTextColor: '#ffffff'
        }
      }
    }
}


export type CDTWidgetType = z.infer<typeof CDTWidgetSchema>;

