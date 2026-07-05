import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Share2, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#ai-match', label: 'AI Match' },
  { href: '#explore', label: 'Explore' },
  { href: '#profiles', label: 'Profiles' },
]

export default function Navbar() {
  const { currentUser, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-strong py-3' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-orange-500 flex items-center justify-center glow">
            <Share2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Skill <span className="gradient-text">Network</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 hover:text-white transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-orange-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {currentUser ? (
            <>
              <span className="text-sm text-zinc-300">
                Hey, <span className="font-medium text-white">{currentUser.name.split(' ')[0]}</span>
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 px-4 py-2 text-sm text-zinc-300 hover:text-white transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" /> Log out
              </button>
            </>
          ) : (
            <a
              href="#join"
              className="px-5 py-2.5 text-sm font-medium rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white transition-all shadow-lg shadow-teal-500/25"
            >
              Sign Up / Log In
            </a>
          )}
        </div>

        <button
          className="md:hidden p-2 text-zinc-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong mx-4 mt-2 rounded-2xl overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              {currentUser ? (
                <button
                  onClick={() => {
                    logout()
                    setMobileOpen(false)
                  }}
                  className="mt-2 px-5 py-3 rounded-xl bg-white/5 text-zinc-200 font-medium flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Log out
                </button>
              ) : (
                <a
                  href="#join"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium text-center"
                >
                  Sign Up / Log In
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
