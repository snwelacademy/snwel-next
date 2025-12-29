'use client'

import { motion } from "framer-motion"
import { BookOpen, Briefcase, GraduationCap, Users, ArrowRight } from "lucide-react"

export function WheWeServeTwo() {
  const services = [
    {
      title: "For Students",
      content: "Bridge the gap between classroom learning and real-world industry demands with hands-on, project-based training.",
      icon: <GraduationCap className="h-10 w-10" />,
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-white",
      borderColor: "border-blue-100",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "For Job Seekers",
      content: "Stand out in the competitive job market with specialized certification programs and career guidance.",
      icon: <Briefcase className="h-10 w-10" />,
      gradient: "from-purple-600 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-white",
      borderColor: "border-purple-100",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
    },
    {
      title: "For Professionals",
      content: "Stay ahead of the curve and keep your skills sharp with advanced, industry-relevant training modules.",
      icon: <Users className="h-10 w-10" />,
      gradient: "from-emerald-500 to-teal-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-white",
      borderColor: "border-emerald-100",
      buttonColor: "bg-emerald-600 hover:bg-emerald-700",
    },
    {
      title: "For Corporates",
      content: "Elevate your workforce with tailored training solutions and enterprise-grade skill development programs.",
      icon: <BookOpen className="h-10 w-10" />,
      gradient: "from-rose-600 to-orange-500",
      bgColor: "bg-gradient-to-br from-rose-50 to-white",
      borderColor: "border-rose-100",
      buttonColor: "bg-rose-600 hover:bg-rose-700",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -8,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        delay: 0.2
      }
    },
    hover: {
      rotate: 10,
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400
      }
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
            Our Audience
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Who We{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Serve</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-gradient-to-r from-blue-400 to-cyan-300 opacity-30 -rotate-1"></span>
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Empowering diverse audiences with tailored learning solutions
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="relative group"
            >
              {/* Background glow effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />
              
              {/* Card */}
              <div className={`relative h-full rounded-xl ${service.bgColor} border ${service.borderColor} p-6 shadow-md shadow-slate-100/50 backdrop-blur-sm overflow-hidden`}>
                
                {/* Accent bar */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.gradient}`} />
                
                {/* Icon container */}
                <motion.div
                  variants={iconVariants}
                  className={`mb-5 p-3 rounded-xl bg-gradient-to-br ${service.gradient} w-fit shadow-md`}
                >
                  <div className="text-white">
                    {service.icon}
                  </div>
                </motion.div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {service.content}
                </p>

                {/* Button */}
                <motion.button
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${service.buttonColor} text-white px-4 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300`}
                >
                  Learn More
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Compact Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 pt-8 border-t border-slate-200/60"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { value: "10K+", label: "Students Trained" },
              { value: "95%", label: "Placement Rate" },
              { value: "200+", label: "Corporate Partners" },
              { value: "50+", label: "Courses Offered" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-slate-500 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}