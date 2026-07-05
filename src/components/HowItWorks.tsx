import { motion } from 'framer-motion'
import { UserPlus, Brain, Handshake, Rocket } from 'lucide-react'

const steps = [
  {
    icon: UserPlus,
    step: '01',
    title: 'Create Your Skill Profile',
    description:
      'Add your skills, projects, clubs, interests, and achievements. Your profile becomes your campus identity.',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: Brain,
    step: '02',
    title: 'AI Understands Your Graph',
    description:
      'Our AI maps your skills to opportunities — hackathons, study groups, mentors, internships, and clubs.',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: Handshake,
    step: '03',
    title: 'Get Smart Recommendations',
    description:
      'Post what you need — "Need a frontend dev for hackathon" — and get matched with the best teammates instantly.',
    color: 'from-pink-500 to-pink-600',
  },
  {
    icon: Rocket,
    step: '04',
    title: 'Build & Grow Together',
    description:
      'Form teams, join clubs, find mentors. Every student is connected in a living profile graph.',
    color: 'from-emerald-500 to-emerald-600',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-indigo-400 uppercase tracking-wider">How it works</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            From skills to <span className="gradient-text">squad</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Four simple steps to find the people who complement your skills on campus.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-6 rounded-2xl glass gradient-border hover:bg-white/5 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-mono text-zinc-600">{item.step}</span>
              <h3 className="text-lg font-semibold mt-1 mb-3">{item.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
