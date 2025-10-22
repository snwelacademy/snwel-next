"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { 
  ChevronRight, 
  ChevronLeft,
  ChevronDown,
  Command,
} from 'lucide-react'
import { Icons } from '@/components/icons'
import { navGroups } from './dashboardNav'
import { useAuth } from '@/context/AuthContext'


export default function Component() {
  const [expanded, setExpanded] = useState(true)
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set())
  const pathname = usePathname();
  const { hasAny } = useAuth()

  const toggleGroup = (groupTitle: string) => {
    setCollapsedGroups(prev => {
      const next = new Set(prev)
      if (next.has(groupTitle)) {
        next.delete(groupTitle)
      } else {
        next.add(groupTitle)
      }
      return next
    })
  }

  // Filter groups and items based on permissions
  const filteredGroups = navGroups.map(group => ({
    ...group,
    items: group.items.filter((item: any) => {
      if (!item?.permissions) return true
      const req = Array.isArray(item.permissions) ? item.permissions : [item.permissions]
      return hasAny(req as string[])
    })
  })).filter(group => group.items.length > 0)

  return (
    <motion.div 
      className={cn(
        "flex flex-col bg-background border-r h-screen relative shadow-sm",
        expanded ? "w-64" : "w-20"
      )}
      animate={{ width: expanded ? 256 : 80 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-muted/20">
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <div className="p-1.5 rounded-md bg-primary/10">
              <Command className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold text-lg">Admin Panel</span>
          </motion.div>
        )}
        {!expanded && (
          <div className="p-1.5 rounded-md bg-primary/10 mx-auto">
            <Command className="h-5 w-5 text-primary" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "h-8 w-8 transition-all",
            !expanded && "absolute -right-3 top-4 bg-background border shadow-md"
          )}
        >
          {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1">
        <nav className="p-2 space-y-1" style={{paddingBottom: '100px'}}>
          {filteredGroups.map((group, groupIndex) => {
            const isGroupCollapsed = collapsedGroups.has(group.title)
            const hasActiveItem = group.items.some((item: any) => pathname === item.href)
            
            return (
              <div key={groupIndex} className="space-y-1">
                {/* Group Header */}
                {expanded ? (
                  <button
                    onClick={() => toggleGroup(group.title)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider",
                      "text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50",
                      hasActiveItem && "text-primary"
                    )}
                  >
                    <span>{group.title}</span>
                    <ChevronDown className={cn(
                      "h-3 w-3 transition-transform",
                      isGroupCollapsed && "-rotate-90"
                    )} />
                  </button>
                ) : (
                  <Separator className="my-2" />
                )}

                {/* Group Items */}
                <AnimatePresence>
                  {(!isGroupCollapsed || !expanded) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-0.5"
                    >
                      {group.items.map((item: any, itemIndex: number) => {
                        const iconKey = (item.icon ?? 'dashboard') as keyof typeof Icons
                        const Icon = Icons[iconKey] || Command
                        const isActive = pathname === item.href
                        if (!item.href) return null
                        
                        return (
                          <Link
                            key={itemIndex}
                            href={item.href}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-md transition-all group",
                              "text-sm font-medium",
                              isActive 
                                ? "bg-primary text-primary-foreground shadow-sm" 
                                : "hover:bg-muted text-muted-foreground hover:text-foreground",
                              !expanded && "justify-center"
                            )}
                            title={!expanded ? item.title : undefined}
                          >
                            <Icon className={cn(
                              "h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110",
                              isActive && "text-primary-foreground"
                            )} />
                            {expanded && (
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="truncate"
                              >
                                {item.title}
                              </motion.span>
                            )}
                          </Link>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </nav>
      </ScrollArea>
    </motion.div>
  )
}