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
  AlertCircle,
  CheckCircle,
  XCircle,
  PauseCircle,
} from 'lucide-react'
import { useState } from 'react'

// Date Range Selector Component
function DateRangeSelector({ dateRange, setDateRange }:any) {
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
        className="flex items-center justify-between px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 bg-white hover:bg-slate-50 transition-all duration-200 min-w-[120px] shadow-sm"
      >
        <span className="text-slate-700 font-medium">{dateRange}</span>
        <ChevronDown size={12} className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-200 rounded-lg shadow-xl z-10 backdrop-blur-sm">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setDateRange(option.value)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-50 transition-colors ${
                  dateRange === option.value ? 'bg-indigo-50 text-indigo-700 font-semibold border-r-2 border-indigo-500' : 'text-slate-700'
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
      bgGradient: 'from-blue-500 via-blue-600 to-blue-700',
      ringColor: 'ring-blue-100',
      hoverRing: 'hover:ring-blue-200',
    },
    {
      title: 'Active Agents',
      value: '173',
      change: '+1.8%',
      trend: 'up',
      icon: UserCheck,
      color: 'bg-emerald-50 text-emerald-600',
      bgGradient: 'from-emerald-500 via-emerald-600 to-emerald-700',
      ringColor: 'ring-emerald-100',
      hoverRing: 'hover:ring-emerald-200',
    },
    {
      title: 'Total Revenue',
      value: '$4,842K',
      change: '+4.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-violet-50 text-violet-600',
      bgGradient: 'from-violet-500 via-violet-600 to-violet-700',
      ringColor: 'ring-violet-100',
      hoverRing: 'hover:ring-violet-200',
    },
    {
      title: 'Completion Rate',
      value: '85.7%',
      change: '-1.7%',
      trend: 'down',
      icon: Activity,
      color: 'bg-orange-50 text-orange-600',
      bgGradient: 'from-orange-500 via-orange-600 to-orange-700',
      ringColor: 'ring-orange-100',
      hoverRing: 'hover:ring-orange-200',
    },
  ]

  const adminSections = [
    {
      title: 'Property Management',
      description: 'Manage listings, approvals, and property details',
      icon: Layers,
      color: 'from-blue-500 via-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-100',
      hoverBorder: 'hover:border-blue-200',
      stats: [
        { label: 'Active', value: '1,234', icon: CheckCircle, color: 'text-emerald-600' },
        { label: 'Pending', value: '89', icon: AlertCircle, color: 'text-amber-600' },
        { label: 'Sold', value: '456', icon: Target, color: 'text-blue-600' },
      ],
    },
    {
      title: 'Booking Analytics',
      description: 'Track bookings, views, and customer insights',
      icon: Calendar,
      color: 'from-emerald-500 via-emerald-600 to-emerald-700',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      borderColor: 'border-emerald-100',
      hoverBorder: 'hover:border-emerald-200',
      stats: [
        { label: 'This Week', value: '127', icon: Calendar, color: 'text-emerald-600' },
        { label: 'Satisfaction', value: '94%', icon: Star, color: 'text-yellow-600' },
        { label: 'Completed', value: '89%', icon: CheckCircle, color: 'text-emerald-600' },
      ],
    },
    {
      title: 'Agent Performance',
      description: 'Monitor sales, leads, and team productivity',
      icon: Users,
      color: 'from-violet-500 via-violet-600 to-violet-700',
      bgColor: 'bg-violet-50',
      textColor: 'text-violet-700',
      borderColor: 'border-violet-100',
      hoverBorder: 'hover:border-violet-200',
      stats: [
        { label: 'Active', value: '173', icon: UserCheck, color: 'text-emerald-600' },
        { label: 'Top Performer', value: 'Sarah M.', icon: Star, color: 'text-yellow-600' },
        { label: 'This Month', value: '45', icon: TrendingUp, color: 'text-violet-600' },
      ],
    },
    {
      title: 'Financial Reports',
      description: 'Revenue analytics, commission tracking',
      icon: BarChart2,
      color: 'from-orange-500 via-orange-600 to-orange-700',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      borderColor: 'border-orange-100',
      hoverBorder: 'hover:border-orange-200',
      stats: [
        { label: 'Revenue', value: '$4.8M', icon: DollarSign, color: 'text-emerald-600' },
        { label: 'Growth', value: '+12%', icon: TrendingUp, color: 'text-emerald-600' },
        { label: 'Commission', value: '$240K', icon: Target, color: 'text-orange-600' },
      ],
    },
    {
      title: 'System Settings',
      description: 'User roles, permissions, configurations',
      icon: Settings,
      color: 'from-slate-500 via-slate-600 to-slate-700',
      bgColor: 'bg-slate-50',
      textColor: 'text-slate-700',
      borderColor: 'border-slate-100',
      hoverBorder: 'hover:border-slate-200',
      stats: [
        { label: 'Admins', value: '5', icon: UserCheck, color: 'text-slate-600' },
        { label: 'Agents', value: '23', icon: Users, color: 'text-slate-600' },
        { label: 'Active Sessions', value: '18', icon: Activity, color: 'text-emerald-600' },
      ],
    },
    {
      title: 'Location Insights',
      description: 'Market trends and area performance data',
      icon: MapPin,
      color: 'from-pink-500 via-pink-600 to-pink-700',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-700',
      borderColor: 'border-pink-100',
      hoverBorder: 'hover:border-pink-200',
      stats: [
        { label: 'Areas', value: '15', icon: MapPin, color: 'text-pink-600' },
        { label: 'Top Area', value: 'Downtown', icon: Star, color: 'text-yellow-600' },
        { label: 'Avg Price', value: '$680K', icon: DollarSign, color: 'text-emerald-600' },
      ],
    },
  ]

  const quickActions = [
    { title: 'Add Property', icon: Home, color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
    { title: 'New Client', icon: UserCheck, color: 'bg-gradient-to-r from-emerald-500 to-emerald-600' },
    { title: 'Schedule Tour', icon: Calendar, color: 'bg-gradient-to-r from-violet-500 to-violet-600' },
    { title: 'Generate Report', icon: BarChart2, color: 'bg-gradient-to-r from-orange-500 to-orange-600' },
  ]

  return (
    <div className="space-y-6 bg-slate-50/50 min-h-screen p-4">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-xs text-slate-600 mt-0.5">Your real estate business at a glance</p>
        </div>
        
        <div className="flex items-center gap-2">
          <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
          
          <button className="p-2 border border-slate-200 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 bg-white/80 backdrop-blur-sm">
            <Filter size={14} className="text-slate-600" />
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
              className={`bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200 hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-300 group cursor-pointer ring-1 ${stat.ringColor} ${stat.hoverRing} hover:ring-2 hover:-translate-y-0.5`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.bgGradient} text-white shadow-md group-hover:shadow-lg transition-all duration-300`}>
                  <Icon size={16} />
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-100 rounded-md">
                  <MoreHorizontal size={14} className="text-slate-400" />
                </button>
              </div>
              
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{stat.title}</p>
                <p className="text-lg font-bold text-slate-900 mb-2 group-hover:text-black transition-colors">{stat.value}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {stat.trend === 'up' ? (
                      <div className="flex items-center px-2 py-1 bg-emerald-50 rounded-full ring-1 ring-emerald-100">
                        <TrendingUp className="text-emerald-600 mr-1" size={10} />
                        <span className="text-xs font-semibold text-emerald-700">{stat.change}</span>
                      </div>
                    ) : (
                      <div className="flex items-center px-2 py-1 bg-red-50 rounded-full ring-1 ring-red-100">
                        <TrendingDown className="text-red-600 mr-1" size={10} />
                        <span className="text-xs font-semibold text-red-700">{stat.change}</span>
                      </div>
                    )}
                  </div>
                  
                  <span className="text-xs text-slate-400 font-medium">vs last month</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions - Mobile Optimized */}
      <div className="lg:hidden">
        <h2 className="text-lg font-bold text-slate-900 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <button
                key={index}
                className="p-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 text-left hover:-translate-y-0.5 ring-1 ring-slate-100 hover:ring-slate-200"
              >
                <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center mb-2 shadow-md`}>
                  <Icon size={16} className="text-white" />
                </div>
                <p className="text-xs font-semibold text-slate-900">{action.title}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Management Center */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Management Center</h2>
            <p className="text-xs text-slate-600 mt-0.5">Quick access to key business functions</p>
          </div>
          
          <button className="text-xs text-slate-700 hover:text-slate-900 flex items-center gap-1 font-semibold px-3 py-1.5 rounded-lg hover:bg-white/80 transition-all duration-200">
            View All
            <ArrowUpRight size={12} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {adminSections.map((section, index) => {
            const Icon = section.icon
            return (
              <div
                key={index}
                className={`group bg-white/80 backdrop-blur-sm border-2 ${section.borderColor} ${section.hoverBorder} rounded-xl p-4 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 cursor-pointer hover:-translate-y-0.5 ring-1 ring-slate-100 hover:ring-slate-200`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${section.color} text-white shadow-md group-hover:shadow-lg transition-all duration-300`}>
                    <Icon size={16} />
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-100 rounded-md">
                    <ArrowUpRight size={12} className="text-slate-400" />
                  </button>
                </div>
                
                <div className="mb-3">
                  <h3 className="font-bold text-slate-900 mb-1 text-sm group-hover:text-black transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {section.description}
                  </p>
                </div>
                
                <div className="space-y-2">
                  {section.stats.map((stat, statIndex) => {
                    const StatIcon = stat.icon
                    return (
                      <div key={statIndex} className={`flex items-center justify-between p-2 ${section.bgColor} rounded-lg border ${section.borderColor} transition-all duration-200`}>
                        <div className="flex items-center space-x-2">
                          <StatIcon size={12} className={stat.color} />
                          <span className="text-xs font-medium text-slate-700">{stat.label}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-900">{stat.value}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom Section - Recent Activity & Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 p-4 ring-1 ring-slate-100 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-slate-900">Recent Activity</h3>
            <button className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-semibold px-2 py-1 rounded-md hover:bg-slate-100 transition-all duration-200">
              View All
              <ArrowUpRight size={10} />
            </button>
          </div>
          
          <div className="space-y-0.5">
            {[
              { action: 'New property listed', detail: '123 Oak Street, Downtown', time: '2m', type: 'property', color: 'bg-blue-500' },
              { action: 'Tour completed', detail: 'Sunset Villa - Johnson family', time: '15m', type: 'tour', color: 'bg-emerald-500' },
              { action: 'Contract signed', detail: '$850K deal by Mike Chen', time: '1h', type: 'deal', color: 'bg-violet-500' },
              { action: 'Client inquiry', detail: '3BR in Westside area', time: '2h', type: 'inquiry', color: 'bg-orange-500' },
              { action: 'Property updated', detail: 'Price reduced - 456 Elm St', time: '4h', type: 'update', color: 'bg-pink-500' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 hover:bg-slate-50 rounded-lg px-2 transition-all duration-200 group">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${activity.color} group-hover:scale-110 transition-transform duration-200`}></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-900 truncate">{activity.action}</p>
                    <p className="text-xs text-slate-600 truncate">{activity.detail}</p>
                  </div>
                </div>
                <span className="text-xs text-slate-500 ml-2 font-medium bg-slate-100 px-1.5 py-0.5 rounded-full">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 p-4 ring-1 ring-slate-100 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-slate-900">Performance Metrics</h3>
            <button className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-semibold px-2 py-1 rounded-md hover:bg-slate-100 transition-all duration-200">
              Details
              <ArrowUpRight size={10} />
            </button>
          </div>
          
          <div className="space-y-0.5">
            {[
              { label: 'Lead Conversion', value: '28.5%', change: '+2.1%', trend: 'up', icon: Target },
              { label: 'Avg. Response Time', value: '12m', change: '-3m', trend: 'up', icon: Clock },
              { label: 'Client Satisfaction', value: '4.8/5', change: '+0.2', trend: 'up', icon: Star },
              { label: 'Active Listings', value: '234', change: '+12', trend: 'up', icon: Briefcase },
            ].map((metric, index) => {
              const Icon = metric.icon
              return (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-all duration-200 group">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors duration-200">
                      <Icon size={14} className="text-slate-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900">{metric.label}</p>
                      <p className="text-xs text-slate-500">Current period</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-900">{metric.value}</p>
                    <div className="flex items-center justify-end">
                      <TrendingUp size={8} className="text-emerald-500 mr-1" />
                      <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded-full">{metric.change}</span>
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