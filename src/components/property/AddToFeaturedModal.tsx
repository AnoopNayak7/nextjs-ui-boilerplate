'use client'

import { useState } from 'react'
import { X, Search, Calendar } from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface Property {
  id: number
  title: string
  location: string
  type: string
  price: number
}

interface AddToFeaturedModalProps {
  onClose: () => void
  onAdd: (propertyId: number, featuredFrom: Date, featuredUntil: Date, isPaid: boolean) => void
}

export default function AddToFeaturedModal({ onClose, onAdd }: AddToFeaturedModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [startDate, endDate] = dateRange
  const [isPaid, setIsPaid] = useState(true)

  // Mock data - replace with API call
  const properties: Property[] = [
    {
      id: 1,
      title: 'Modern Apartment',
      location: 'Bangalore',
      type: 'Apartment',
      price: 18000000
    },
    {
      id: 2,
      title: 'Garden Villa',
      location: 'Pune',
      type: 'Villa',
      price: 35000000
    }
  ]

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAdd = () => {
    if (selectedProperty && startDate && endDate) {
      onAdd(selectedProperty.id, startDate, endDate, isPaid)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Add Property to Featured</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Properties List */}
          <div className="max-h-48 overflow-y-auto border rounded-lg divide-y">
            {filteredProperties.map(property => (
              <button
                key={property.id}
                onClick={() => setSelectedProperty(property)}
                className={`w-full p-3 text-left hover:bg-gray-50 transition-colors ${selectedProperty?.id === property.id ? 'bg-red-50' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{property.title}</h3>
                    <p className="text-sm text-gray-500">{property.location}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(property.price)}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {selectedProperty && (
            <div className="space-y-4 pt-4 border-t">
              {/* Date Range */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Featured Duration
                </label>
                <div className="flex items-center space-x-2">
                  <Calendar size={18} className="text-gray-400" />
                  <DatePicker
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => setDateRange(update)}
                    className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholderText="Select date range"
                  />
                </div>
              </div>

              {/* Payment Status */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Payment Status
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={isPaid}
                      onChange={() => setIsPaid(true)}
                      className="text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">Paid</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={!isPaid}
                      onChange={() => setIsPaid(false)}
                      className="text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">Special Deal</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!selectedProperty || !startDate || !endDate}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Featured
          </button>
        </div>
      </div>
    </div>
  )
}