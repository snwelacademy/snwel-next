

import { cn } from '@/lib/utils';
import React from 'react';

const typographicStyles: { [key: string]: string } = {
    heroTitle: 'md:text-5xl font-black text-4xl',
    title: 'text-3xl md:text-5xl font-bold text-gray-800 ',
    subtitle: 'text-2xl font-semibold',
    h1: 'text-3xl font-bold',
    h2: 'text-2xl font-bold',
    h3: 'text-xl font-semibold',
    h4: 'text-lg font-semibold',
    h5: 'text-base font-semibold',
    h6: 'text-sm font-semibold',
    p: 'text-base',
    span: 'text-base',
    small: 'text-sm',
    label: 'text-sm font-semibold',
  };

interface TypographyProps {
  as: keyof typeof typographicStyles;
  className?: string;
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({ as, className, children }) => {

   // Check if the component is a custom typographic style
   const isCustomStyle = Object.keys(typographicStyles).includes(as as string);

   // Merge classes based on custom style or passed className
   const classes = isCustomStyle ? typographicStyles[as] : '';

    if(as === 'heroTitle' ) as = 'h1';
    if(as === 'subtitle'|| as === 'title') as = 'h2';
    if(as === 'label') as = "span"
  const Component = as as keyof JSX.IntrinsicElements;
  



 

  return <Component className={cn(classes, className)}>{children}</Component>;
};

export default Typography;


