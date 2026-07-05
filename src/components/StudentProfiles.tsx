import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Link2, Mail } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { fetchGitHubProfile, type GitHubProfile } from '../lib/github'
import type { UserProfile } from '../types'

function ProfileAvatar({ user }: { user: UserProfile }) {
  const [gh, setGh] = useState<GitHubProfile | null>(null)

  useEffect(() => {
    let active = true
    fetchGitHubProfile(user.github).then((data) => {
      if (active) setGh(data)
    })
    return () => {
      active = false
    }
  }, [user.github])

  if (gh?.avatar_url) {
    return <img src={gh.avatar_url} alt={user.name} className="w-14 h-14 rounded-2xl object-cover shadow-lg" />
  }

  return (
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
      {user.avatar}
    </div>
  )
}

export default function StudentProfiles() {
  const { users, currentUser } = useAuth()
  const others = users.filter((u) => u.id !== currentUser?.id)

  return (
    <section id="profiles" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/15 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-sm font-medium text-pink-400 uppercase tracking-wider">Network Profiles</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              Meet your <span className="gradient-text">future teammates</span>
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md text-sm">
            Everyone here connected their GitHub and listed what they're looking for — reach out directly.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {others.map((user, i) => (
            <motion.article
              key={user.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="group p-6 rounded-2xl glass gradient-border hover:bg-white/5 transition-all duration-300"
            >
              <div className="flex items-start gap-3 mb-4">
                <ProfileAvatar user={user} />
                <div className="min-w-0">
                  <h3 className="font-semibold text-lg truncate">{user.name}</h3>
                  <p className="text-xs text-zinc-500 flex items-center gap-1 truncate">
                    <Code2 className="w-3 h-3 shrink-0" /> @{user.github}
                  </p>
                </div>
              </div>

              {user.bio && <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{user.bio}</p>}

              <div className="flex flex-wrap gap-1.5 mb-4">
                {user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-zinc-300 border border-white/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {user.lookingFor && (
                <p className="text-xs text-indigo-300 mb-5">
                  <span className="text-zinc-500">Looking for:</span> {user.lookingFor}
                </p>
              )}

              <div className="flex gap-2">
                <a
                  href={`mailto:${user.email}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-indigo-500/20 text-sm text-zinc-300 hover:text-white border border-white/5 hover:border-indigo-500/30 transition-all"
                >
                  <Mail className="w-3.5 h-3.5" /> Reach out
                </a>
                <a
                  href={`https://github.com/${user.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/5 transition-all"
                >
                  <Code2 className="w-3.5 h-3.5" />
                </a>
                {user.linkedin && (
                  <a
                    href={user.linkedin.startsWith('http') ? user.linkedin : `https://${user.linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/5 transition-all"
                  >
                    <Link2 className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
