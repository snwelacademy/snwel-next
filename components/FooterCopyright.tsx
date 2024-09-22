"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface FooterCopyrightProps {
  companyName: string
  links?: Array<{ label: string; href: string }>
}

export default function FooterCopyright({ companyName, links = [] }: FooterCopyrightProps) {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black border-t border-gray-200"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-center items-center text-sm text-gray-300">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            &copy; {currentYear} {companyName}. All rights reserved.
          </motion.div>
          {links.length > 0 && (
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex mt-4 md:mt-0"
            >
              <ul className="flex space-x-4">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="hover:text-gray-900 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </div>
      </div>
    </motion.footer>
  )
}