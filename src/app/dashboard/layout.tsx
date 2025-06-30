'use client'

import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import * as Icons from 'lucide-react'
import {
  Search,
  Bell,
  Plus,
  Menu,
  X,
  ChevronDown,
  ChevronRight
} from 'lucide-react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const sidebarItems = [
    { id: 'dashboard', icon: Icons.LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { 
      id: 'properties', 
      icon: Icons.Home, 
      label: 'Properties', 
      href: '/dashboard/properties',
      children: [
        { id: 'all-properties', label: 'All Properties', href: '/dashboard/properties' },
        { id: 'add-property', label: 'Add Property', href: '/dashboard/properties/add' },
        { id: 'featured', label: 'Featured', href: '/dashboard/properties/featured' },
      ]
    },
    { 
      id: 'agents', 
      icon: Icons.Users, 
      label: 'Agents', 
      href: '/dashboard/agents',
      children: [
        { id: 'all-agents', label: 'All Agents', href: '/dashboard/agents' },
        { id: 'performance', label: 'Performance', href: '/dashboard/agents/performance' },
      ]
    },
    { id: 'clients', icon: Icons.User, label: 'Clients', href: '/dashboard/clients' },
    { 
      id: 'finance', 
      icon: Icons.CreditCard, 
      label: 'Finance', 
      href: '/dashboard/transactions',
      children: [
        { id: 'transactions', label: 'Transactions', href: '/dashboard/transactions' },
        { id: 'invoices', label: 'Invoices', href: '/dashboard/invoices' },
        { id: 'reports', label: 'Reports', href: '/dashboard/reports' },
      ]
    },
    { id: 'analytics', icon: Icons.BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
    { id: 'settings', icon: Icons.Settings, label: 'Settings', href: '/dashboard/settings' },
  ]

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [isLoading, user, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1A1A1A]"></div>
      </div>
    )
  }
  
  if (!user) return null

  return (
    <div className="flex h-screen bg-gray-50 font-inter">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-200 ease-in-out flex flex-col`}>
        
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#1A1A1A] rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-semibold">EP</span>
              </div>
              <div>
                <h1 className="text-sm font-semibold text-[#1A1A1A]">{siteConfig.name}</h1>
                <p className="text-xs text-gray-500">Real Estate CRM</p>
              </div>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isExpanded = expandedItems.includes(item.id)
            const hasChildren = item.children && item.children.length > 0
            const isActive = activeTab === item.id || (hasChildren && item.children?.some(child => activeTab === child.id))
            
            return (
              <div key={item.id} className="space-y-1">
                <button
                  onClick={() => {
                    if (hasChildren) {
                      toggleExpanded(item.id)
                    } else {
                      setActiveTab(item.id)
                      setSidebarOpen(false)
                      // Navigate to the href
                      window.location.href = item.href
                    }
                  }}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#1A1A1A] to-gray-800 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#1A1A1A]'
                  }`}
                >
                  <Icon size={16} className="mr-3" />
                  <span className="flex-1 text-left">{item.label}</span>
                  
                  {hasChildren && (
                    <div className={`transition-transform duration-200 ${
                      isExpanded ? 'rotate-90' : ''
                    }`}>
                      <ChevronRight size={14} className={isActive ? 'text-white/80' : 'text-gray-400'} />
                    </div>
                  )}
                </button>
                
                {/* Children */}
                {hasChildren && isExpanded && (
                  <div className="ml-6 space-y-1 animate-in slide-in-from-top-1 duration-200">
                    {item.children?.map((child) => (
                      <Link
                        key={child.id}
                        href={child.href}
                        onClick={() => {
                          setActiveTab(child.id)
                          setSidebarOpen(false)
                        }}
                        className={`block px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          activeTab === child.id
                            ? 'bg-gradient-to-r from-gray-100 to-gray-50 text-[#1A1A1A] font-medium border-l-2 border-[#1A1A1A]'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-[#1A1A1A] hover:translate-x-1'
                        }`}
                      >
                        <span className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-gray-300 mr-3"></div>
                          {child.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* User section */}
        <div className="px-4 py-4 border-t border-gray-50">
          <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-[#1A1A1A] to-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#1A1A1A] truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              >
                <Menu size={20} />
              </button>
              
              <div>
                <h2 className="text-lg font-semibold text-[#1A1A1A]">
                  Welcome back, {user.name?.split(' ')[0]}
                </h2>
                <p className="text-sm text-gray-500">{new Date().toDateString()}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Search - Hidden on mobile */}
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search properties, agents..."
                  className="pl-10 pr-4 py-2 w-80 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 focus:border-[#1A1A1A] text-sm bg-gray-50 transition-colors"
                />
              </div>

              {/* Mobile search button */}
              <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600">
                <Search size={18} />
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
                <Bell size={18} />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Add button */}
              <button className="bg-[#1A1A1A] hover:bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-colors shadow-sm">
                <Plus size={16} />
                <span className="hidden sm:inline">Add New</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto px-4 lg:px-6 py-6">
          {children}
        </main>
      </div>
    </div>
  )
}