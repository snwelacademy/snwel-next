'use client'

import { useState } from 'react'
import { Grid, MessageSquare, Mail, Send, BellRing, Smartphone } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import IntegrationForm from './IntegrationForm'
import { useQuery } from '@tanstack/react-query'
import { getAllIntegrations } from '@/services/admin/admin-integration'

enum AppIds {
WHATSAPP="whatsapp",
SMTP="smtp",
RENDER_EMAIL="render",
TELEGRAM="telegram",
SMS="sms",
PUSH="push"
}

const apps = [
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageSquare, fields: ['API Key', 'Phone Number'], color: 'text-green-500', hoverColor: 'bg-green-500' },
  { id: 'smtp', name: 'SMTP Email', icon: Mail, fields: ['Host', 'Port', 'Username', 'Password'], color: 'text-blue-500', hoverColor: 'bg-blue-500' },
  { id: 'render', name: 'Render Email', icon: Send, fields: ['API Key', 'Template ID'], color: 'text-purple-500', hoverColor: 'bg-purple-500' },
  { id: 'telegram', name: 'Telegram', icon: Send, fields: ['Bot Token', 'Chat ID'], color: 'text-cyan-500', hoverColor: 'bg-cyan-500' },
  { id: 'sms', name: 'SMS', icon: Smartphone, fields: ['API Key', 'From Number'], color: 'text-yellow-500', hoverColor: 'bg-yellow-500' },
  { id: 'push', name: 'Push Notifications', icon: BellRing, fields: ['Server Key', 'App ID'], color: 'text-red-500', hoverColor: 'bg-red-500' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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

export default function AppCenter() {
  const [selectedApp, setSelectedApp] = useState<any>(null)
  const {data, isLoading} = useQuery({
    queryKey: ["appcenter"],
    queryFn: async () => await getAllIntegrations()
  });

  return (
    <div className="container mx-auto p-6 bg-white min-h-screen">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        App Center
      </motion.h1>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {apps.map((app) => (
          <motion.div key={app.id} variants={itemVariants}>
            <Button
              variant="outline"
              className={`h-32 w-full flex flex-col items-center justify-center bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 group`}
              onClick={() => setSelectedApp(app)}
            >
              <app.icon className={`h-12 w-12 mb-2 ${app.color} group-hover:text-white transition-colors duration-300`} />
              <span className={`text-lg font-semibold text-gray-800 group-hover:text-white transition-colors duration-300`}>{app.name}</span>
              <div className={`absolute inset-0 ${app.hoverColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md -z-10`}></div>
            </Button>
          </motion.div>
        ))}
      </motion.div>
      {selectedApp && (
        <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center mb-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`inline-flex items-center justify-center p-3 rounded-full ${selectedApp.hoverColor}`}
                >
                  <selectedApp.icon className="h-8 w-8 text-white" />
                </motion.div>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="ml-3 text-gray-800"
                >
                  {selectedApp.name} Configuration
                </motion.span>
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Configure your {selectedApp.name} integration settings below.
              </DialogDescription>
            </DialogHeader>
            <IntegrationForm data={data?.docs.find(dt => dt.serviceName === selectedApp.id)} serviceName={selectedApp.id} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}