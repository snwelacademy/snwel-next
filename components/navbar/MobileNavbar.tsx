"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, X, Facebook, Twitter, Instagram, Linkedin, YoutubeIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { MenuSchemaWithChildrenType } from "@/types"
import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons"
import EnrollCourseModal from "../courses/EnrollCourseModal"
import { Button } from "../ui/button"

// const navItems = [
//   {
//     name: "Products",
//     href: "/products",
//     children: [
//       { name: "Electronics", href: "/products/electronics" },
//       { name: "Clothing", href: "/products/clothing" },
//       { name: "Books", href: "/products/books" },
//     ],
//   },
//   {
//     name: "Services",
//     href: "/services",
//     children: [
//       { name: "Consulting", href: "/services/consulting" },
//       { name: "Design", href: "/services/design" },
//     ],
//   },
//   { name: "About", href: "/about" },
//   { name: "Contact", href: "/contact" },
// ]

// const socialLinks = [
//   { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
//   { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
//   { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
//   { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
// ]

const iconsMap = {
    "facebook": Facebook,
    "insta": InstagramLogoIcon,
    "x": X,
    "youtube": YoutubeIcon,
    "linkedin": LinkedInLogoIcon
}

export default function MobileMenu({navItems=[], logo, socialLinks}: {navItems?: MenuSchemaWithChildrenType[], logo?: string, socialLinks?: Record<string, string>}) {
  const [isOpen, setIsOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const toggleNav = () => setIsOpen(!isOpen)
  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name)
  }

  const menuVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
  }

  const itemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: 50,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  return (
    <div className="relative">
      <button
        onClick={toggleNav}
        className="fixed top-4 right-4 z-50 p-2 bg-primary text-primary-foreground rounded-full shadow-lg"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-y-0 right-0 w-64 bg-background shadow-xl z-40 flex flex-col"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="p-4 flex justify-center items-center"
            >
              <img
                src={logo}
                alt="Logo"
                className="h-10 w-auto"
              />
            </motion.div>
            <ul className="py-8 px-4 flex-grow overflow-y-auto">
              {navItems.map((item) => (
                <motion.li key={item.name} variants={itemVariants} className="mb-4">
                  {item.children && item.children.length >0 ? (
                    <div>
                      <button
                        onClick={() => toggleSubmenu(item.name)}
                        className="flex items-center justify-between w-full text-lg font-semibold py-2 px-4 rounded-md hover:bg-accent text-foreground"
                        aria-expanded={openSubmenu === item.name}
                      >
                        {item.name}
                        <motion.span
                          animate={{ rotate: openSubmenu === item.name ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown size={20} />
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {openSubmenu === item.name && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-4 mt-2 space-y-2"
                          >
                            {item.children.map((child) => (
                              <motion.li
                                key={child.name}
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              >
                                <Link
                                  href={child.href||'#'}
                                  className="block py-2 px-4 rounded-md hover:bg-accent text-foreground"
                                  onClick={toggleNav}
                                >
                                  {child.name}
                                </Link>
                              </motion.li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href||'#'}
                      className="block text-lg font-semibold py-2 px-4 rounded-md hover:bg-accent text-foreground"
                      onClick={toggleNav}
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="p-4 border-t border-border"
            >
              <EnrollCourseModal
                trigger={<Button className='w-full' size={'lg'} variant={'destructive'}>Register</Button>}
                courseId=''
              />
            </motion.div>
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="p-4 border-t border-border"
            >
              <div className="flex justify-center space-x-4">
                {socialLinks?.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors"
                    aria-label={link.name}
                  >
                    <link.icon size={24} />
                  </a>
                ))}
              </div>
            </motion.div> */}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}