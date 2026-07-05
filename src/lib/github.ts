export interface GitHubProfile {
  login: string
  name: string | null
  bio: string | null
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
  company: string | null
  location: string | null
}

const cache = new Map<string, GitHubProfile | null>()

/**
 * Fetches a public GitHub profile via the unauthenticated REST API.
 * Returns null on any failure (rate limit, 404, network error, etc.) —
 * callers should treat a null result as "no live data available" and
 * fall back to the user's own profile info.
 */
export async function fetchGitHubProfile(username: string): Promise<GitHubProfile | null> {
  const clean = username.trim().replace(/^@/, '').replace(/^https?:\/\/github\.com\//i, '')
  if (!clean) return null
  if (cache.has(clean)) return cache.get(clean) ?? null

  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(clean)}`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!res.ok) {
      cache.set(clean, null)
      return null
    }
    const data = (await res.json()) as GitHubProfile
    cache.set(clean, data)
    return data
  } catch {
    cache.set(clean, null)
    return null
  }
}
