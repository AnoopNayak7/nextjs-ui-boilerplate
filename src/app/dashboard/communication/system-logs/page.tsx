'use client'

import { useEffect, useState } from 'react'
import { Terminal, RefreshCcw, Loader2, Bug, Info, AlertTriangle } from 'lucide-react'

type LogItem = {
  timestamp: string
  level: 'info' | 'warn' | 'error'
  message: string
}

export default function SystemLogsPage() {
  const [logs, setLogs] = useState<LogItem[]>([])
  const [loading, setLoading] = useState(false)

  const fetchLogs = async () => {
    setLoading(true)
    try {
      // Simulate log fetch
      await new Promise((r) => setTimeout(r, 1000))
      const fakeLogs: LogItem[] = [
        {
          timestamp: new Date().toISOString(),
          level: 'info',
          message: 'Server started on port 3000',
        },
        {
          timestamp: new Date().toISOString(),
          level: 'warn',
          message: 'Redis cache connection retrying...',
        },
        {
          timestamp: new Date().toISOString(),
          level: 'error',
          message: 'Database timeout on /api/users',
        },
      ]
      setLogs(fakeLogs)
    } catch (err) {
      console.error('Failed to fetch logs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  const levelTag = (level: LogItem['level']) => {
    const base = 'text-xs px-2 py-0.5 rounded-full font-medium'
    switch (level) {
      case 'info':
        return <span className={`${base} bg-blue-100 text-blue-700`}>INFO</span>
      case 'warn':
        return <span className={`${base} bg-yellow-100 text-yellow-700`}>WARN</span>
      case 'error':
        return <span className={`${base} bg-red-100 text-red-700`}>ERROR</span>
    }
  }

  const icon = (level: LogItem['level']) => {
    const classes = 'w-4 h-4'
    if (level === 'info') return <Info className={classes} />
    if (level === 'warn') return <AlertTriangle className={classes} />
    return <Bug className={classes} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">System Logs</h1>
            <p className="text-sm text-gray-600">Live server logs from your backend system.</p>
          </div>
          <button
            onClick={fetchLogs}
            disabled={loading}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCcw className="w-4 h-4" />}
            Refresh
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-auto border divide-y max-h-[600px]">
          {logs.length === 0 && !loading && (
            <div className="p-6 text-center text-gray-500">No logs found.</div>
          )}
          {logs.map((log, idx) => (
            <div key={idx} className="p-4 flex items-start gap-4 text-sm">
              <div className="pt-0.5 text-gray-500">{icon(log.level)}</div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-medium">{log.message}</span>
                  {levelTag(log.level)}
                </div>
                <div className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
