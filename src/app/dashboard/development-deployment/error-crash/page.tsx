'use client'

import {
  AlertTriangle,
  Bug,
  ServerCrash,
  MonitorSmartphone,
  Clock,
  Globe,
  Circle,
  CheckCircle
} from 'lucide-react'

const errors = [
  {
    type: 'Backend',
    env: 'production',
    error: 'MongoError: connection timed out',
    status: 'open',
    timestamp: '2025-06-30T21:55:00Z',
  },
  {
    type: 'Frontend',
    env: 'staging',
    error: 'TypeError: Cannot read properties of undefined (reading "map")',
    status: 'resolved',
    timestamp: '2025-06-30T17:12:00Z',
  },
  {
    type: 'Backend',
    env: 'dev',
    error: 'UnhandledPromiseRejectionWarning: Redis unavailable',
    status: 'open',
    timestamp: '2025-06-30T15:45:00Z',
  },
]

function timeAgo(isoTime: string) {
  const diff = Math.floor((Date.now() - new Date(isoTime).getTime()) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

const getStatusBadge = (status: string) => {
  const base = 'inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border'
  switch (status) {
    case 'open':
      return `${base} bg-red-100 text-red-800 border-red-300`
    case 'resolved':
      return `${base} bg-green-100 text-green-800 border-green-300`
    default:
      return base
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'open':
      return <Circle className="w-4 h-4" />
    case 'resolved':
      return <CheckCircle className="w-4 h-4" />
    default:
      return null
  }
}

export default function ErrorCrashPage() {
  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-5xl space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Error & Crash Reports</h1>
            <p className="text-sm text-gray-600 mt-1">
              Track recent crashes, exceptions, and runtime errors
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {errors.map((err, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm space-y-3 hover:shadow transition-all"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-lg font-semibold text-gray-900">
                  {err.type === 'Backend' ? (
                    <ServerCrash className="text-red-500" />
                  ) : (
                    <MonitorSmartphone className="text-blue-500" />
                  )}
                  {err.type}
                </div>
                <span className={getStatusBadge(err.status)}>
                  {getStatusIcon(err.status)}
                  {err.status.charAt(0).toUpperCase() + err.status.slice(1)}
                </span>
              </div>

              <div className="text-sm text-gray-700 space-y-1">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                  <span className="line-clamp-2">{err.error}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  Environment: <strong>{err.env}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {timeAgo(err.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
