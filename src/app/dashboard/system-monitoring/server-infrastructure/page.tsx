'use client'

import {
  Server,
  Cloud,
  Activity,
  AlertCircle,
  Cpu,
  MonitorCheck,
  CheckCircle2,
  XCircle,
  Loader2,
  Workflow,
  Database,
} from 'lucide-react'

const services = [
  {
    name: 'API Gateway',
    type: 'Routing Layer',
    status: 'operational',
    icon: Cloud,
  },
  {
    name: 'Lambda (Node.js + Express)',
    type: 'App Runtime',
    status: 'operational',
    icon: Workflow,
  },
  {
    name: 'CloudWatch',
    type: 'Monitoring',
    status: 'operational',
    icon: MonitorCheck,
  },
  {
    name: 'DynamoDB',
    type: 'Database',
    status: 'operational',
    icon: Database,
  },
  {
    name: 'S3 (for logs/assets)',
    type: 'Storage',
    status: 'degraded',
    icon: Server,
  },
]

const statusBadge = (status: string) => {
  switch (status) {
    case 'operational':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-100 text-green-800 border border-green-200 px-2 py-1 rounded-full">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Operational
        </span>
      )
    case 'degraded':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200 px-2 py-1 rounded-full">
          <AlertCircle className="w-3.5 h-3.5" />
          Degraded
        </span>
      )
    case 'error':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium bg-red-100 text-red-800 border border-red-200 px-2 py-1 rounded-full">
          <XCircle className="w-3.5 h-3.5" />
          Error
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

export default function ServerInfrastructurePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Serverless Infrastructure</h1>
            <p className="text-gray-600 text-sm mt-1">Overview of your deployed services on AWS</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl">
                  <service.icon size={24} className="text-indigo-600" />
                </div>
                {statusBadge(service.status)}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
              <p className="text-sm text-gray-600">{service.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
