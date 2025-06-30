'use client'

import { useState } from 'react'
import { Plus, Search, Ban, CheckCircle, MoreHorizontal, Mail, Phone, Calendar } from 'lucide-react'

interface User {
  id: number
  name: string
  email: string
  phone: string
  role: 'admin' | 'user' | 'manager'
  status: 'active' | 'inactive'
  lastLogin: Date
  joinedDate: Date
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex@example.com',
      phone: '+91 9876543210',
      role: 'admin',
      status: 'active',
      lastLogin: new Date('2024-01-15T10:30:00'),
      joinedDate: new Date('2023-01-15')
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+91 9876543211',
      role: 'manager',
      status: 'active',
      lastLogin: new Date('2024-01-14T15:45:00'),
      joinedDate: new Date('2023-02-20')
    }
  ])

  const handleToggleStatus = (userId: number) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
          : user
      )
    )
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800'
      case 'manager':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-gray-900">Users</h1>
          <p className="text-xs text-gray-500">
            Manage system users and their permissions
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between gap-4 p-3 bg-white rounded-lg shadow-sm border">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <button
          className="flex items-center px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-xs font-medium"
        >
          <Plus size={14} className="mr-1" />
          Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                      {user.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <div className="text-xs font-medium text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-500">Joined {user.joinedDate.toLocaleDateString()}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center text-xs text-gray-900">
                    <Mail size={12} className="mr-1" />
                    {user.email}
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Phone size={12} className="mr-1" />
                    {user.phone}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar size={12} className="mr-1" />
                    {user.lastLogin.toLocaleString()}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-xs">
                  <button
                    onClick={() => handleToggleStatus(user.id)}
                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium transition-colors ${
                      user.status === 'inactive'
                        ? 'text-green-700 hover:bg-green-50'
                        : 'text-red-700 hover:bg-red-50'
                    }`}
                  >
                    {user.status === 'inactive' ? (
                      <>
                        <CheckCircle size={14} className="mr-1" />
                        Activate
                      </>
                    ) : (
                      <>
                        <Ban size={14} className="mr-1" />
                        Deactivate
                      </>
                    )}
                  </button>
                  <button className="ml-2 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                    <MoreHorizontal size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}