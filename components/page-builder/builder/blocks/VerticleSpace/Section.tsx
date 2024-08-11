'use client'
import { cn } from "@/lib/utils";
import { CSSProperties, ReactNode } from "react";


export type SectionProps = {
  className?: string;
  children: ReactNode;
  padding?: string;
  maxWidth?: string;
  style?: CSSProperties;
};

export const Section = ({
  children,
  className,
  padding = "0px",
  maxWidth = "1280px",
  style = {},
}: SectionProps) => {
  return (
    <div
      className={cn([
        'pl-4 pr-4 md:pl-6 md:pr-6',
        className
      ])}
      style={{
        ...style,
        paddingTop: padding,
        paddingBottom: padding,
      }}
    >
      <div className={'ml-auto mr-auto w-full'} style={{ maxWidth }}>
        {children}
      </div>
    </div>
  );
};