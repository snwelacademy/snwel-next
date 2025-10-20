'use client'

import { motion } from 'framer-motion'

const categories = [
  {
    title: "Students",
    description: "Start your career with confidence. Our courses provide the hands-on experience and industry exposure that sets you apart in the job market. Turn your academic knowledge into practical skills that employers value."
  },
  {
    title: "Job Seekers",
    description: "Enhance your employability and secure your dream job with our specialized training programs. We focus on the skills that matter most to employers, making you more competitive and marketable in a crowded job market."
  },
  {
    title: "Working Professionals",
    description: "Stay ahead of the curve with advanced courses designed to keep you at the forefront of your industry. Whether you're looking to update your skills or take on new challenges, SNWEL Academy helps you remain productive and successful."
  },
  {
    title: "Corporates",
    description: "Elevate your workforce with tailored training solutions. Our corporate programs are designed to enhance team skills, boost productivity, and drive innovation, ensuring your organization stays competitive in a rapidly evolving business landscape."
  }
]

export default function PremiumSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-800 overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{
          backgroundImage: [
            'radial-gradient(circle at 20% 20%, #f0f0f0 0%, #ffffff 100%)',
            'radial-gradient(circle at 80% 80%, #f0f0f0 0%, #ffffff 100%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-24">
        <motion.h2 
          className="text-5xl font-bold mb-12 text-center text-gray-900"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Who We Serve
        </motion.h2>
        
        <motion.p 
          className="text-xl mb-16 text-center max-w-3xl mx-auto text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We empower individuals and businesses to achieve their career goals through our job-guaranteed courses, tailored to meet the demands of today's competitive job market.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              className="bg-white rounded-2xl p-8 shadow-lg overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-50" />
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                  {category.title}
                </h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-100 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </section>
  )
}