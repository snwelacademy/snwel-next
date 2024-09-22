"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "react-confetti"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CheckCircle } from "lucide-react"

export default function JobApplicationSuccess({isOpen=false, setIsOpen}: {isOpen: boolean, setIsOpen: (open: boolean) => void}) {
  const [confettiActive, setConfettiActive] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setConfettiActive(true)
      const timer = setTimeout(() => setConfettiActive(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* <DialogTrigger asChild>
        <Button variant="default">View Application Status</Button>
      </DialogTrigger> */}
      <AnimatePresence>
        {isOpen && (
          <DialogContent className="sm:max-w-md">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 300 }}
            >
              <DialogHeader>
                <DialogTitle>Application Submitted!</DialogTitle>
                <DialogDescription>
                  Your job application has been successfully submitted.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center justify-center p-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2,
                  }}
                >
                  <CheckCircle className="w-24 h-24 text-green-500" />
                </motion.div>
                <motion.p
                  className="mt-4 text-lg font-semibold text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Congratulations!
                </motion.p>
                <motion.p
                  className="mt-2 text-sm text-center text-gray-500"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  We&apos;ve received your application and will review it shortly.
                </motion.p>
              </div>
              <div className="mt-6 flex justify-center">
                <Button onClick={() => setIsOpen(false)}>Close</Button>
              </div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
      {confettiActive && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}
    </Dialog>
  )
}