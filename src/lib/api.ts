import type { UserProfile } from '../types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export class ApiError extends Error {}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers ?? {}),
      },
    })
  } catch {
    throw new ApiError('Could not reach the server. Is the backend running?')
  }

  if (!res.ok) {
    let message = 'Something went wrong.'
    try {
      const body = await res.json()
      if (typeof body.detail === 'string') message = body.detail
      else if (Array.isArray(body.detail) && body.detail[0]?.msg) message = body.detail[0].msg
    } catch {
      // ignore parse failure, use default message
    }
    throw new ApiError(message)
  }

  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

export interface SignUpPayload {
  name: string
  email: string
  password: string
  bio: string
  skills: string[]
  lookingFor: string
  github: string
  linkedin?: string
  college?: string
}

interface TokenResponse {
  token: string
  user: UserProfile
}

export function signupRequest(data: SignUpPayload): Promise<TokenResponse> {
  return request<TokenResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function loginRequest(email: string, password: string): Promise<TokenResponse> {
  return request<TokenResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export function fetchMe(token: string): Promise<UserProfile> {
  return request<UserProfile>('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export function fetchUsers(): Promise<UserProfile[]> {
  return request<UserProfile[]>('/users')
}
