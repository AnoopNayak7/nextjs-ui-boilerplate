'use client'

import { createContext, useContext, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { User } from '@/types/user'
import { getCookie } from 'cookies-next'
import { authApi } from '@/lib/api'

type AuthContextType = {
  user: any
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { 
    user, 
    isLoading, 
    error,
    login: storeLogin, 
    logout: storeLogout, 
    setUser,
    setError
  } = useAuthStore()

  useEffect(() => {
    // Check if token exists in cookies
    const token = getCookie('auth_token') as string | undefined
    
    if (!token) {
      useAuthStore.setState({ isLoading: false })
      return
    }

    // Fetch current user data
    const fetchCurrentUser = async () => {
      try {
        const userData = await authApi.getCurrentUser()
        setUser(userData)
      } catch (error) {
        console.error('Failed to fetch user data:', error)
        // If API call fails, clear token
        storeLogout()
      } finally {
        useAuthStore.setState({ isLoading: false })
      }
    }

    fetchCurrentUser()
  }, [setUser, storeLogout]) // Add dependencies

  const login = async (email: string, password: string) => {
    setError(null)
    return storeLogin(email, password)
  }

  const logout = async () => {
    await storeLogout()
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}