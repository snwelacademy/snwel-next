'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarDays, Clock, Users, Play, X, IndianRupee } from 'lucide-react'
import { Webinar } from '@/types'

// Function to extract YouTube video ID
const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
}

// Mock data based on the provided schema
// const webinar = {
//   id: '1',
//   title: 'Advanced React Techniques for Senior Developers',
//   shortDescription: 'Elevate your React skills to the next level with industry experts',
//   content: 'Join us for an intensive webinar where we dive deep into advanced React concepts, best practices, and cutting-edge techniques used by top tech companies.',
//   startDate: new Date('2023-08-15T10:00:00Z'),
//   slug: 'advanced-react-techniques',
//   thumbnail: 'https://youtu.be/h3BKjZMGoIw?si=wvzn8e41g3TDCoU8', // Example YouTube link
//   coverImage: 'https://ik.imagekit.io/public.blob.vercel-storage.com/react-cover-YNLB6YVXO/react-cover.jpg',
//   isActive: true,
//   hosts: [{ name: 'Jane Doe', avatar: 'https://ik.imagekit.io/public.blob.vercel-storage.com/avatar-YNLB6YVXO/avatar1.jpg' }],
//   price: 199,
//   currency: 'INR',
//   curriculum: [
//     { title: 'Advanced State Management', duration: '1 hour' },
//     { title: 'Performance Optimization', duration: '1 hour' },
//     { title: 'Custom Hooks and Patterns', duration: '1 hour' },
//     { title: 'Server-Side Rendering Deep Dive', duration: '1 hour' },
//   ],
// }

export default function SingleWebinarV2({webinar}: {webinar: Webinar}) {
  const [isRegistering, setIsRegistering] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [youtubeid, setYoutubeId] = useState<string|null>(null)

  const handleRegister = () => {
    setIsRegistering(true)
    // Simulating API call
    setTimeout(() => {
      setIsRegistering(false)
      alert('Registration successful!')
    }, 2000)
  }

  const youtubeId = getYouTubeId(webinar.videoUrl||"")
  const thumbnailUrl = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    : webinar.thumbnail

  const handlePlayVideo = () => {
    if (youtubeId) {
      setIsVideoPlaying(true)
    }
  }

  useEffect(() => {
    if(!webinar.videoUrl) return;
    const youtubeId = getYouTubeId(webinar.videoUrl);
    setYoutubeId(youtubeId)
  }, [webinar])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="relative h-[50vh] overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={webinar.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          {youtubeId && (
            <motion.button
              onClick={handlePlayVideo}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-full bg-white p-4 shadow-lg"
            >
              <Play className="h-16 w-16 text-blue-600" />
            </motion.button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold">{webinar.title}</h1>
          <p className="text-xl text-gray-600">{webinar.shortDescription}</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-6"
          >
            <div className="rounded-lg bg-white p-6 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]">
              <h2 className="mb-4 text-2xl font-bold">Webinar Details</h2>
              <div className="flex items-center space-x-4">
                <CalendarDays className="h-6 w-6 text-blue-600" />
                <span>{webinar.startDate ? new Date(webinar.startDate).toLocaleDateString() : "-"}</span>
              </div>
              <div className="mt-2 flex items-center space-x-4">
                <Clock className="h-6 w-6 text-blue-600" />
                <span>{webinar.startDate ? new Date(webinar.startDate).toLocaleTimeString() : "-"}</span>
              </div>
              <div className="mt-4 flex items-center space-x-4">
                <IndianRupee className="h-6 w-6 text-blue-600" />
                <span className="text-2xl font-bold">
                  {webinar.price} {webinar.currency}
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full rounded-md bg-blue-600 px-8 py-3 font-bold text-white shadow-lg transition-colors hover:bg-blue-700"
              onClick={handleRegister}
              disabled={isRegistering}
            >
              {isRegistering ? 'Registering...' : 'Register Now'}
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="rounded-lg bg-white p-6 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]"
          >
            <h2 className="mb-4 text-2xl font-bold">About This Webinar</h2>
            <p dangerouslySetInnerHTML={{__html: webinar.content}} className="text-gray-600"></p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12"
        >
          <h2 className="mb-6 text-3xl font-bold">Curriculum</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {webinar.curriculum.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                className="rounded-lg bg-white p-4 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]"
              >
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-gray-600">{item.duration}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

       {
        webinar.hosts.length > 0 && 
        <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-12"
      >
        <h2 className="mb-6 text-3xl font-bold">Your Host</h2>
        <div className="flex items-center space-x-4 rounded-lg bg-white p-6 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]">
          <img
            src={webinar.hosts[0].profilePic}
            alt={webinar.hosts[0].name}
            className="h-16 w-16 rounded-full"
          />
          <div>
            <h3 className="text-xl font-bold">{webinar.hosts[0].name}</h3>
            <p className="text-gray-600">Expert React Developer</p>
          </div>
        </div>
      </motion.div>
       }
      </main>

      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          >
            <div className="relative w-full max-w-4xl">
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300"
              >
                <X className="h-8 w-8" />
                <span className="sr-only">Close video</span>
              </button>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="h-full w-full aspect-video"
                ></iframe>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}