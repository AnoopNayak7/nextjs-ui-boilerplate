'use client'

import { useState } from 'react'
import { Plus, X, Check } from 'lucide-react'

interface BankApproval {
  id: number
  bankName: string
  status: 'approved' | 'pending' | 'rejected'
  approvalDate?: string
  remarks?: string
}

interface BankApprovalsFormProps {
  onSubmit: (approvals: BankApproval[]) => void
  initialApprovals?: BankApproval[]
}

const POPULAR_BANKS = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Kotak Mahindra Bank',
  'Union Bank of India',
  'Canara Bank',
  'Yes Bank'
] as const

export default function BankApprovalsForm({ onSubmit, initialApprovals = [] }: BankApprovalsFormProps) {
  const [approvals, setApprovals] = useState<BankApproval[]>(initialApprovals)
  const [newApproval, setNewApproval] = useState<{
    bankName: string;
    status: BankApproval['status'];
    approvalDate: string;
    remarks: string;
  }>({
    bankName: '',
    status: 'pending',
    approvalDate: '',
    remarks: ''
  })
  const [error, setError] = useState<string | null>(null)
  const [showBankSuggestions, setShowBankSuggestions] = useState(false)

  const validateApproval = () => {
    if (!newApproval.bankName.trim()) {
      setError('Bank name is required')
      return false
    }
    if (newApproval.status === 'approved' && !newApproval.approvalDate?.trim()) {
      setError('Approval date is required for approved status')
      return false
    }
    setError(null)
    return true
  }

  const handleAddApproval = () => {
    if (!validateApproval()) return

    const newApprovalWithId: BankApproval = {
      id: Date.now(),
      ...newApproval
    }

    setApprovals(prev => [...prev, newApprovalWithId])
    setNewApproval({
      bankName: '',
      status: 'pending',
      approvalDate: '',
      remarks: ''
    })
  }

  const handleRemoveApproval = (id: number) => {
    setApprovals(prev => prev.filter(approval => approval.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(approvals)
  }

  const filteredBanks = POPULAR_BANKS.filter(bank =>
    bank.toLowerCase().includes(newApproval.bankName.toLowerCase()) &&
    !approvals.some(approval => approval.bankName.toLowerCase() === bank.toLowerCase())
  )

  const getStatusColor = (status: BankApproval['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Add New Approval */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label htmlFor="bank-name" className="block text-sm font-medium text-gray-700 mb-1">
              Bank Name
            </label>
            <input
              id="bank-name"
              type="text"
              value={newApproval.bankName}
              onChange={(e) => {
                setNewApproval(prev => ({ ...prev, bankName: e.target.value }))
                setShowBankSuggestions(true)
              }}
              onFocus={() => setShowBankSuggestions(true)}
              placeholder="Enter bank name"
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            {showBankSuggestions && filteredBanks.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                {filteredBanks.map(bank => (
                  <button
                    key={bank}
                    type="button"
                    onClick={() => {
                      setNewApproval(prev => ({ ...prev, bankName: bank }))
                      setShowBankSuggestions(false)
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {bank}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              value={newApproval.status}
              onChange={(e) => setNewApproval(prev => ({
                ...prev,
                status: e.target.value as BankApproval['status']
              }))}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {newApproval.status === 'approved' && (
            <div>
              <label htmlFor="approval-date" className="block text-sm font-medium text-gray-700 mb-1">
                Approval Date
              </label>
              <input
                id="approval-date"
                type="date"
                value={newApproval.approvalDate}
                onChange={(e) => setNewApproval(prev => ({ ...prev, approvalDate: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          )}

          <div>
            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 mb-1">
              Remarks
            </label>
            <div className="flex space-x-2">
              <input
                id="remarks"
                type="text"
                value={newApproval.remarks}
                onChange={(e) => setNewApproval(prev => ({ ...prev, remarks: e.target.value }))}
                placeholder="Optional remarks"
                className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleAddApproval}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>

      {/* Approvals List */}
      {approvals.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Bank Approvals</h3>
          <div className="space-y-3">
            {approvals.map(approval => (
              <div
                key={approval.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg group"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-700">{approval.bankName}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(approval.status)}`}>
                      {approval.status.charAt(0).toUpperCase() + approval.status.slice(1)}
                    </span>
                  </div>
                  {approval.approvalDate && (
                    <div className="flex items-center space-x-2">
                      <Check size={14} className="text-green-500" />
                      <span className="text-xs text-gray-500">
                        Approved on {new Date(approval.approvalDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {approval.remarks && (
                    <p className="text-xs text-gray-500">{approval.remarks}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveApproval(approval.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded-full text-gray-500 hover:text-red-500 transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
        >
          Save Approvals
        </button>
      </div>
    </form>
  )
}