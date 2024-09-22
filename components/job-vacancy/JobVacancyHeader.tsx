"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, Briefcase } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

export default function JobVacancyHeader() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [jobTitle, setJobTitle] = useState("")
  const [location, setLocation] = useState("")

  useEffect(() => {
    setJobTitle(searchParams.get("search") || "")
    setLocation(searchParams.get("location") || "")
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (jobTitle) params.append("search", jobTitle)
    if (location) params.append("location", location)
    router.push(`/job-vacancies?${params.toString()}`)
  }

  return (
    <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Find Your Dream Job
        </motion.h1>
        <motion.p 
          className="text-xl text-center mb-12 text-purple-200"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Discover opportunities that match your skills and aspirations
        </motion.p>
        <motion.div 
          className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Job title or keyword" 
                className="pl-10 w-full text-primary"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            <div className="flex-1 relative text-primary">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Location" 
                className="pl-10 w-full"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
              Search Jobs
            </Button>
          </form>
        </motion.div>
      </div>
      <motion.div 
        className="bg-indigo-900 py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <ul className="flex justify-center space-x-4 md:space-x-8 text-sm md:text-base">
            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/job-vacancies?type=remote" className="flex items-center text-purple-200 hover:text-white transition-colors">
                <Briefcase className="mr-2 h-4 w-4" />
                Remote Jobs
              </Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/job-vacancies?type=full-time" className="flex items-center text-purple-200 hover:text-white transition-colors">
                <Briefcase className="mr-2 h-4 w-4" />
                Full-Time
              </Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/job-vacancies?type=part-time" className="flex items-center text-purple-200 hover:text-white transition-colors">
                <Briefcase className="mr-2 h-4 w-4" />
                Part-Time
              </Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/job-vacancies?type=contract" className="flex items-center text-purple-200 hover:text-white transition-colors">
                <Briefcase className="mr-2 h-4 w-4" />
                Contract
              </Link>
            </motion.li>
          </ul>
        </div>
      </motion.div>
    </header>
  )
}