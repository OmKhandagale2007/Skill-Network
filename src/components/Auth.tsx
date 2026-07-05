import { useState, type FormEvent, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { UserPlus, LogIn, Code2, Link2, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  icon,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  icon?: ReactNode
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1.5">
        {icon}
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
      />
    </div>
  )
}

export default function Auth() {
  const { signUp, login } = useAuth()
  const [mode, setMode] = useState<'signup' | 'login'>('signup')
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [bio, setBio] = useState('')
  const [skillsInput, setSkillsInput] = useState('')
  const [github, setGithub] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [lookingFor, setLookingFor] = useState('')

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    const skills = skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    if (!name.trim() || !email.trim() || !password || !github.trim() || skills.length === 0) {
      setError('Please fill in your name, email, password, GitHub username, and at least one skill.')
      return
    }

    setSubmitting(true)
    const result = await signUp({
      name: name.trim(),
      email: email.trim(),
      password,
      bio: bio.trim(),
      skills,
      github: github.trim(),
      linkedin: linkedin.trim(),
      lookingFor: lookingFor.trim(),
      college: '',
    })
    setSubmitting(false)
    if (!result.ok) setError(result.error ?? 'Something went wrong.')
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const result = await login(loginEmail, loginPassword)
    setSubmitting(false)
    if (!result.ok) setError(result.error ?? 'Something went wrong.')
  }

  return (
    <section id="join" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent pointer-events-none" />

      <div className="max-w-xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            Join Skill Network
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {mode === 'signup' ? (
              <>
                Create your <span className="gradient-text">profile</span>
              </>
            ) : (
              <>
                Welcome <span className="gradient-text">back</span>
              </>
            )}
          </h2>
          <p className="text-zinc-400">
            {mode === 'signup'
              ? 'Add your skills and GitHub so the right people can find you — and you can find them.'
              : 'Log in to search for teammates and see who matches what you need.'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-3xl p-6 md:p-8 glow gradient-border"
        >
          <div className="flex gap-2 mb-6 p-1 rounded-2xl bg-white/5">
            <button
              onClick={() => {
                setMode('signup')
                setError('')
              }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                mode === 'signup' ? 'bg-indigo-500 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-4 h-4" /> Sign Up
            </button>
            <button
              onClick={() => {
                setMode('login')
                setError('')
              }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                mode === 'login' ? 'bg-indigo-500 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LogIn className="w-4 h-4" /> Log In
            </button>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
              {error}
            </div>
          )}

          {mode === 'signup' ? (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Full name" value={name} onChange={setName} placeholder="Priya Sharma" />
                <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@college.edu" />
              </div>
              <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="Create a password" />
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="GitHub username"
                  value={github}
                  onChange={setGithub}
                  placeholder="octocat"
                  icon={<Code2 className="w-3.5 h-3.5" />}
                />
                <Field
                  label="LinkedIn URL (optional)"
                  value={linkedin}
                  onChange={setLinkedin}
                  placeholder="linkedin.com/in/you"
                  icon={<Link2 className="w-3.5 h-3.5" />}
                />
              </div>
              <Field
                label="Skills (comma separated)"
                value={skillsInput}
                onChange={setSkillsInput}
                placeholder="React, Python, Figma"
              />
              <Field
                label="What are you looking for?"
                value={lookingFor}
                onChange={setLookingFor}
                placeholder="Hackathon teammates, mentors, internship leads..."
              />
              <div>
                <label className="block text-xs text-zinc-500 mb-1.5">Short bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  placeholder="Tell others what you're about..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white font-semibold transition-all shadow-xl shadow-indigo-500/30 disabled:opacity-50"
              >
                {submitting ? 'Creating profile...' : 'Create profile & enter Skill Network'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <Field label="Email" type="email" value={loginEmail} onChange={setLoginEmail} placeholder="you@college.edu" />
              <Field label="Password" type="password" value={loginPassword} onChange={setLoginPassword} placeholder="Your password" />
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white font-semibold transition-all shadow-xl shadow-indigo-500/30 disabled:opacity-50"
              >
                {submitting ? 'Logging in...' : 'Log in'}
              </button>
              <p className="text-xs text-zinc-500 text-center">
                Demo tip: try <span className="text-zinc-300">priya@example.edu</span> /{' '}
                <span className="text-zinc-300">demo1234</span>
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
