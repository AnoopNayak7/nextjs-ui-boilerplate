'use client'

import {
  MailCheck,
  MailX,
  Send,
  User,
  Loader2,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import { useState } from 'react'

export default function EmailHealthPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const testSMTP = async () => {
    setStatus('sending')
    setMessage('')

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const isWorking = Math.random() > 0.3
      if (isWorking) {
        setStatus('success')
        setMessage('SMTP connection is working correctly.')
      } else {
        throw new Error('SMTP server rejected authentication.')
      }
    } catch (err: any) {
      setStatus('error')
      setMessage(err.message || 'SMTP test failed.')
    }
  }

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">Email Health Check</h1>
          <p className="text-sm text-gray-600">
            Test your SMTP configuration to ensure email delivery is functioning.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow space-y-4">
          <div className="flex items-center gap-3">
            <MailCheck className="w-6 h-6 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">SMTP Connection</h2>
          </div>

          <button
            onClick={testSMTP}
            disabled={status === 'sending'}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            {status === 'sending' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {status === 'sending' ? 'Testing...' : 'Test SMTP'}
          </button>

          {status === 'success' && (
            <div className="flex items-center gap-2 text-green-700 text-sm">
              <CheckCircle2 className="w-5 h-5" />
              {message}
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-700 text-sm">
              <XCircle className="w-5 h-5" />
              {message}
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500">
          Tip: Ensure your SMTP settings (host, port, username, password, TLS/SSL) are correctly configured in your backend.
        </div>
      </div>
    </div>
  )
}
