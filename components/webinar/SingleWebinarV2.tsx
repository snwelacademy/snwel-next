'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarDays, Clock, Users, Play, X, IndianRupee, User, UserPlus } from 'lucide-react'
import { Webinar } from '@/types'
import EnquiryForm from '@/components/forms/EnquiryForm'
import { getCurrencySymbol } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

// Function to extract YouTube video ID
const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
}

export default function SingleWebinarV2({webinar}: {webinar: Webinar}) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [youtubeid, setYoutubeId] = useState<string|null>(null)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      <header className="relative h-[60vh] overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={webinar.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          {youtubeId && (
            <motion.button
              onClick={handlePlayVideo}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-white p-6 shadow-2xl hover:shadow-blue-500/50 transition-all"
            >
              <Play className="h-16 w-16 text-blue-600" />
            </motion.button>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-3 bg-blue-600 hover:bg-blue-700">Live Webinar</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{webinar.title}</h1>
              <p className="text-lg text-gray-200 max-w-3xl">{webinar.shortDescription}</p>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 -mt-20 relative z-10">

        <div className="grid gap-8 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">About This Webinar</h2>
                <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg" 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                    >
                      <UserPlus className="mr-2 h-5 w-5" />
                      Register
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">Register for Webinar</DialogTitle>
                      <DialogDescription className="text-base">
                        Fill out the form below to secure your spot for <span className="font-semibold text-gray-900">{webinar.title}</span>
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                      <EnquiryForm type="webinar" isUnique />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div dangerouslySetInnerHTML={{__html: webinar.content}} className="prose prose-tight prose-zinc max-w-none text-gray-700"></div>
            </div>

            {webinar.hosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100"
              >
                <h2 className="mb-6 text-2xl font-bold text-gray-900">Meet Your Host{webinar.hosts.length > 1 ? 's' : ''}</h2>
                <div className="space-y-4">
                  {webinar.hosts.map((host, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all">
                      <Avatar className="h-16 w-16 ring-2 ring-blue-200">
                        <AvatarImage src={host.profilePic} alt={host.name} />
                        <AvatarFallback className="bg-blue-600 text-white text-xl font-semibold">
                          {host.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">{host.name}</h3>
                        {/* {host.designation && <p className="text-sm text-gray-600">{host?.designation}</p>} */}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-6"
          >
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 shadow-xl text-white sticky top-24">
              <h2 className="mb-6 text-2xl font-bold">Webinar Details</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                  <CalendarDays className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-blue-100">Date</p>
                    <p className="font-semibold">{webinar.startDate ? new Date(webinar.startDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "-"}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                  <Clock className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-blue-100">Time</p>
                    <p className="font-semibold">{webinar.startDate ? new Date(webinar.startDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : "-"}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                  <IndianRupee className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-blue-100">Price</p>
                    <p className="text-3xl font-bold">
                      {getCurrencySymbol(webinar.currency)} {webinar.price ?? 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/20">
                <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg" 
                      className="w-full bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg py-6 shadow-lg hover:shadow-xl transition-all"
                    >
                      <UserPlus className="mr-2 h-5 w-5" />
                      Register Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">Register for Webinar</DialogTitle>
                      <DialogDescription className="text-base">
                        Fill out the form below to secure your spot for <span className="font-semibold text-gray-900">{webinar.title}</span>
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                      <EnquiryForm type="webinar" isUnique />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </motion.div>
        </div>

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