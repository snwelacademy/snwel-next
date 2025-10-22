'use client'

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface ModernLoaderProps {
  variant?: 'default' | 'spinner' | 'dots' | 'pulse' | 'skeleton'
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
  text?: string
  className?: string
}

export default function ModernLoader({ 
  variant = 'default', 
  size = 'md', 
  fullScreen = false,
  text,
  className 
}: ModernLoaderProps) {
  
  const sizes = {
    sm: { container: 'h-24', element: 'h-8 w-8' },
    md: { container: 'h-40', element: 'h-12 w-12' },
    lg: { container: 'h-64', element: 'h-16 w-16' }
  }

  const containerClasses = cn(
    "flex flex-col items-center justify-center gap-4",
    fullScreen ? "fixed inset-0 bg-background/80 backdrop-blur-sm z-50" : sizes[size].container,
    className
  )

  if (variant === 'spinner') {
    return (
      <div className={containerClasses}>
        <div className="relative">
          <motion.div
            className={cn(
              "rounded-full border-4 border-primary/20",
              sizes[size].element
            )}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            style={{
              borderTopColor: "hsl(var(--primary))",
              borderRightColor: "hsl(var(--primary))",
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
            }}
          />
        </div>
        {text && <p className="text-sm text-muted-foreground animate-pulse">{text}</p>}
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className={containerClasses}>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-3 w-3 rounded-full bg-primary"
              animate={{
                y: ["0%", "-100%", "0%"],
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
        {text && <p className="text-sm text-muted-foreground">{text}</p>}
      </div>
    )
  }

  if (variant === 'pulse') {
    return (
      <div className={containerClasses}>
        <div className="relative">
          <motion.div
            className={cn("rounded-full bg-primary", sizes[size].element)}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 0.3, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className={cn("absolute inset-0 rounded-full bg-primary", sizes[size].element)}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        {text && <p className="text-sm text-muted-foreground animate-pulse">{text}</p>}
      </div>
    )
  }

  if (variant === 'skeleton') {
    return (
      <div className={cn("space-y-4 p-4", className)}>
        <div className="space-y-2">
          <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
          <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded" />
          ))}
        </div>
        <div className="space-y-2">
          <div className="h-32 bg-muted animate-pulse rounded" />
          <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
        </div>
      </div>
    )
  }

  // Default - Modern gradient spinner
  return (
    <div className={containerClasses}>
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className={cn(
            "rounded-full border-4 border-transparent",
            sizes[size].element
          )}
          style={{
            borderTopColor: "hsl(var(--primary))",
            borderRightColor: "hsl(var(--primary)/0.3)",
            background: "conic-gradient(from 0deg, hsl(var(--primary)) 0%, transparent 100%)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "3px"
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner pulse */}
        <motion.div
          className="absolute inset-2 rounded-full bg-primary/20"
          animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="h-2 w-2 rounded-full bg-primary"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      </div>
      {text && (
        <motion.p 
          className="text-sm font-medium text-muted-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

// Additional loading components for specific use cases
export function TableLoader() {
  return (
    <div className="space-y-3 p-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex gap-4 items-center">
          <div className="h-10 w-10 bg-muted animate-pulse rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted animate-pulse rounded w-1/4" />
            <div className="h-3 bg-muted animate-pulse rounded w-1/3" />
          </div>
          <div className="h-8 w-20 bg-muted animate-pulse rounded" />
        </div>
      ))}
    </div>
  )
}

export function CardLoader() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-lg border p-6 space-y-2">
          <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
          <div className="h-8 bg-muted animate-pulse rounded w-3/4" />
          <div className="h-3 bg-muted animate-pulse rounded w-full" />
        </div>
      ))}
    </div>
  )
}
