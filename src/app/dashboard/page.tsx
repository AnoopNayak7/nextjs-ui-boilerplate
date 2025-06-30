'use client'

import {
  Home,
  UserCheck,
  DollarSign,
  Activity,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Filter,
  Building,
  ClipboardList,
  Layers,
  BarChart2,
  Users,
  Settings,
  Calendar,
  MapPin,
  Eye,
  ArrowUpRight,
  ChevronDown,
  Clock,
  Star,
  Target,
  Briefcase,
} from 'lucide-react'
import { useState } from 'react'

// Date Range Selector Component
function DateRangeSelector({ dateRange, setDateRange }: { dateRange: string; setDateRange: (value: string) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  
  const options = [
    { value: 'This Week', label: 'This Week' },
    { value: 'This Month', label: 'This Month' },
    { value: 'This Quarter', label: 'This Quarter' },
    { value: 'This Year', label: 'This Year' },
    { value: 'Last 30 Days', label: 'Last 30 Days' },
    { value: 'Last 6 Months', label: 'Last 6 Months' },
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 bg-white hover:bg-gray-50 transition-colors min-w-[140px]"
      >
        <span className="text-gray-700">{dateRange}</span>
        <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setDateRange(option.value)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  dateRange === option.value ? 'bg-gray-50 text-[#1A1A1A] font-medium' : 'text-gray-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState('This Week')

  const stats = [
    {
      title: 'Total Properties',
      value: '2,345',
      change: '+12%',
      trend: 'up',
      icon: Home,
      color: 'bg-blue-50 text-blue-600',
      bgGradient: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Active Agents',
      value: '173',
      change: '+1.8%',
      trend: 'up',
      icon: UserCheck,
      color: 'bg-emerald-50 text-emerald-600',
      bgGradient: 'from-emerald-500 to-emerald-600',
    },
    {
      title: 'Total Revenue',
      value: '$4,842K',
      change: '+4.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-violet-50 text-violet-600',
      bgGradient: 'from-violet-500 to-violet-600',
    },
    {
      title: 'Completion Rate',
      value: '85.7%',
      change: '-1.7%',
      trend: 'down',
      icon: Activity,
      color: 'bg-orange-50 text-orange-600',
      bgGradient: 'from-orange-500 to-orange-600',
    },
  ]

  const adminSections = [
    {
      title: 'Property Management',
      description: 'Manage listings, approvals, and property details',
      icon: Layers,
      color: 'from-blue-500 to-blue-600',
      items: ['1,234 Active', '89 Pending'],
    },
    {
      title: 'Booking Analytics',
      description: 'Track bookings, views, and customer insights',
      icon: Calendar,
      color: 'from-emerald-500 to-emerald-600',
      items: ['127 This Week', '94% Satisfaction'],
    },
    {
      title: 'Agent Performance',
      description: 'Monitor sales, leads, and team productivity',
      icon: Users,
      color: 'from-violet-500 to-violet-600',
      items: ['173 Active', 'Top: Sarah M.'],
    },
    {
      title: 'Financial Reports',
      description: 'Revenue analytics, commission tracking',
      icon: BarChart2,
      color: 'from-orange-500 to-orange-600',
      items: ['$4.8M Revenue', '+12% Growth'],
    },
    {
      title: 'System Settings',
      description: 'User roles, permissions, configurations',
      icon: Settings,
      color: 'from-gray-500 to-gray-600',
      items: ['5 Admins', '23 Agents'],
    },
    {
      title: 'Location Insights',
      description: 'Market trends and area performance data',
      icon: MapPin,
      color: 'from-pink-500 to-pink-600',
      items: ['15 Areas', 'Top: Downtown'],
    },
  ]

  const quickActions = [
    { title: 'Add Property', icon: Home, color: 'bg-blue-500' },
    { title: 'New Client', icon: UserCheck, color: 'bg-emerald-500' },
    { title: 'Schedule Tour', icon: Calendar, color: 'bg-violet-500' },
    { title: 'Generate Report', icon: BarChart2, color: 'bg-orange-500' },
  ]

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#1A1A1A]">Dashboard Overview</h1>
          <p className="text-sm text-gray-600 mt-1">Your real estate business at a glance</p>
        </div>
        
        <div className="flex items-center gap-3">
          <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
          
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="bg-white p-5 rounded-xl border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-lg bg-gradient-to-r ${stat.bgGradient} text-white shadow-sm group-hover:shadow-md transition-shadow`}>
                  <Icon size={18} />
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded-md">
                  <MoreHorizontal size={14} className="text-gray-400" />
                </button>
              </div>
              
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{stat.title}</p>
                <p className="text-xl font-bold text-[#1A1A1A] mb-2 group-hover:text-black transition-colors">{stat.value}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {stat.trend === 'up' ? (
                      <div className="flex items-center px-2 py-1 bg-emerald-50 rounded-full">
                        <TrendingUp className="text-emerald-600 mr-1" size={12} />
                        <span className="text-xs font-medium text-emerald-600">{stat.change}</span>
                      </div>
                    ) : (
                      <div className="flex items-center px-2 py-1 bg-red-50 rounded-full">
                        <TrendingDown className="text-red-600 mr-1" size={12} />
                        <span className="text-xs font-medium text-red-600">{stat.change}</span>
                      </div>
                    )}
                  </div>
                  
                  <span className="text-xs text-gray-400">vs last month</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions - Mobile Optimized */}
      <div className="lg:hidden">
        <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <button
                key={index}
                className="p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all text-left"
              >
                <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center mb-2`}>
                  <Icon size={16} className="text-white" />
                </div>
                <p className="text-sm font-medium text-[#1A1A1A]">{action.title}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Admin Sections */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-[#1A1A1A]">Management Center</h2>
            <p className="text-sm text-gray-500 mt-1">Quick access to key business functions</p>
          </div>
          
          <button className="text-sm text-[#1A1A1A] hover:underline flex items-center gap-1 font-medium">
            View All
            <ArrowUpRight size={14} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {adminSections.map((section, index) => {
            const Icon = section.icon
            return (
              <div
                key={index}
                className="group bg-white border border-gray-100 rounded-xl p-5 hover:shadow-lg hover:border-gray-200 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2.5 rounded-lg bg-gradient-to-r ${section.color} text-white shadow-sm group-hover:shadow-md transition-shadow`}>
                    <Icon size={18} />
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded-md">
                    <ArrowUpRight size={14} className="text-gray-400" />
                  </button>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#1A1A1A] mb-2 text-sm group-hover:text-black transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                    {section.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="text-xs">
                        <span className="text-gray-400">{item.split(':')[0]}:</span>
                        <span className="text-[#1A1A1A] font-medium ml-1">{item.split(':')[1] || item.split(' ')[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom Section - Recent Activity & Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-[#1A1A1A]">Recent Activity</h3>
            <button className="text-xs text-gray-500 hover:text-[#1A1A1A] flex items-center gap-1">
              View All
              <ArrowUpRight size={12} />
            </button>
          </div>
          
          <div className="space-y-3">
            {[
              { action: 'New property listed', detail: '123 Oak Street, Downtown', time: '2m', type: 'property', color: 'bg-blue-500' },
              { action: 'Tour completed', detail: 'Sunset Villa - Johnson family', time: '15m', type: 'tour', color: 'bg-emerald-500' },
              { action: 'Contract signed', detail: '$850K deal by Mike Chen', time: '1h', type: 'deal', color: 'bg-violet-500' },
              { action: 'Client inquiry', detail: '3BR in Westside area', time: '2h', type: 'inquiry', color: 'bg-orange-500' },
              { action: 'Property updated', detail: 'Price reduced - 456 Elm St', time: '4h', type: 'update', color: 'bg-pink-500' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 hover:bg-gray-50 rounded-lg px-2 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${activity.color}`}></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#1A1A1A] truncate">{activity.action}</p>
                    <p className="text-xs text-gray-500 truncate">{activity.detail}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 ml-2">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-[#1A1A1A]">Performance Metrics</h3>
            <button className="text-xs text-gray-500 hover:text-[#1A1A1A] flex items-center gap-1">
              Details
              <ArrowUpRight size={12} />
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              { label: 'Lead Conversion', value: '28.5%', change: '+2.1%', trend: 'up', icon: Target },
              { label: 'Avg. Response Time', value: '12m', change: '-3m', trend: 'up', icon: Clock },
              { label: 'Client Satisfaction', value: '4.8/5', change: '+0.2', trend: 'up', icon: Star },
              { label: 'Active Listings', value: '234', change: '+12', trend: 'up', icon: Briefcase },
            ].map((metric, index) => {
              const Icon = metric.icon
              return (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Icon size={14} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1A1A1A]">{metric.label}</p>
                      <p className="text-xs text-gray-500">Current period</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#1A1A1A]">{metric.value}</p>
                    <div className="flex items-center justify-end">
                      <TrendingUp size={10} className="text-emerald-500 mr-1" />
                      <span className="text-xs text-emerald-600 font-medium">{metric.change}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}