import { motion } from "framer-motion"
import { CalendarX } from "lucide-react"

export default function WebinarPassed() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-4">
      <div className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <CalendarX className="w-24 h-24 mx-auto mb-8 text-red-300" />
          <h1 className="text-5xl font-bold mb-4">This webinar has passed</h1>
          <p className="text-xl text-purple-200">
            We &apos;re sorry you missed it. Check back for future events!
          </p>
        </motion.div>
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <a
            href="/webinars"
            className="inline-block bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-100 transition-colors duration-300"
          >
            View Upcoming Webinars
          </a>
        </motion.div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-purple-300 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 left-1/2 w-2 h-2 bg-indigo-300 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-pink-300 rounded-full animate-ping"></div>
      </div>
    </div>
  )
}