'use client';
import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, Check, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('ialirezamp@gmail.com')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isValidEmail = email.includes('@') && email.includes('.')

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setIsLoading(true)
    setError('')
    try {
      setTimeout(() => {
        setIsLoading(false)
        console.log('Login attempt:', { email, password })
      }, 1500)
    } catch (err) {
      setError('Invalid credentials')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex text-sm font-medium">
      {/* Left Section */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 md:px-12 relative">
        <div className="w-full max-w-sm space-y-6 relative z-10">
          {/* <div className="flex items-center space-x-2 mb-8">
            <div className="relative w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rotate-45 rounded-lg shadow-lg">
              <div className="absolute inset-0 w-full h-full bg-white rotate-45 rounded-lg shadow-inner scale-75"></div>
            </div>
            <span className="text-xl font-semibold text-gray-800">CMS</span>
          </div> */}

          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your dashboard</p>
          </div>

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block mb-1 text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-10 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50 hover:bg-white focus:bg-white outline-none transition"
                />
                <div className="absolute right-3 top-3">
                  {isValidEmail ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : email && (
                    <AlertCircle className="h-4 w-4 text-red-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50 hover:bg-white focus:bg-white outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading || !email || !password}
              className="w-full py-2.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : 'Continue'}
            </button>

            {/* Extra Options */}
            <div className="flex justify-between items-center text-gray-500 text-xs">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-500" />
                Remember me
              </label>
              <button className="text-blue-600 hover:underline">Forgot password?</button>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <div className="h-px flex-1 bg-gray-200"></div>
            <span>Or continue with</span>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-3 gap-2">
  {/* Google */}
  <button className="flex items-center justify-center py-2.5 border border-gray-200 rounded hover:bg-gray-50 group">
    <svg className="w-5 h-5 group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  </button>

  {/* Apple */}
  <button className="flex items-center justify-center py-2.5 border border-gray-200 rounded hover:bg-gray-50 group">
    <svg className="w-5 h-5 group-hover:scale-105 transition-transform" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  </button>

  {/* Facebook */}
  <button className="flex items-center justify-center py-2.5 border border-gray-200 rounded hover:bg-gray-50 group">
    <svg className="w-5 h-5 group-hover:scale-105 transition-transform" fill="#1877F2" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  </button>
</div>


          {/* Sign up */}
          <p className="text-center text-xs text-gray-500">
            Don't have an account? <button className="text-blue-600 hover:underline font-medium">Sign up</button>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:block flex-1 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center px-12 text-center text-white/80">
          <div className="space-y-4 max-w-sm">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-lg"></div>
            </div>
            <h2 className="text-xl font-semibold">Secure Access</h2>
            <p className="text-sm text-white/60 leading-relaxed">
              Your data is protected with enterprise-grade security. Access your dashboard with confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
