'use client'

import { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  Clock, 
  Building, 
  IndianRupee, 
  Download,
  Calendar,
  MapPin,
  Phone,
  Mail,
  UserCheck,
  Home,
  Target,
  DollarSign,
  FileText,
  Activity,
  BarChart3,
  PieChart,
  Filter,
  MousePointer,
  Share2,
  Heart,
  Search,
  Zap,
  CheckCircle
} from 'lucide-react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
  Pie
} from 'recharts'

interface Metric {
  label: string
  value: string | number
  change: number
  trend: 'up' | 'down'
  icon: any
  category: string
}

interface PropertyLead {
  id: number
  name: string
  type: string
  location: string
  price: string
  totalViews: number
  uniqueVisitors: number
  inquiries: number
  phoneReveals: number
  siteVisits: number
  leadScore: number
  conversionRate: number
  daysActive: number
  agent: string
  status: 'hot' | 'warm' | 'cold' | 'converted'
  leadQuality: 'high' | 'medium' | 'low'
}

interface LocationMetrics {
  location: string
  totalLeads: number
  qualityScore: number
  avgBudget: string
  topPropertyType: string
  conversionRate: number
  growth: number
}

export default function LeadGenerationAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month')
  const [selectedView, setSelectedView] = useState('overview')

  // Sample data for charts
  const leadTrendData = [
    { month: 'Jan', leads: 450, qualified: 320, converted: 95 },
    { month: 'Feb', leads: 520, qualified: 380, converted: 115 },
    { month: 'Mar', leads: 480, qualified: 340, converted: 108 },
    { month: 'Apr', leads: 640, qualified: 450, converted: 142 },
    { month: 'May', leads: 720, qualified: 520, converted: 168 },
    { month: 'Jun', leads: 680, qualified: 490, converted: 155 },
    { month: 'Jul', leads: 820, qualified: 600, converted: 195 }
  ]

  const leadSourceData = [
    { name: 'Organic Search', value: 35, color: '#ef4444' },
    { name: 'Social Media', value: 25, color: '#3b82f6' },
    { name: 'Direct Traffic', value: 20, color: '#10b981' },
    { name: 'Referrals', value: 12, color: '#f59e0b' },
    { name: 'Paid Ads', value: 8, color: '#8b5cf6' }
  ]

  const locationPerformanceData = [
    { location: 'Whitefield', leads: 145, conversion: 28, budget: '2.1Cr' },
    { location: 'Indiranagar', leads: 132, conversion: 32, budget: '1.8Cr' },
    { location: 'Koramangala', leads: 128, conversion: 25, budget: '2.4Cr' },
    { location: 'Electronic City', leads: 98, conversion: 22, budget: '1.2Cr' },
    { location: 'Hebbal', leads: 86, conversion: 18, budget: '1.6Cr' },
    { location: 'Sarjapur', leads: 74, conversion: 15, budget: '1.1Cr' }
  ]

  const leadGenerationMetrics: Metric[] = [
    {
      label: 'Total Leads Generated',
      value: '2,847',
      change: 28.5,
      trend: 'up',
      icon: Target,
      category: 'leads'
    },
    {
      label: 'Qualified Leads',
      value: '1,923',
      change: 22.3,
      trend: 'up',
      icon: CheckCircle,
      category: 'quality'
    },
    {
      label: 'Lead Conversion Rate',
      value: '24.8%',
      change: 5.2,
      trend: 'up',
      icon: TrendingUp,
      category: 'conversion'
    },
    {
      label: 'Avg. Lead Value',
      value: '₹18.6L',
      change: 12.8,
      trend: 'up',
      icon: IndianRupee,
      category: 'value'
    }
  ]

  const engagementMetrics: Metric[] = [
    {
      label: 'Property Views',
      value: '156.2K',
      change: 18.7,
      trend: 'up',
      icon: Eye,
      category: 'views'
    },
    {
      label: 'Phone Reveals',
      value: '8,432',
      change: 15.3,
      trend: 'up',
      icon: Phone,
      category: 'contact'
    },
    {
      label: 'Site Visits Booked',
      value: '1,247',
      change: 9.8,
      trend: 'up',
      icon: MapPin,
      category: 'visits'
    },
    {
      label: 'Avg. Response Time',
      value: '12 min',
      change: -8.5,
      trend: 'up',
      icon: Clock,
      category: 'response'
    }
  ]

  const topPerformingProperties: PropertyLead[] = [
    {
      id: 1,
      name: 'Premium Villas in Whitefield',
      type: 'Villa',
      location: 'Whitefield, Bangalore',
      price: '₹2.1-3.5 Cr',
      totalViews: 4250,
      uniqueVisitors: 2840,
      inquiries: 89,
      phoneReveals: 156,
      siteVisits: 34,
      leadScore: 92,
      conversionRate: 38.2,
      daysActive: 28,
      agent: 'Priya Sharma',
      status: 'hot',
      leadQuality: 'high'
    },
    {
      id: 2,
      name: 'Luxury Apartments in Indiranagar',
      type: 'Apartment',
      location: 'Indiranagar, Bangalore',
      price: '₹1.2-2.8 Cr',
      totalViews: 3890,
      uniqueVisitors: 2560,
      inquiries: 76,
      phoneReveals: 142,
      siteVisits: 28,
      leadScore: 88,
      conversionRate: 34.7,
      daysActive: 22,
      agent: 'Rajesh Kumar',
      status: 'hot',
      leadQuality: 'high'
    },
    {
      id: 3,
      name: 'Commercial Spaces in CBD',
      type: 'Commercial',
      location: 'CBD, Bangalore',
      price: '₹80L-4.2 Cr',
      totalViews: 2940,
      uniqueVisitors: 1890,
      inquiries: 52,
      phoneReveals: 98,
      siteVisits: 18,
      leadScore: 75,
      conversionRate: 28.8,
      daysActive: 35,
      agent: 'Anita Singh',
      status: 'warm',
      leadQuality: 'medium'
    },
    {
      id: 4,
      name: 'Ready-to-Move Flats in Electronic City',
      type: 'Apartment',
      location: 'Electronic City, Bangalore',
      price: '₹45L-1.2 Cr',
      totalViews: 5680,
      uniqueVisitors: 3420,
      inquiries: 124,
      phoneReveals: 208,
      siteVisits: 45,
      leadScore: 95,
      conversionRate: 42.1,
      daysActive: 18,
      agent: 'Vikram Reddy',
      status: 'hot',
      leadQuality: 'high'
    }
  ]

  const locationMetrics: LocationMetrics[] = [
    {
      location: 'Whitefield',
      totalLeads: 284,
      qualityScore: 8.4,
      avgBudget: '₹2.1 Cr',
      topPropertyType: 'Villa',
      conversionRate: 28.5,
      growth: 15.2
    },
    {
      location: 'Indiranagar',
      totalLeads: 267,
      qualityScore: 8.8,
      avgBudget: '₹1.8 Cr',
      topPropertyType: 'Apartment',
      conversionRate: 32.1,
      growth: 22.8
    },
    {
      location: 'Koramangala',
      totalLeads: 245,
      qualityScore: 7.9,
      avgBudget: '₹2.4 Cr',
      topPropertyType: 'Penthouse',
      conversionRate: 25.6,
      growth: 8.7
    },
    {
      location: 'Electronic City',
      totalLeads: 198,
      qualityScore: 8.2,
      avgBudget: '₹1.2 Cr',
      topPropertyType: 'Apartment',
      conversionRate: 35.8,
      growth: 28.4
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-red-100 text-red-800 border-red-200'
      case 'warm': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'cold': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'converted': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'high': return 'bg-emerald-100 text-emerald-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 100000) {
      return `${(num / 100000).toFixed(1)}L`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Lead Generation Analytics
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Track, analyze and optimize your property lead generation performance
            </p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="text-sm border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>
            <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-200">
              <button
                onClick={() => setSelectedView('overview')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedView === 'overview' 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setSelectedView('detailed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedView === 'detailed' 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Detailed
              </button>
            </div>
            <button className="flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl">
              <Download size={16} className="mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Lead Generation Performance Metrics */}
        <div>
          <div className="flex items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Lead Generation Performance</h2>
            <div className="ml-4 px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-sm font-semibold rounded-full border border-green-200">
              +24.3% vs last period
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadGenerationMetrics.map((metric, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
                    <metric.icon size={24} className="text-blue-600" />
                  </div>
                  <span className={`text-sm font-bold flex items-center px-3 py-1.5 rounded-full ${
                    metric.trend === 'up' 
                      ? 'text-emerald-700 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200' 
                      : 'text-red-700 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200'
                  }`}>
                    {metric.trend === 'up' ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                    {Math.abs(metric.change)}%
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Metrics */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">User Engagement Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {engagementMetrics.map((metric, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                    <metric.icon size={20} className="text-purple-600" />
                  </div>
                  <span className={`text-xs font-medium flex items-center px-2 py-1 rounded-full ${
                    metric.trend === 'up' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                  }`}>
                    {metric.trend === 'up' ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                    {Math.abs(metric.change)}%
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">{metric.label}</p>
                  <p className="text-xl font-bold text-gray-900">{metric.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Lead Generation Trend */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Lead Generation Trend</h3>
              <div className="flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-500" />
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>Last 7 Months</option>
                  <option>Last 12 Months</option>
                  <option>This Year</option>
                </select>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={leadTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="leads"
                  fill="url(#leadGradient)"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Total Leads"
                />
                <Line
                  type="monotone"
                  dataKey="qualified"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Qualified Leads"
                  dot={{ fill: '#10b981', strokeWidth: 0, r: 4 }}
                />
                <Bar
                  dataKey="converted"
                  fill="#8b5cf6"
                  name="Converted"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="leadGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Lead Sources Distribution */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Lead Sources</h3>
              <Share2 size={20} className="text-purple-500" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={leadSourceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {leadSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value) => [`${value}%`, 'Share']}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {leadSourceData.map((source, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: source.color }}></div>
                    <span className="text-gray-700">{source.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{source.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location Performance */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Location-wise Lead Performance</h3>
              <MapPin size={20} className="text-green-500" />
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={locationPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="location" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Legend />
                <Bar yAxisId="left" dataKey="leads" fill="#3b82f6" name="Total Leads" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="conversion" fill="#10b981" name="Conversion Rate %" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performing Properties */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Top Lead Generating Properties</h2>
                <p className="text-sm text-gray-600 mt-1">Properties with highest lead generation and conversion rates</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-white rounded-lg transition-colors">
                  <Filter size={16} className="text-gray-500" />
                </button>
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white">
                  <option>All Types</option>
                  <option>Villa</option>
                  <option>Apartment</option>
                  <option>Commercial</option>
                  <option>Penthouse</option>
                </select>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Lead Metrics</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Engagement</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Agent</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topPerformingProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-semibold text-gray-900 mb-1">{property.name}</div>
                        <div className="text-sm text-gray-500 flex items-center mb-1">
                          <MapPin size={12} className="mr-1" />
                          {property.location}
                        </div>
                        <div className="text-xs text-blue-600 font-medium">{property.price}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Eye size={12} className="mr-2 text-blue-500" />
                          <span className="font-medium">{formatNumber(property.totalViews)}</span>
                          <span className="text-gray-500 ml-1">views</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Target size={12} className="mr-2 text-green-500" />
                          <span className="font-medium">{property.inquiries}</span>
                          <span className="text-gray-500 ml-1">inquiries</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone size={12} className="mr-2 text-purple-500" />
                          <span className="font-medium">{property.phoneReveals}</span>
                          <span className="text-gray-500 ml-1">phone reveals</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">{formatNumber(property.uniqueVisitors)}</span>
                          <span className="text-gray-500 ml-1">unique visitors</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">{property.siteVisits}</span>
                          <span className="text-gray-500 ml-1">site visits</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" 
                              style={{ width: `${property.leadScore}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-gray-600">{property.leadScore}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-bold text-green-600">{property.conversionRate}%</span>
                          <span className="text-gray-500 ml-1">conversion</span>
                        </div>
                        <div className="text-xs text-gray-600">
                          {property.daysActive} days active
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getQualityColor(property.leadQuality)}`}>
                          {property.leadQuality.charAt(0).toUpperCase() + property.leadQuality.slice(1)} Quality
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(property.status)}`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          property.status === 'hot' ? 'bg-red-500' :
                          property.status === 'warm' ? 'bg-orange-500' :
                          property.status === 'cold' ? 'bg-blue-500' : 'bg-green-500'
                        }`}></div>
                        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{property.agent}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Location-wise Lead Quality Metrics */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Location-wise Lead Insights</h2>
                <p className="text-sm text-gray-600 mt-1">Analyze lead quality and performance across different locations</p>
              </div>
              <MapPin size={24} className="text-green-600" />
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {locationMetrics.map((location, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">{location.location}</h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      location.growth > 20 ? 'bg-green-100 text-green-800' :
                      location.growth > 10 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {location.growth > 0 ? '+' : ''}{location.growth}%
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Leads</span>
                      <span className="font-bold text-blue-600">{location.totalLeads}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Quality Score</span>
                      <div className="flex items-center">
                        <span className="font-bold text-green-600">{location.qualityScore}/10</span>
                        <div className="ml-2 w-12 bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-green-600 h-1.5 rounded-full" 
                            style={{ width: `${(location.qualityScore / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avg Budget</span>
                      <span className="font-bold text-purple-600">{location.avgBudget}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Top Type</span>
                      <span className="font-medium text-gray-900">{location.topPropertyType}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <span className="text-sm text-gray-600">Conversion</span>
                      <span className="font-bold text-emerald-600">{location.conversionRate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions & Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Top Insights */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl text-white">
            <div className="flex items-center mb-4">
              <Zap size={24} className="mr-3" />
              <h3 className="text-lg font-bold">Key Insights</h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Electronic City shows highest conversion rate at 35.8%</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Ready-to-move properties generate 42% more qualified leads</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Response time under 15 minutes increases conversion by 23%</span>
              </li>
            </ul>
          </div>

          {/* Lead Quality Distribution */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Lead Quality</h3>
              <Target size={20} className="text-green-500" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-700">High Quality</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">45%</div>
                  <div className="text-xs text-gray-500">1,281 leads</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-700">Medium Quality</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">35%</div>
                  <div className="text-xs text-gray-500">996 leads</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-700">Low Quality</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">20%</div>
                  <div className="text-xs text-gray-500">570 leads</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center mb-4">
              <Activity size={20} className="mr-3 text-purple-500" />
              <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
            </div>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-all duration-200 text-sm font-medium text-gray-700">
                <span>View Lead Details</span>
                <Eye size={16} />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg hover:from-green-100 hover:to-emerald-100 transition-all duration-200 text-sm font-medium text-gray-700">
                <span>Export Lead Data</span>
                <Download size={16} />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 text-sm font-medium text-gray-700">
                <span>Set Up Alerts</span>
                <Zap size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}