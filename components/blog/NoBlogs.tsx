'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PenTool, Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function NoBlogsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 min-h-screen flex flex-col">
        <header className="container mx-auto px-4 py-8">
          <nav className="flex justify-between items-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold"
            >
              DevBlog
            </motion.h1>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </nav>
        </header>

        <main className="flex-grow flex items-center justify-center px-4">
          <motion.div 
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="mb-8"
              variants={itemVariants}
            >
              <PenTool className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600" />
            </motion.div>
            <motion.h2 
              className="text-3xl font-bold mb-4"
              variants={itemVariants}
            >
              No blogs yet
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 mb-8"
              variants={itemVariants}
            >
              Get started by creating your first blog post
            </motion.p>
            {/* <motion.div variants={itemVariants}>
              <Button size="lg" className="group">
                Create New Post
                <motion.span
                  className="inline-block ml-2"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  →
                </motion.span>
              </Button>
            </motion.div> */}
          </motion.div>
        </main>

        <footer className="container mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2023 DevBlog. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}