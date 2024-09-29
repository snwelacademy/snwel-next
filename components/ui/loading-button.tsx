"use client"

import { useFormStatus } from "react-dom"
import { motion } from "framer-motion"
import { Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CoolLoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function LoadingButton({ children, ...props }: CoolLoadingButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="relative overflow-hidden"
      {...props}
    >
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: pending ? 0 : 1 }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: pending ? 1 : 0 }}
      >
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-5 h-5" />
        </motion.span>
      </motion.span>
    </Button>
  )
}