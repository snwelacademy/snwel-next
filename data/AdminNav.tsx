"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  ChevronRight, 
  ChevronLeft,
  LayoutDashboard,
  BookOpen,
  FolderTree,
  Users,
  FileText,
  Video,
  UserPlus,
  Component,
  User,
  Briefcase,
  FileSpreadsheet,
  FolderKanban,
  Image,
  Settings,
  AppWindow,
  MessageSquare
} from 'lucide-react'

import { NavItemWithOptionalChildren } from "@/types"
import { Icons } from '@/components/icons'
import { navItems } from './dashboardNav'

const iconMap = {
  dashboard: LayoutDashboard,
  course: BookOpen,
  category: FolderTree,
  enrollments: Users,
  pages: FileText,
  webinar: Video,
  webinarEnroll: UserPlus,
  component: Component,
  user: User,
  bag: Briefcase,
  jobApplications: FileSpreadsheet,
  job_category: FolderKanban,
  gallery: Image,
  kanban: Settings,
  apps: AppWindow,
  snwelEnquiry: MessageSquare
}


export default function AdminSidebar() {
  const [expanded, setExpanded] = useState(true)
  const pathname = usePathname()

  return (
    <motion.div 
      className={cn(
        "flex flex-col bg-background border-r h-screen",
        expanded ? "w-64" : "w-20"
      )}
      animate={{ width: expanded ? 256 : 80 }}
    >
      <div className="flex items-center justify-between p-4">
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <img src="/placeholder.svg" alt="Logo" className="w-8 h-8" />
            <span className="font-bold text-xl">Admin</span>
          </motion.div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(!expanded)}
          className="ml-auto"
        >
          {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 p-2">
          {navItems.map((item, index) => {
            const Icon = Icons[item.icon||'apps'] || Component
            const isActive = pathname === item.href

            return (
              <Link
                key={index}
                href={item.href||'#'}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted"
                )}
              >
                <Icon className="h-5 w-5" />
                {expanded && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {item.title}
                  </motion.span>
                )}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
    </motion.div>
  )
}