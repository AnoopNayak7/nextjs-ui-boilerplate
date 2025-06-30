'use client'

import { useState } from 'react'
import { Search, Filter, Download, Calendar, Eye, Plus } from 'lucide-react'

interface Invoice {
  id: number
  invoiceNumber: string
  clientName: string
  amount: number
  issueDate: Date
  dueDate: Date
  status: 'paid' | 'pending' | 'overdue'
  items: Array<{
    description: string
    amount: number
  }>
}

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 1,
      invoiceNumber: 'INV-2024-001',
      clientName: 'Acme Properties',
      amount: 45000,
      issueDate: new Date('2024-01-01'),
      dueDate: new Date('2024-01-31'),
      status: 'pending',
      items: [
        { description: 'Property Listing Fee', amount: 35000 },
        { description: 'Premium Placement', amount: 10000 }
      ]
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-002',
      clientName: 'Metro Realtors',
      amount: 75000,
      issueDate: new Date('2024-01-05'),
      dueDate: new Date('2024-02-04'),
      status: 'paid',
      items: [
        { description: 'Annual Subscription', amount: 50000 },
        { description: 'Featured Listings (5)', amount: 25000 }
      ]
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
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredInvoices = invoices.filter(invoice =>
    invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-gray-900">Invoices</h1>
          <p className="text-xs text-gray-500">
            Manage and track all invoices
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium text-gray-600">
            <Download size={14} className="mr-1" />
            Export
          </button>
          <button className="flex items-center px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs font-medium">
            <Plus size={14} className="mr-1" />
            New Invoice
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between gap-4 p-3 bg-white rounded-lg shadow-sm border">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by invoice number or client name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <button className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-500">
          <Filter size={14} />
        </button>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-xs font-medium text-gray-900">{invoice.invoiceNumber}</div>
                  <div className="text-xs text-gray-500">{invoice.items.length} items</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-xs font-medium text-gray-900">{invoice.clientName}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-xs font-medium text-gray-900">{formatCurrency(invoice.amount)}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar size={12} className="mr-1" />
                    {invoice.issueDate.toLocaleDateString()}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar size={12} className="mr-1" />
                    {invoice.dueDate.toLocaleDateString()}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <button className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded transition-colors">
                    <Eye size={14} className="mr-1" />
                    View
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