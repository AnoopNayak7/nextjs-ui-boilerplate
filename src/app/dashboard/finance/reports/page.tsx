'use client'

import { useState } from 'react'
import { Download, Calendar, IndianRupee, TrendingUp, TrendingDown, Users, Home, Building } from 'lucide-react'

interface ReportMetric {
  label: string
  value: string | number
  change: number
  trend: 'up' | 'down'
  icon: any
}

interface RevenueData {
  month: string
  revenue: number
  expenses: number
}

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month')

  const metrics: ReportMetric[] = [
    {
      label: 'Total Revenue',
      value: '₹24,50,000',
      change: 12.5,
      trend: 'up',
      icon: IndianRupee
    },
    {
      label: 'Total Properties',
      value: 156,
      change: 8.2,
      trend: 'up',
      icon: Building
    },
    {
      label: 'Active Listings',
      value: 89,
      change: -2.4,
      trend: 'down',
      icon: Home
    },
    {
      label: 'New Users',
      value: 234,
      change: 15.3,
      trend: 'up',
      icon: Users
    }
  ]

  const revenueData: RevenueData[] = [
    { month: 'Jan', revenue: 1850000, expenses: 950000 },
    { month: 'Feb', revenue: 2150000, expenses: 1050000 },
    { month: 'Mar', revenue: 2450000, expenses: 1150000 },
    { month: 'Apr', revenue: 2250000, expenses: 1100000 },
    { month: 'May', revenue: 2650000, expenses: 1250000 },
    { month: 'Jun', revenue: 2850000, expenses: 1350000 }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-gray-900">Financial Reports</h1>
          <p className="text-xs text-gray-500">
            Overview of your financial performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="text-xs border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
            <option>Last 6 Months</option>
            <option>This Year</option>
          </select>
          <button className="flex items-center px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium text-gray-600">
            <Download size={14} className="mr-1" />
            Export Report
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

      {/* Revenue Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-sm font-medium text-gray-900">Revenue Breakdown</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expenses</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Profit</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {revenueData.map((data, index) => {
              const netProfit = data.revenue - data.expenses
              const margin = (netProfit / data.revenue) * 100
              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center text-xs text-gray-900">
                      <Calendar size={14} className="mr-2 text-gray-400" />
                      {data.month}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-900">
                    {formatCurrency(data.revenue)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-900">
                    {formatCurrency(data.expenses)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-900">
                    {formatCurrency(netProfit)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex text-xs font-medium rounded-full px-2 py-0.5 ${margin >= 50 ? 'bg-green-100 text-green-800' : margin >= 30 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {margin.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}