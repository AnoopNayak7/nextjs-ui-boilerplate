'use client'

import { useState } from 'react'
import { Search, ArrowUpRight, ArrowDownRight, Filter, Download, Calendar } from 'lucide-react'

interface Transaction {
  id: number
  type: 'credit' | 'debit'
  amount: number
  description: string
  category: string
  date: Date
  status: 'completed' | 'pending' | 'failed'
  reference: string
}

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      type: 'credit',
      amount: 25000,
      description: 'Property Listing Fee',
      category: 'Listing',
      date: new Date('2024-01-15T10:30:00'),
      status: 'completed',
      reference: 'TXN123456'
    },
    {
      id: 2,
      type: 'debit',
      amount: 5000,
      description: 'Agent Commission Payout',
      category: 'Commission',
      date: new Date('2024-01-14T15:45:00'),
      status: 'pending',
      reference: 'TXN123457'
    }
  ])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.reference.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-gray-900">Transactions</h1>
          <p className="text-xs text-gray-500">
            View and manage all financial transactions
          </p>
        </div>
        <button className="flex items-center px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium text-gray-600">
          <Download size={14} className="mr-1" />
          Export
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between gap-4 p-3 bg-white rounded-lg shadow-sm border">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by description, category, or reference..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <button className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-500">
          <Filter size={14} />
        </button>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`p-1.5 rounded-full ${transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'} mr-3`}>
                      {transaction.type === 'credit' ? (
                        <ArrowUpRight size={14} className="text-green-600" />
                      ) : (
                        <ArrowDownRight size={14} className="text-red-600" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-900">{transaction.description}</div>
                      <div className="text-xs text-gray-500">{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {transaction.category}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`text-xs font-medium ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'credit' ? '+' : '-'} {formatCurrency(transaction.amount)}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar size={12} className="mr-1" />
                    {transaction.date.toLocaleString()}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <span className="text-xs text-gray-500 font-mono">{transaction.reference}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}