'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, Users, Eye, Clock, Building, IndianRupee, Download } from 'lucide-react'

interface Metric {
  label: string
  value: string | number
  change: number
  trend: 'up' | 'down'
  icon: any
}

interface TopProperty {
  id: number
  name: string
  type: string
  views: number
  inquiries: number
  lastUpdated: string
}

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('This Week')

  const metrics: Metric[] = [
    {
      label: 'Total Views',
      value: '24,521',
      change: 12.5,
      trend: 'up',
      icon: Eye
    },
    {
      label: 'Active Users',
      value: '1,429',
      change: 8.2,
      trend: 'up',
      icon: Users
    },
    {
      label: 'Avg. Session Duration',
      value: '4m 32s',
      change: -2.4,
      trend: 'down',
      icon: Clock
    },
    {
      label: 'Property Listings',
      value: '892',
      change: 15.3,
      trend: 'up',
      icon: Building
    }
  ]

  const topProperties: TopProperty[] = [
    {
      id: 1,
      name: 'Luxury Villa in Whitefield',
      type: 'Villa',
      views: 1245,
      inquiries: 23,
      lastUpdated: '2 hours ago'
    },
    {
      id: 2,
      name: 'Modern Apartment in Indiranagar',
      type: 'Apartment',
      views: 982,
      inquiries: 18,
      lastUpdated: '4 hours ago'
    },
    {
      id: 3,
      name: 'Commercial Space in CBD',
      type: 'Commercial',
      views: 876,
      inquiries: 15,
      lastUpdated: '6 hours ago'
    },
    {
      id: 4,
      name: 'Penthouse in Koramangala',
      type: 'Penthouse',
      views: 754,
      inquiries: 12,
      lastUpdated: '8 hours ago'
    }
  ]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-gray-900">Analytics Dashboard</h1>
          <p className="text-xs text-gray-500">
            Track your platform's performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="text-xs border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option>This Week</option>
            <option>Last Week</option>
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
          </select>
          <button className="flex items-center px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium text-gray-600">
            <Download size={14} className="mr-1" />
            Export Data
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm border space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <metric.icon size={16} className="text-indigo-600" />
              </div>
              <span className={`text-xs font-medium flex items-center ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {metric.trend === 'up' ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                {Math.abs(metric.change)}%
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500">{metric.label}</p>
              <p className="text-base font-semibold text-gray-900">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Top Performing Properties */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-sm font-medium text-gray-900">Top Performing Properties</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inquiries</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {topProperties.map((property) => (
              <tr key={property.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-xs font-medium text-gray-900">{property.name}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {property.type}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center text-xs text-gray-900">
                    <Eye size={14} className="mr-1 text-gray-400" />
                    {property.views.toLocaleString()}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-xs text-gray-900">{property.inquiries}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-xs text-gray-500">{property.lastUpdated}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Activity Chart would go here */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h2 className="text-sm font-medium text-gray-900 mb-4">User Activity</h2>
        <div className="h-64 flex items-center justify-center text-gray-500 text-sm">
          Chart component would be implemented here
        </div>
      </div>
    </div>
  )
}