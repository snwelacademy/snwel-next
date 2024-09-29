'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'

type MenuItem = {
  id: string
  name: string
  href: string
  index: number
  parentId: string | null
  depth: number
  children: MenuItem[]
}

type SocialLinks = {
  facebook: string
  insta: string
  x: string
  youtube: string
  linkedin: string
}

type FooterProps = {
  footerMenu: MenuItem[]
  socialLinks: SocialLinks
}

const RenderMenuItem = ({ item }: { item: MenuItem }) => (
  <li key={item.id}>
    <Link href={item.href} className="hover:text-white transition-colors">
      {item.name}
    </Link>
    {item?.children?.length > 0 && (
      <ul className="ml-4 mt-2 space-y-2">
        {item.children.map((child) => (
          <RenderMenuItem key={child.id} item={child} />
        ))}
      </ul>
    )}
  </li>
)

export default function Footer({ footerMenu, socialLinks }: FooterProps) {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [])

  return (
    <footer
      ref={footerRef}
      className={`bg-gray-900 text-gray-300 transition-all duration-1000 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">SNWEL Academy</h2>
            <p className="mb-4">Empowering professionals with industry-leading certifications and training.</p>
            <div className="flex space-x-4">
              <a href={socialLinks?.facebook||"#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href={socialLinks?.insta||"#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href={socialLinks?.x||"#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
              <a href={socialLinks?.youtube||"#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" aria-label="YouTube">
                <Youtube className="h-6 w-6" />
              </a>
              <a href={socialLinks?.linkedin||"#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Footer Menu */}
          <div className="col-span-2">
            {footerMenu?.length > 0 ? (
              <ul className="space-y-2 grid grid-cols-2 gap-x-4">
                {footerMenu.map((item) => (
                  <RenderMenuItem key={item.id} item={item} />
                ))}
              </ul>
            ) : (
              <p>No menu items available</p>
            )}
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:info@snwelacademy.com" className="hover:text-white transition-colors">
                  info@snwelacademy.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <span>123 Academy St, City, Country</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} SNWEL Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}