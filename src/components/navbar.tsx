"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ModeToggle } from "@/components/mode-toggle"
import type { NavItem } from "@/lib/types"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { CommandPalette } from "@/components/ui/command-palette"

export function Navbar({ items = [] }: { items?: NavItem[] }) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
      ? "bg-background/80 backdrop-blur-xl shadow-sm border-b border-border/50"
      : "bg-transparent"
      }`}>
      <div className="container flex h-20 lg:h-24 max-w-screen-xl items-center mx-auto px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="mr-8 flex flex-col items-center justify-center group gap-0.5 mt-1">
          <Image
            src="/cic-logo.png"
            alt="CIC Logo"
            width={120}
            height={48}
            className="w-auto h-10 lg:h-12 object-contain"
            priority
          />
          <span className="text-[8px] lg:text-[10px] text-muted-foreground font-medium tracking-widest uppercase whitespace-nowrap">
            Keeping pace with technology
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex flex-1 items-center gap-1">
          {items.map((item) => (
            <div key={item.name} className="relative group">
              {item.children ? (
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-2 xl:px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50 whitespace-nowrap"
                >
                  {item.name}
                  <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
                </Link>
              ) : (
                <Link
                  href={item.href}
                  className="px-2 xl:px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50 whitespace-nowrap"
                >
                  {item.name}
                </Link>
              )}

              {/* Dropdown */}
              {item.children && (
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-card border border-border/60 rounded-xl shadow-xl p-2 min-w-[220px]">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 ml-auto">
          <CommandPalette />
          <ModeToggle />
          <Link
            href={process.env.NEXT_PUBLIC_CIC_PORTAL_URL || "https://portal.cic.com.vn"}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
          >
            <span>Portal</span>
          </Link>
          <Link href="/lien-he" className="hidden md:block">
            <Button size="sm" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-5 glow-accent">
              Liên hệ tư vấn
            </Button>
          </Link>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <nav className="container max-w-screen-xl mx-auto px-4 py-4 space-y-1">
              {items.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2.5 text-sm font-medium text-foreground hover:text-accent rounded-lg hover:bg-muted/50 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="pl-4 space-y-0.5">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/30 transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 border-t border-border/50">
                <Link href="/lien-he" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                    Liên hệ tư vấn
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
