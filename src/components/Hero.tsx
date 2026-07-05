import { motion } from 'framer-motion'
import { ArrowRight, Users, Zap, Atom } from 'lucide-react'
import SkillNucleus3D from './SkillNucleus3D'
import { useAuth } from '../context/AuthContext'

export default function Hero() {
  const { currentUser } = useAuth()

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-950/20 via-[#0a0a0f] to-orange-950/15" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-orange-500/8 rounded-full blur-[140px]" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px]" />

      {/* 3D nucleus — right side on desktop, centered behind on mobile */}
      <div className="absolute inset-0 md:left-[30%] opacity-80 md:opacity-100">
        <SkillNucleus3D />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-zinc-300 mb-8"
          >
            <Atom className="w-4 h-4 text-orange-400" />
            Your skills orbit around you — find who needs them
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
          >
            <span className="gradient-text">Skill</span> Network
            <br />
            <span className="text-3xl md:text-5xl font-bold text-zinc-300">for your campus</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-10"
          >
            Sign up, add your skills and GitHub, and say what you're looking for. Skill Network's AI
            searches everyone who's joined to find your perfect match — then you reach out directly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            {currentUser ? (
              <a
                href="#ai-match"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-semibold transition-all shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02]"
              >
                Try AI Match
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            ) : (
              <a
                href="#join"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-semibold transition-all shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02]"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            )}
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl glass hover:bg-white/8 text-white font-semibold transition-all"
            >
              How It Works
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 max-w-lg"
          >
            {[
              { icon: Users, value: '2,400+', label: 'Students' },
              { icon: Zap, value: '850+', label: 'Skills Listed' },
              { icon: Atom, value: '120+', label: 'Teams Formed' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center md:text-left">
                <Icon className="w-5 h-5 text-teal-400 mb-2 mx-auto md:mx-0" />
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-xs text-zinc-500">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
