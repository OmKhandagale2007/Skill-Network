import type { UserProfile } from '../types'

export interface MatchResult {
  user: UserProfile
  score: number
  matchedSkills: string[]
}

const STOPWORDS = new Set([
  'need', 'a', 'an', 'for', 'the', 'want', 'looking', 'to', 'with', 'who',
  'someone', 'help', 'me', 'find', 'i', 'and', 'or', 'of', 'in', 'on',
])

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+.# ]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))
}

/**
 * Scores every registered user against a free-text request like
 * "need a frontend developer for hackathon" by overlapping tokens
 * from the request with each user's skills, bio, and "looking for" text.
 * This runs entirely client-side against people who have signed up —
 * there's no real backend, so it can't search LinkedIn/GitHub globally,
 * only match within users who've joined and connected their GitHub.
 */
export function findMatches(query: string, users: UserProfile[], excludeId?: string): MatchResult[] {
  const tokens = tokenize(query)
  if (tokens.length === 0) return []

  return users
    .filter((u) => u.id !== excludeId)
    .map((user) => {
      const skillTokens = user.skills.flatMap((s) => tokenize(s))
      const bioTokens = tokenize(user.bio)
      const lookingTokens = tokenize(user.lookingFor)

      const matchedSkills = user.skills.filter((skill) =>
        tokens.some((t) => skill.toLowerCase().includes(t) || t.includes(skill.toLowerCase()))
      )

      let score = 0
      score += matchedSkills.length * 30
      score += tokens.filter((t) => skillTokens.includes(t)).length * 10
      score += tokens.filter((t) => bioTokens.includes(t)).length * 8
      score += tokens.filter((t) => lookingTokens.includes(t)).length * 4

      return { user, score, matchedSkills }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
}
