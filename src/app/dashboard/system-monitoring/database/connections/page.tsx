'use client'

import { DatabaseZap, CheckCircle2, AlertTriangle } from 'lucide-react'

const connections = [
  {
    name: 'DynamoDB - Primary',
    region: 'ap-south-1',
    status: 'connected',
    tableCount: 12,
    icon: DatabaseZap,
  },
  {
    name: 'DynamoDB - Staging',
    region: 'us-east-1',
    status: 'disconnected',
    tableCount: 0,
    icon: DatabaseZap,
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'connected':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-100 text-green-800 border border-green-200 px-2 py-1 rounded-full">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Connected
        </span>
      )
    case 'disconnected':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium bg-red-100 text-red-800 border border-red-200 px-2 py-1 rounded-full">
          <AlertTriangle className="w-3.5 h-3.5" />
          Disconnected
        </span>
      )
    default:
      return null
  }
}

export default function DatabaseConnectionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Database Connections</h1>
            <p className="text-gray-600 text-sm mt-1">Manage and monitor your Database environments</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((conn, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                  <conn.icon size={24} className="text-blue-600" />
                </div>
                {getStatusBadge(conn.status)}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{conn.name}</h3>
              <p className="text-sm text-gray-600 mt-1">Region: <span className="font-medium">{conn.region}</span></p>
              <p className="text-sm text-gray-600">Tables: <span className="font-medium">{conn.tableCount}</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
