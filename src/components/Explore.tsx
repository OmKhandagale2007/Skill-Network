import { motion } from 'framer-motion'
import { Trophy, BookOpen, GraduationCap, Briefcase, Users2 } from 'lucide-react'

const categories = [
  {
    icon: Trophy,
    title: 'Hackathon Teammates',
    description: 'Find devs, designers, and ML experts for your next 48-hour sprint.',
    count: '34 active teams',
    gradient: 'from-amber-500 to-orange-600',
    glow: 'shadow-amber-500/20',
  },
  {
    icon: BookOpen,
    title: 'Study Groups',
    description: 'Match with students taking the same courses who complement your learning style.',
    count: '89 groups forming',
    gradient: 'from-blue-500 to-indigo-600',
    glow: 'shadow-blue-500/20',
  },
  {
    icon: GraduationCap,
    title: 'Mentors',
    description: "Connect with seniors and alumni who've walked your path before.",
    count: '56 mentors available',
    gradient: 'from-purple-500 to-violet-600',
    glow: 'shadow-purple-500/20',
  },
  {
    icon: Briefcase,
    title: 'Internships',
    description: 'Discover opportunities shared by peers and campus placement cells.',
    count: '23 openings',
    gradient: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/20',
  },
  {
    icon: Users2,
    title: 'Clubs & Communities',
    description: 'Find clubs that align with your skills and interests — coding, design, AI, and more.',
    count: '45 clubs',
    gradient: 'from-pink-500 to-rose-600',
    glow: 'shadow-pink-500/20',
  },
]

export default function Explore() {
  return (
    <section id="explore" className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-cyan-400 uppercase tracking-wider">Explore</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            One network, <span className="gradient-text">endless connections</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Skill Network understands your profile and automatically suggests opportunities across campus.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`group p-6 rounded-2xl glass gradient-border cursor-pointer hover:bg-white/5 transition-all shadow-lg ${cat.glow} ${
                i === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                <cat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{cat.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">{cat.description}</p>
              <span className="text-xs font-medium text-zinc-500 group-hover:text-indigo-400 transition-colors">
                {cat.count} →
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
