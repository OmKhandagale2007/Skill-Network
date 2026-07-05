import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Send, Loader2, CheckCircle2, Code2, Link2, Mail, ExternalLink } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { findMatches, type MatchResult } from '../lib/matching'
import { fetchGitHubProfile, type GitHubProfile } from '../lib/github'

const exampleQueries = [
  'Need a frontend developer for hackathon',
  'Looking for an ML expert for a research project',
  'Want a UI/UX designer for a startup MVP',
  'Need DevOps help for deployment',
]

export default function MatchFinder() {
  const { currentUser, users } = useAuth()
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<MatchResult[]>([])
  const [githubData, setGithubData] = useState<Record<string, GitHubProfile | null>>({})
  const [searched, setSearched] = useState(false)

  const handleSearch = async (searchQuery?: string) => {
    const q = searchQuery ?? query
    if (!q.trim()) return
    setQuery(q)
    setLoading(true)
    setSearched(true)

    const matches = findMatches(q, users, currentUser?.id)
    setResults(matches)

    const profiles = await Promise.all(
      matches.map(async (m) => [m.user.github, await fetchGitHubProfile(m.user.github)] as const)
    )
    setGithubData(Object.fromEntries(profiles))
    setLoading(false)
  }

  return (
    <section id="ai-match" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered Matching
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tell us what you <span className="gradient-text">need</span>
          </h2>
          <p className="text-zinc-400">
            Type your request — we search everyone who's joined Skill Network and pull in live GitHub
            data to find your best match.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-3xl p-6 md:p-8 glow gradient-border"
        >
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder='e.g. "Need a frontend developer for hackathon"'
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white font-medium transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              <span className="hidden sm:inline">Match</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {exampleQueries.map((ex) => (
              <button
                key={ex}
                onClick={() => handleSearch(ex)}
                className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-12 gap-4"
              >
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                      className="w-3 h-3 rounded-full bg-indigo-500"
                    />
                  ))}
                </div>
                <p className="text-sm text-zinc-400">Searching profiles & checking GitHub activity...</p>
              </motion.div>
            )}

            {!loading && searched && results.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-10 text-zinc-500 text-sm"
              >
                No matches yet — as more people join Skill Network, results get better. Try different wording.
              </motion.div>
            )}

            {!loading && searched && results.length > 0 && (
              <motion.div key="results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-emerald-400 mb-4">
                  <CheckCircle2 className="w-4 h-4" />
                  Found {results.length} match{results.length > 1 ? 'es' : ''} for your request
                </div>
                {results.map((match, i) => {
                  const gh = githubData[match.user.github]
                  return (
                    <motion.div
                      key={match.user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="p-4 rounded-2xl bg-white/3 hover:bg-white/6 border border-white/5 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative shrink-0">
                          {gh?.avatar_url ? (
                            <img
                              src={gh.avatar_url}
                              alt={match.user.name}
                              className="w-12 h-12 rounded-xl object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-sm">
                              {match.user.avatar}
                            </div>
                          )}
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-bold">
                            {i + 1}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold">{match.user.name}</h4>
                            {gh && (
                              <span className="text-xs text-zinc-500 flex items-center gap-1">
                                <Code2 className="w-3 h-3" /> @{gh.login} · {gh.public_repos} repos
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {match.user.skills.slice(0, 4).map((skill) => (
                              <span
                                key={skill}
                                className={`text-xs px-2 py-0.5 rounded-md ${
                                  match.matchedSkills.includes(skill)
                                    ? 'bg-emerald-500/15 text-emerald-300'
                                    : 'bg-indigo-500/10 text-indigo-300'
                                }`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-2xl font-bold gradient-text">{Math.min(match.score, 99)}%</div>
                          <div className="text-xs text-zinc-500">match</div>
                        </div>
                      </div>

                      {gh?.bio && <p className="text-sm text-zinc-400 mt-3 pl-16">{gh.bio}</p>}

                      <div className="flex flex-wrap gap-2 mt-3 pl-16">
                        <a
                          href={`mailto:${match.user.email}`}
                          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                        >
                          <Mail className="w-3 h-3" /> Reach out
                        </a>
                        {gh?.html_url && (
                          <a
                            href={gh.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                          >
                            <Code2 className="w-3 h-3" /> GitHub <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                        {match.user.linkedin && (
                          <a
                            href={
                              match.user.linkedin.startsWith('http')
                                ? match.user.linkedin
                                : `https://${match.user.linkedin}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                          >
                            <Link2 className="w-3 h-3" /> LinkedIn <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
