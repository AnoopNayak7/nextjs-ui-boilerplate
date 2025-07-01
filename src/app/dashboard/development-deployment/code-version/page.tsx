'use client'

import {
  GitBranch,
  Server,
  TerminalSquare,
  UploadCloud,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
} from 'lucide-react'

const deployments = [
  {
    type: 'Backend',
    commitHash: 'a2c4e19',
    branch: 'main',
    status: 'success',
    deployedAt: '2025-06-29T10:12:00Z',
  },
  {
    type: 'Frontend',
    commitHash: 'bf91ec2',
    branch: 'main',
    status: 'checking',
    deployedAt: '2025-06-29T10:13:00Z',
  },
]

const statusBadge = (status: string) => {
  switch (status) {
    case 'success':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-100 text-green-800 border border-green-200 px-2 py-1 rounded-full">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Deployed
        </span>
      )
    case 'failed':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium bg-red-100 text-red-800 border border-red-200 px-2 py-1 rounded-full">
          <XCircle className="w-3.5 h-3.5" />
          Failed
        </span>
      )
    case 'checking':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 px-2 py-1 rounded-full">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          Checking
        </span>
      )
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

export default function CodeVersionPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Code Versions & Deployment</h1>
            <p className="text-gray-600 text-sm mt-1">Track recent deployments and code versions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {deployments.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow hover:shadow-md transition-all space-y-4"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {item.type === 'Backend' ? (
                    <Server className="text-indigo-600" size={24} />
                  ) : (
                    <TerminalSquare className="text-rose-600" size={24} />
                  )}
                  <h3 className="text-lg font-semibold text-gray-900">{item.type}</h3>
                </div>
                {statusBadge(item.status)}
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-gray-400" />
                  Branch: <span className="font-medium text-gray-900">{item.branch}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-gray-400" />
                  Commit: <span className="font-mono text-gray-900">{item.commitHash}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  Last Deployed: <span>{timeAgo(item.deployedAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
