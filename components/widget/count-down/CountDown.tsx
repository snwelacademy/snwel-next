import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

type TimerUnit = {
    isActive: boolean,
    label: string
}

type UnitAppearence = {
    lableColor: string,
    bgColor: string,
    timerTextColor: string
}


const Unit = ({ value, label, appearance, inline }: { value: string, label: string, appearance?: UnitAppearence, inline?: boolean }) => {
    return (
        <div className={cn([
            "flex flex-col gap-2 relative items-center",
            {
                "gap-0": inline
            }
        ])}>
            <div 
            style={{ backgroundColor: appearance?.bgColor }} 
            className={cn([
                "w-16 h-16 flex justify-center items-center rounded-lg",
                {
                    "w-6 h-6 md:w-8 md:h-8": inline
                }
            ])}>
                {/* <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#191A24]"></div> */}
                <span style={{ color: appearance?.timerTextColor }} className={cn([
                    "text-3xl font-semibold",
                    {
                        "text-xs md:text-base": inline
                    }
                ])}>
                    {value}
                </span>
                {/* <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#191A24]"></div> */}
            </div>
            <span style={{ color: appearance?.lableColor }} className={cn([
                "text-center capitalize",
                {
                    "text-xs": inline
                }
            ])}>
                {Number(value) == 1 ? label : label + "s"}
            </span>
        </div>
    )
}
const Timer3 = ({
    appearance,
    day,
    hrs,
    minutes,
    seconds,
    endDate = new Date(),
    inline = true
}: {
    appearance?: {
        lableColor: string,
        bgColor: string,
        timerTextColor: string
    },
    day: TimerUnit,
    hrs: TimerUnit,
    minutes: TimerUnit,
    seconds: TimerUnit,
    endDate: Date | string,
    inline?: boolean
}) => {
    const [countDownTime, setCountDownTIme] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
    });
    const interval = useRef<any>(null)
    const getTimeDifference = (countDownTime: number) => {
        const currentTime = new Date().getTime();
        const timeDiffrence = countDownTime - currentTime;

        let days =
            Math.floor(timeDiffrence / (24 * 60 * 60 * 1000)) >= 10
                ? Math.floor(timeDiffrence / (24 * 60 * 60 * 1000))
                : `0${Math.floor(timeDiffrence / (24 * 60 * 60 * 1000))}`;
        const hours =
            Math.floor((timeDiffrence % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)) >=
                10
                ? Math.floor((timeDiffrence % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60))
                : `0${Math.floor(
                    (timeDiffrence % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
                )}`;
        const minutes =
            Math.floor((timeDiffrence % (60 * 60 * 1000)) / (1000 * 60)) >= 10
                ? Math.floor((timeDiffrence % (60 * 60 * 1000)) / (1000 * 60))
                : `0${Math.floor((timeDiffrence % (60 * 60 * 1000)) / (1000 * 60))}`;
        const seconds =
            Math.floor((timeDiffrence % (60 * 1000)) / 1000) >= 10
                ? Math.floor((timeDiffrence % (60 * 1000)) / 1000)
                : `0${Math.floor((timeDiffrence % (60 * 1000)) / 1000)}`;
        if (timeDiffrence < 0) {
            setCountDownTIme({
                days: "00",
                hours: "00",
                minutes: "00",
                seconds: "00",
            });
            clearInterval(interval.current);
        } else {
            setCountDownTIme({
                days: days as string,
                hours: hours as string,
                minutes: minutes as string,
                seconds: seconds as string,
            });
        }
    };
    const startCountDown = useCallback(() => {
        const customDate = new Date(endDate);
        const countDownDate = new Date(
            customDate.getFullYear(),
            customDate.getMonth(),
            customDate.getDate(),
            customDate.getHours(),
            customDate.getMinutes(),
            customDate.getSeconds()
        );

        interval.current = setInterval(() => {
            getTimeDifference(countDownDate.getTime());
        }, 1000);
    }, [endDate]);
    useEffect(() => {
        startCountDown();
        return () => clearInterval(interval.current);
    }, [startCountDown]);
    return (
        <div>
            <div className={cn([
                "flex justify-center gap-5",
                {
                    "gap-3": inline
                }
            ])}>
                {
                    day && day.isActive &&
                    <Unit
                    inline={inline}
                        value={countDownTime.days}
                        label={day.label}
                        appearance={appearance}
                    />
                }
                {
                    hrs && hrs.isActive &&

                    <Unit
                    inline={inline}
                        value={countDownTime.hours}
                        label={hrs.label}
                        appearance={appearance}
                    />
                }
                {
                    minutes && minutes.isActive &&

                    <Unit
                    inline={inline}
                        value={countDownTime.minutes}
                        label={minutes.label}
                        appearance={appearance}
                    />
                }
                {
                    seconds && seconds.isActive &&

                    <Unit
                    inline={inline}
                        value={countDownTime.seconds}
                        label={seconds.label}
                        appearance={appearance}
                    />

                }
            </div>
        </div>
    );
};
export default Timer3;