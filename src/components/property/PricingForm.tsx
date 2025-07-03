'use client'

import { useState } from 'react'
import { Currency, IndianRupee, Info } from 'lucide-react'

interface PricingFormProps {
  onSubmit: (data: PricingDetails) => void
  initialData?: PricingDetails
  isSaving?: boolean
}

interface PricingDetails {
  totalPrice: number
  pricePerSqFt: number
  bookingAmount: number
  maintenanceCharges: number
  maintenancePeriod: 'monthly' | 'quarterly' | 'yearly'
  otherCharges: number
  paymentPlan: 'full' | 'construction-linked' | 'custom'
  customPaymentPlan?: PaymentMilestone[]
}

interface PaymentMilestone {
  id: number
  milestone: string
  percentage: number
}

const DEFAULT_PRICING: PricingDetails = {
  totalPrice: 0,
  pricePerSqFt: 0,
  bookingAmount: 0,
  maintenanceCharges: 0,
  maintenancePeriod: 'monthly',
  otherCharges: 0,
  paymentPlan: 'full'
}

export default function PricingForm({ onSubmit, initialData = DEFAULT_PRICING, isSaving = false }: PricingFormProps) {
  const [pricing, setPricing] = useState<PricingDetails>(initialData)
  const [milestones, setMilestones] = useState<PaymentMilestone[]>(initialData.customPaymentPlan || [])
  const [newMilestone, setNewMilestone] = useState({ milestone: '', percentage: 0 })
  const [error, setError] = useState<string | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value)
  }

  const handlePricingChange = (field: keyof PricingDetails, value: any) => {
    setPricing(prev => ({
      ...prev,
      [field]: value,
      customPaymentPlan: field === 'paymentPlan' && value !== 'custom' ? undefined : prev.customPaymentPlan
    }))
  }

  const handleAddMilestone = () => {
    if (!newMilestone.milestone.trim()) {
      setError('Milestone description is required')
      return
    }
    if (newMilestone.percentage <= 0 || newMilestone.percentage > 100) {
      setError('Percentage must be between 1 and 100')
      return
    }

    const totalPercentage = milestones.reduce((sum, m) => sum + m.percentage, 0) + newMilestone.percentage
    if (totalPercentage > 100) {
      setError('Total percentage cannot exceed 100%')
      return
    }

    const newMilestoneWithId: PaymentMilestone = {
      id: Date.now(),
      ...newMilestone
    }

    setMilestones(prev => [...prev, newMilestoneWithId])
    setNewMilestone({ milestone: '', percentage: 0 })
    setError(null)
  }

  const handleRemoveMilestone = (id: number) => {
    setMilestones(prev => prev.filter(m => m.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const finalData = {
      ...pricing,
      customPaymentPlan: pricing.paymentPlan === 'custom' ? milestones : undefined
    }
    onSubmit(finalData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Price Details */}
        <div className="space-y-4">
          <div>
            <label htmlFor="total-price" className="block text-sm font-medium text-gray-700 mb-1">
              Total Price
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IndianRupee size={16} className="text-gray-400" />
              </div>
              <input
                id="total-price"
                type="number"
                value={pricing.totalPrice}
                onChange={(e) => handlePricingChange('totalPrice', Number(e.target.value))}
                min="0"
                step="1000"
                className="pl-9 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="price-per-sqft" className="block text-sm font-medium text-gray-700 mb-1">
              Price per sq.ft
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IndianRupee size={16} className="text-gray-400" />
              </div>
              <input
                id="price-per-sqft"
                type="number"
                value={pricing.pricePerSqFt}
                onChange={(e) => handlePricingChange('pricePerSqFt', Number(e.target.value))}
                min="0"
                className="pl-9 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="booking-amount" className="block text-sm font-medium text-gray-700 mb-1">
              Booking Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IndianRupee size={16} className="text-gray-400" />
              </div>
              <input
                id="booking-amount"
                type="number"
                value={pricing.bookingAmount}
                onChange={(e) => handlePricingChange('bookingAmount', Number(e.target.value))}
                min="0"
                className="pl-9 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Additional Charges */}
        <div className="space-y-4">
          <div>
            <label htmlFor="maintenance" className="block text-sm font-medium text-gray-700 mb-1">
              Maintenance Charges
            </label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IndianRupee size={16} className="text-gray-400" />
                </div>
                <input
                  id="maintenance"
                  type="number"
                  value={pricing.maintenanceCharges}
                  onChange={(e) => handlePricingChange('maintenanceCharges', Number(e.target.value))}
                  min="0"
                  className="pl-9 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <select
                value={pricing.maintenancePeriod}
                onChange={(e) => handlePricingChange('maintenancePeriod', e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="other-charges" className="block text-sm font-medium text-gray-700 mb-1">
              Other Charges
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Currency size={16} className="text-gray-400" />
              </div>
              <input
                id="other-charges"
                type="number"
                value={pricing.otherCharges}
                onChange={(e) => handlePricingChange('otherCharges', Number(e.target.value))}
                min="0"
                className="pl-9 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Plan */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Payment Plan
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="relative flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <div>
                <div className="text-sm font-medium text-gray-700">Full Payment</div>
                <div className="text-xs text-gray-500 mt-1">100% payment upfront</div>
              </div>
              <input
                type="radio"
                name="payment-plan"
                value="full"
                checked={pricing.paymentPlan === 'full'}
                onChange={(e) => handlePricingChange('paymentPlan', e.target.value)}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
              />
            </label>

            <label className="relative flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <div>
                <div className="text-sm font-medium text-gray-700">Construction Linked</div>
                <div className="text-xs text-gray-500 mt-1">Pay as per construction stages</div>
              </div>
              <input
                type="radio"
                name="payment-plan"
                value="construction-linked"
                checked={pricing.paymentPlan === 'construction-linked'}
                onChange={(e) => handlePricingChange('paymentPlan', e.target.value)}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
              />
            </label>

            <label className="relative flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <div>
                <div className="text-sm font-medium text-gray-700">Custom Plan</div>
                <div className="text-xs text-gray-500 mt-1">Define custom milestones</div>
              </div>
              <input
                type="radio"
                name="payment-plan"
                value="custom"
                checked={pricing.paymentPlan === 'custom'}
                onChange={(e) => handlePricingChange('paymentPlan', e.target.value)}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
              />
            </label>
          </div>
        </div>

        {/* Custom Payment Plan */}
        {pricing.paymentPlan === 'custom' && (
          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700">Payment Milestones</h4>
              <div className="flex items-center text-xs text-gray-500">
                <Info size={14} className="mr-1" />
                Total: {milestones.reduce((sum, m) => sum + m.percentage, 0)}%
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={newMilestone.milestone}
                onChange={(e) => setNewMilestone(prev => ({ ...prev, milestone: e.target.value }))}
                placeholder="Milestone description"
                className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={newMilestone.percentage}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, percentage: Number(e.target.value) }))}
                  min="1"
                  max="100"
                  placeholder="Percentage"
                  className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddMilestone}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Add
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            {milestones.length > 0 && (
              <div className="space-y-2">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">{index + 1}.</span>
                      <span className="text-sm text-gray-700">{milestone.milestone}</span>
                      <span className="text-sm font-medium text-red-600">{milestone.percentage}%</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveMilestone(milestone.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className={`px-4 py-2 text-white rounded-lg transition-colors text-sm font-medium ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
        >
          {isSaving ? 'Saving...' : 'Save Pricing Details'}
        </button>
      </div>
    </form>
  )
}