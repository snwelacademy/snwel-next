import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CDTWidgetType } from './CdtType'
import { Button } from '@/components/ui/button'
import Timer3 from '../count-down/CountDown'
import { cn, isDatePassed } from '@/lib/utils'
import { CDT_POSITIONS } from '@/types/WidgetTypes'
import { useWindowSize } from '@uidotdev/usehooks'


const Timers = {
  'timer3': Timer3
}



const CdtWidget = ({ data }: { data: CDTWidgetType }) => {
  const { width } = useWindowSize()
  const [isInline, setInline] = useState(false)
  const Timer = Timers['timer3'];
  const [height, setHeight] = useState<number>();
  const componentRef = useRef<HTMLDivElement>(null);


  const addPadding = useCallback(() => {
    if ([CDT_POSITIONS.FLOATING_TOP, CDT_POSITIONS.FLOATING_BOTTOM].includes(data?.content.position)) {
      const componentHeight = componentRef?.current?.offsetHeight;
      document.body.style.paddingTop = `${componentHeight}px`;
    }
  }, [width])

  const removePadding = () => {
    if ([CDT_POSITIONS.FLOATING_TOP, CDT_POSITIONS.FLOATING_BOTTOM].includes(data?.content.position)) {
      document.body.style.paddingTop = `${0}px`;
    }
  }

  useEffect(() => {
    addPadding();
  }, [width]);

  useEffect(() => {
    setInline(data?.content.position !== CDT_POSITIONS.DEFAULT);
  }, [data])

  useEffect(() => {
    return removePadding;
  }, [])

  if(isDatePassed(data?.content.endTime) && data.settings.actionAfterComplete.action === 'HIDE'){
    return <div></div>
  }

  return (
    <div
      ref={componentRef}
      className={cn([
        " p-12 grid place-content-center border w-full",
        {
          'aspect-auto p-2': isInline,
          'sticky top-0 ': data?.content.position === CDT_POSITIONS.STATIC_TOP,
          'fixed top-0 left-0 right-0 z-50': data?.content.position === CDT_POSITIONS.FLOATING_TOP,
          'fixed bottom-0 left-0 right-0 z-50': data?.content.position === CDT_POSITIONS.FLOATING_BOTTOM,
        }
      ])}
      style={{
        backgroundColor: data?.settings.appearance.colors.bgColor,
        color: data?.settings.appearance.colors.messageColor
      }}>

      <div className={cn([
        'space-y-5 flex flex-col items-center',
        {
          'flex-col sm:flex-row gap-1 space-y-0': isInline
        }
      ])}>
        <div className={cn([
          "text-4xl text-center leading-snug",
          {
            "text-base md:text-xl": isInline
          }
        ])} dangerouslySetInnerHTML={{ __html: data?.content.message }} />
        <Timer
          {...data?.settings.countDisplay}
          inline={isInline}
          endDate={data?.content.endTime}
          appearance={{
            bgColor: data?.settings.appearance.colors.timerColor,
            lableColor: data?.settings.appearance.colors.labelsColor,
            timerTextColor: data?.settings.appearance.colors.timerTextColor
          }} />
        {
          data?.settings.button.isActive
          &&
          <a className='sm:inline-flex hidden' href={data?.settings.button.link || '#'}>
            <Button style={{
              backgroundColor: data?.settings.appearance.colors.buttonColor,
              color: data?.settings.appearance.colors.buttonTextColor
            }} >
              {data?.settings.button.text}
            </Button>
          </a>
        }
      </div>


    </div>
  )
}

export default CdtWidget