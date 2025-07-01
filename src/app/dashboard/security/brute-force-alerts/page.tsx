'use client'

import { useEffect, useState } from 'react'
import {
  ShieldAlert,
  TimerReset,
  Globe,
  Ban,
  EyeOff,
  Mail,
  PhoneCall,
} from 'lucide-react'

type Alert = {
  timestamp: string
  ip: string
  location: string
  identifier?: string // email or phone
  identifierType?: 'email' | 'phone'
  attempts: number
  status: 'blocked' | 'suspicious'
}

export default function BruteForceAlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(false)

  const fetchAlerts = async () => {
    setLoading(true)
    try {
      // Simulate alert fetch
      await new Promise((r) => setTimeout(r, 600))
      const fake: Alert[] = [
        {
          timestamp: new Date().toISOString(),
          ip: '203.0.113.10',
          location: 'Mumbai, India',
          identifier: 'user@example.com',
          identifierType: 'email',
          attempts: 11,
          status: 'suspicious',
        },
        {
          timestamp: new Date().toISOString(),
          ip: '198.51.100.22',
          location: 'Berlin, Germany',
          identifier: '+49123456789',
          identifierType: 'phone',
          attempts: 32,
          status: 'blocked',
        },
        {
          timestamp: new Date().toISOString(),
          ip: '192.0.2.33',
          location: 'Delhi, India',
          attempts: 7,
          status: 'suspicious',
        },
      ]
      setAlerts(fake)
    } catch (err) {
      console.error('Error fetching alerts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAlerts()
  }, [])

  const statusBadge = (status: Alert['status']) => {
    const base = 'text-xs px-2 py-0.5 rounded-full font-semibold'
    if (status === 'blocked') return <span className={`${base} bg-red-100 text-red-700`}>Blocked</span>
    return <span className={`${base} bg-yellow-100 text-yellow-700`}>Suspicious</span>
  }

  const identifierIcon = (type: 'email' | 'phone') => {
    return type === 'email' ? <Mail className="w-4 h-4 text-blue-500" /> : <PhoneCall className="w-4 h-4 text-green-500" />
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Brute Force Alerts</h1>
            <p className="text-sm text-gray-600">Monitor login abuse by IP, email, or phone number.</p>
          </div>
          <button
            onClick={fetchAlerts}
            disabled={loading}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
          >
            {loading ? <TimerReset className="w-4 h-4 animate-spin" /> : <TimerReset className="w-4 h-4" />}
            Refresh
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow border overflow-auto max-h-[600px] divide-y">
          {alerts.length === 0 && !loading && (
            <div className="p-6 text-center text-gray-500">No brute-force alerts found.</div>
          )}
          {alerts.map((alert, idx) => (
            <div key={idx} className="p-4 flex items-start gap-4 text-sm">
              <div className="pt-1 text-red-600">
                {alert.status === 'blocked' ? <Ban className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-800 font-medium">
                    {alert.ip} — {alert.attempts} attempts
                  </span>
                  {statusBadge(alert.status)}
                </div>

                {alert.identifier && alert.identifierType && (
                  <div className="flex items-center text-xs text-gray-600 gap-1">
                    {identifierIcon(alert.identifierType)}
                    <span>{alert.identifier}</span>
                  </div>
                )}

                <div className="text-xs text-gray-500 flex gap-2 items-center">
                  <Globe className="w-3 h-3" />
                  {alert.location}
                  <span>•</span>
                  {new Date(alert.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
