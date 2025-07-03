'use client'

import { HeartPulse, Server, HardDrive, Activity, AlertCircle, Loader2 } from 'lucide-react'

import { useState, useEffect } from 'react'
import axios from '@/lib/axios'

interface HealthCheck {
  name: string
  status: 'healthy' | 'degraded' | 'offline'
  responseTime: string
  uptime: string
  icon: any
}

const defaultHealthChecks: HealthCheck[] = [
  {
    name: 'API Server',
    status: 'offline',
    responseTime: '--',
    uptime: '--',
    icon: Server,
  },
  {
    name: 'Database',
    status: 'offline',
    responseTime: '--',
    uptime: '--',
    icon: HardDrive,
  },
  {
    name: 'Authentication Service',
    status: 'offline',
    responseTime: '--',
    uptime: '--',
    icon: Activity,
  },
  {
    name: 'Redis Cache',
    status: 'offline',
    responseTime: '--',
    uptime: '--',
    icon: AlertCircle,
  }
]

export default function HealthCheckPage() {
  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>(defaultHealthChecks)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
  const fetchHealthStatus = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get('/health')
      const healthData = response.data

      setHealthChecks([
        {
          name: 'API Server',
          status: healthData.api.status,
          responseTime: `${healthData.api.responseTime}ms`,
          uptime: healthData.api.uptime,
          icon: Server,
        },
        {
          name: 'Database',
          status: healthData.database.status,
          responseTime: `${healthData.database.responseTime}ms`,
          uptime: healthData.database.uptime,
          icon: HardDrive,
        },
        {
          name: 'Authentication Service',
          status: healthData.auth.status,
          responseTime: `${healthData.auth.responseTime}ms`,
          uptime: healthData.auth.uptime,
          icon: Activity,
        },
        {
          name: 'Redis Cache',
          status: healthData.cache.status,
          responseTime: `${healthData.cache.responseTime}ms`,
          uptime: healthData.cache.uptime,
          icon: AlertCircle,
        }
      ])
    } catch (error) {
      console.error('Failed to fetch health status:', error)
      setHealthChecks(defaultHealthChecks)
    } finally {
      setIsLoading(false)
    }
  }

  fetchHealthStatus()
  const interval = setInterval(fetchHealthStatus, 30000) // Refresh every 30 seconds

  return () => clearInterval(interval)
  }, [])

  const getStatusClass = (status: string) => {
  switch (status) {
    case 'healthy':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'degraded':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'offline':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">System Health Check</h1>
            <p className="text-gray-600 text-sm mt-1">Monitor the real-time health status of critical services</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthChecks.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                  <service.icon size={24} className="text-blue-600" />
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusClass(service.status)}`}
                >
                  {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
              <div className="text-sm text-gray-600">
                <p>Response Time: <span className="font-medium text-gray-800">{service.responseTime}</span></p>
                <p>Uptime: <span className="font-medium text-gray-800">{service.uptime}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
