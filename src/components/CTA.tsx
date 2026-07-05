import { motion } from 'framer-motion'
import { Sparkles, Globe, MessageCircle, Mail } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-28">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center glow gradient-border"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-cyan-600/20" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/20 rounded-full blur-[60px]" />

          <div className="relative">
            <Sparkles className="w-8 h-8 text-indigo-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Start in your college.
              <br />
              <span className="gradient-text">Scale to thousands.</span>
            </h2>
            <p className="text-zinc-400 max-w-lg mx-auto mb-8">
              Skill Network begins on your campus and grows into a network connecting students across colleges nationwide.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white font-semibold transition-all shadow-xl shadow-indigo-500/30 hover:scale-[1.02]">
                Launch at Your College
              </button>
              <button className="px-8 py-4 rounded-2xl glass hover:bg-white/8 text-white font-semibold transition-all">
                Request Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold">
              Skill <span className="gradient-text">Network</span>
            </span>
          </div>

          <p className="text-sm text-zinc-500">
            Student Skill Exchange Network — Built for campuses, powered by AI.
          </p>

          <div className="flex items-center gap-4">
            {[Globe, MessageCircle, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center text-xs text-zinc-600">
          © 2026 Skill Network. Connecting students through skills.
        </div>
      </div>
    </footer>
  )
}
