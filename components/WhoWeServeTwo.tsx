'use client'

import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Briefcase, GraduationCap, Users } from "lucide-react"

export function WheWeServeTwo() {
  const services = [
    {
      title: "For Students",
      content: "Bridge the gap between classroom learning and real-world industry demands.",
      icon: <GraduationCap className="h-8 w-8" />,
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "For Job Seekers",
      content: "Stand out in the competitive job market with specialized training programs.",
      icon: <Briefcase className="h-8 w-8" />,
      color: "from-purple-400 to-purple-600",
    },
    {
      title: "For Working Professionals",
      content: "Stay ahead of the curve and keep your skills sharp with advanced training.",
      icon: <Users className="h-8 w-8" />,
      color: "from-green-400 to-green-600",
    },
    {
      title: "Corporates",
      content: "Elevate your workforce with tailored training solutions.",
      icon: <BookOpen className="h-8 w-8" />,
      color: "from-red-400 to-red-600",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-center mb-16"
        >
          Who We{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Serve</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 content-stretch">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 group-hover:scale-105 h-full">
                <div className={`p-6 bg-gradient-to-br ${service.color}`}>
                  <div className="text-white mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{service.content}</p>
                  {/* <a
                    href="#"
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
