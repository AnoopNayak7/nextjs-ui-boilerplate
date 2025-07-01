'use client'

import {
  Server,
  TerminalSquare,
  UserCircle,
  CheckCircle2,
  XCircle,
  Loader2,
  Globe,
  Clock,
  GitBranch,
} from 'lucide-react'

const deployments = [
  {
    type: 'Backend',
    env: 'staging',
    status: 'success',
    deployedBy: 'dev.anoop',
    time: '2025-06-30T17:02:00Z',
    branch: 'main',
  },
  {
    type: 'Frontend',
    env: 'production',
    status: 'failed',
    deployedBy: 'ci-bot',
    time: '2025-06-30T14:55:00Z',
    branch: 'release',
  },
  {
    type: 'Backend',
    env: 'dev',
    status: 'in-progress',
    deployedBy: 'dev.shreya',
    time: '2025-06-30T18:35:00Z',
    branch: 'feature/login-refactor',
  },
]

const getStatusStyle = (status: string) => {
  const base = 'inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border'
  switch (status) {
    case 'success':
      return `${base} bg-green-100 text-green-800 border-green-300`
    case 'failed':
      return `${base} bg-red-100 text-red-800 border-red-300`
    case 'in-progress':
      return `${base} bg-blue-100 text-blue-800 border-blue-300 animate-pulse`
    default:
      return base
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'success':
      return <CheckCircle2 className="w-4 h-4" />
    case 'failed':
      return <XCircle className="w-4 h-4" />
    case 'in-progress':
      return <Loader2 className="w-4 h-4 animate-spin" />
    default:
      return null
  }
}

function timeAgo(isoTime: string) {
  const diff = Math.floor((Date.now() - new Date(isoTime).getTime()) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function DeployStatusPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Deployment Status</h1>
          <p className="text-sm text-gray-600 mt-1">Recent backend & frontend deployment history</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deployments.map((deploy, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow transition-all space-y-3"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-gray-900 font-semibold text-lg">
                  {deploy.type === 'Backend' ? (
                    <Server className="text-indigo-600" />
                  ) : (
                    <TerminalSquare className="text-pink-600" />
                  )}
                  {deploy.type}
                </div>
                <span className={getStatusStyle(deploy.status)}>
                  {getStatusIcon(deploy.status)}
                  {deploy.status.charAt(0).toUpperCase() + deploy.status.slice(1)}
                </span>
              </div>

              <div className="text-sm text-gray-700 space-y-1">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  Environment: <strong>{deploy.env}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-gray-400" />
                  Branch: <code className="font-mono">{deploy.branch}</code>
                </div>
                <div className="flex items-center gap-2">
                  <UserCircle className="w-4 h-4 text-gray-400" />
                  Deployed By: <span>{deploy.deployedBy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {timeAgo(deploy.time)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
