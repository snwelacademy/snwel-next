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
  Command,
} from 'lucide-react'
import { Icons } from '@/components/icons'
import { navItems } from './dashboardNav'
import { useSession } from 'next-auth/react'
import { PermissionCode } from '@/modules/user-management/types/permission.types'


export default function Component() {
  const [expanded, setExpanded] = useState(true)
  const pathname = usePathname();
  const session = useSession();

  function checkPermission(permission: string | string[]) {
    if (!session.data?.user?.roles) return false
    const permissionsForCheck = Array.isArray(permission) ? permission : [permission];
    return permissionsForCheck.every(permission => session.data.user.roles.some(role => role.permissions.some(p => p.code === permission as PermissionCode)));
  }

  const menuItems = navItems.filter(group => {
    if (!group.items.some(item => item.permissions)) return true
    return group.items.some(item => checkPermission(item.permissions as PermissionCode[]))
  })

  return (
    <motion.div 
      className={cn(
        "flex flex-col bg-background border-r h-screen relative",
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
            <span className="font-bold text-xl">Admin Panel</span>
          </motion.div>
        )}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setExpanded(!expanded)}
          className="ml-auto absolute top-0 right-0"
        >
          {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
      <ScrollArea className="overflow-auto flex-1">
        <nav className="flex flex-col gap-4 px-2 py-2 pt-2" style={{paddingBottom: '100px'}}>
          {menuItems.map((group, groupIndex) => (
            <div key={groupIndex} className="flex flex-col gap-1">
              {expanded && (
                <h2 className="text-sm font-semibold text-muted-foreground px-3 py-2">
                  {group.group}
                </h2>
              )}
              {group.items.map((item, itemIndex) => {
                const Icon = Icons[item.icon] || Command
                const isActive = pathname === item.href

                return (
                  <Link
                    key={itemIndex}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                      isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-muted"
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
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
            </div>
          ))}
        </nav>
      </ScrollArea>
    </motion.div>
  )
}