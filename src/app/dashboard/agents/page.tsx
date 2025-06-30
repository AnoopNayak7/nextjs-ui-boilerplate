'use client'

import { useState } from 'react'
import { Plus, Search, Ban, CheckCircle, MoreHorizontal } from 'lucide-react'
import AddAgentModal from '../../../components/agent/AddAgentModal'

interface Agent {
  id: number
  name: string
  email: string
  phone: string
  reraId: string
  location: string
  propertiesListed: number
  propertiesSold: number
  rating: number
  isBlocked: boolean
  profileImage?: string
  joinedDate: Date
}

export default function AgentsPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      reraId: 'RERA123456',
      location: 'Mumbai',
      propertiesListed: 15,
      propertiesSold: 8,
      rating: 4.5,
      isBlocked: false,
      joinedDate: new Date('2023-01-15')
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+91 9876543211',
      reraId: 'RERA123457',
      location: 'Bangalore',
      propertiesListed: 12,
      propertiesSold: 6,
      rating: 4.2,
      isBlocked: true,
      joinedDate: new Date('2023-02-20')
    }
  ])

  const handleAddAgent = (newAgent: Omit<Agent, 'id' | 'isBlocked' | 'propertiesListed' | 'propertiesSold' | 'rating'>) => {
    const agent: Agent = {
      ...newAgent,
      id: Date.now(),
      isBlocked: false,
      propertiesListed: 0,
      propertiesSold: 0,
      rating: 0
    }
    setAgents(prev => [...prev, agent])
    setShowAddModal(false)
  }

  const handleToggleBlock = (agentId: number) => {
    setAgents(prev =>
      prev.map(agent =>
        agent.id === agentId
          ? { ...agent, isBlocked: !agent.isBlocked }
          : agent
      )
    )
  }

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-gray-900">Agents</h1>
          <p className="text-xs text-gray-500">
            Manage your real estate agents and brokers
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between gap-4 p-3 bg-white rounded-lg shadow-sm border">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search agents by name, email, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs font-medium"
        >
          <Plus size={14} className="mr-1" />
          Add Agent
        </button>
      </div>

      {/* Agents Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAgents.map((agent) => (
              <tr key={agent.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                      {agent.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <div className="text-xs font-medium text-gray-900">{agent.name}</div>
                      <div className="text-xs text-gray-500">{agent.reraId}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-xs text-gray-900">{agent.email}</div>
                  <div className="text-xs text-gray-500">{agent.phone}</div>
                  <div className="text-xs text-gray-500">{agent.location}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-xs text-gray-900">{agent.propertiesListed} Listed</div>
                  <div className="text-xs text-gray-500">{agent.propertiesSold} Sold</div>
                  <div className="text-xs text-gray-500">{agent.rating} Rating</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      agent.isBlocked
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {agent.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-xs">
                  <button
                    onClick={() => handleToggleBlock(agent.id)}
                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium transition-colors ${
                      agent.isBlocked
                        ? 'text-green-700 hover:bg-green-50'
                        : 'text-red-700 hover:bg-red-50'
                    }`}
                  >
                    {agent.isBlocked ? (
                      <>
                        <CheckCircle size={14} className="mr-1" />
                        Unblock
                      </>
                    ) : (
                      <>
                        <Ban size={14} className="mr-1" />
                        Block
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

      {/* Add Agent Modal */}
      {showAddModal && (
        <AddAgentModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddAgent}
        />
      )}
    </div>
  )
}