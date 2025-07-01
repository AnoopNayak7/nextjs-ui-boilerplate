'use client'

import { useEffect, useState } from 'react'
import {
  Ban,
  Globe,
  Trash2,
  ShieldX,
  Loader2,
  TimerReset,
} from 'lucide-react'

type BlockedIP = {
  ip: string
  location: string
  blockedAt: string
  reason?: string
}

export default function BlockedIPListPage() {
  const [blockedIPs, setBlockedIPs] = useState<BlockedIP[]>([])
  const [loading, setLoading] = useState(false)
  const [unblocking, setUnblocking] = useState<string | null>(null)

  const fetchBlockedIPs = async () => {
    setLoading(true)
    try {
      // Simulate API fetch
      await new Promise((r) => setTimeout(r, 400))
      const data: BlockedIP[] = [
        {
          ip: '203.0.113.45',
          location: 'Bangalore, India',
          blockedAt: new Date(Date.now() - 3600000).toISOString(),
          reason: 'Too many failed login attempts',
        },
        {
          ip: '198.51.100.90',
          location: 'Frankfurt, Germany',
          blockedAt: new Date(Date.now() - 7200000).toISOString(),
        },
      ]
      setBlockedIPs(data)
    } finally {
      setLoading(false)
    }
  }

  const unblockIP = async (ip: string) => {
    setUnblocking(ip)
    try {
      // Simulate unblock API
      await new Promise((r) => setTimeout(r, 500))
      setBlockedIPs((prev) => prev.filter((item) => item.ip !== ip))
    } finally {
      setUnblocking(null)
    }
  }

  useEffect(() => {
    fetchBlockedIPs()
  }, [])

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blocked IP List</h1>
            <p className="text-sm text-gray-600">
              These IP addresses have been blocked due to security concerns.
            </p>
          </div>
          <button
            onClick={fetchBlockedIPs}
            disabled={loading}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <TimerReset className="w-4 h-4" />}
            Refresh
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow border overflow-auto max-h-[600px] divide-y">
          {blockedIPs.length === 0 && !loading && (
            <div className="p-6 text-center text-gray-500">No blocked IPs found.</div>
          )}
          {blockedIPs.map((ip, idx) => (
            <div key={idx} className="p-4 flex items-start gap-4 text-sm">
              <div className="pt-1 text-red-600">
                <Ban className="w-5 h-5" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-gray-800 font-medium">{ip.ip}</div>
                    <div className="flex gap-2 text-xs text-gray-500 mt-0.5">
                      <Globe className="w-3 h-3" />
                      <span>{ip.location}</span>
                      <span>•</span>
                      <span>
                        Blocked{' '}
                        {new Date(ip.blockedAt).toLocaleString()}
                      </span>
                    </div>
                    {ip.reason && (
                      <div className="text-xs text-gray-600 mt-1 italic">
                        Reason: {ip.reason}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => unblockIP(ip.ip)}
                    disabled={unblocking === ip.ip}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1 text-xs"
                  >
                    {unblocking === ip.ip ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ShieldX className="w-4 h-4" />
                    )}
                    Unblock
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
