'use client'

import { motion } from 'framer-motion'
import { FileX2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function NoBlogsScreen() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <motion.div
        className="text-center max-w-md mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800"
          variants={itemVariants}
        >
          <FileX2 className="h-10 w-10 text-gray-400 dark:text-gray-500" />
        </motion.div>

        <motion.h2
          className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100"
          variants={itemVariants}
        >
          No blogs found
        </motion.h2>

        <motion.p
          className="text-lg text-gray-600 dark:text-gray-400 mb-8"
          variants={itemVariants}
        >
          We couldn't find any blog posts at the moment. Check back later for updates!
        </motion.p>

        {/* <motion.div variants={itemVariants}>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              Return Home
            </Button>
          </Link>
        </motion.div> */}
      </motion.div>
    </div>
  )
}