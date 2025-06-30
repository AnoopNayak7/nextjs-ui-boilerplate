'use client'

import { useState } from 'react'
import { Calendar, Filter, Plus, X } from 'lucide-react'
import AddToFeaturedModal from '@/components/property/AddToFeaturedModal'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface FeaturedProperty {
  id: number
  title: string
  location: string
  price: number
  type: string
  featuredFrom: Date
  featuredUntil: Date
  isPaid: boolean
}

export default function FeaturedPropertiesPage() {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [startDate, endDate] = dateRange
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null)

  // Mock data - replace with actual API calls
  const [featuredProperties, setFeaturedProperties] = useState<FeaturedProperty[]>([
    {
      id: 1,
      title: 'Luxury Villa',
      location: 'Mumbai',
      price: 25000000,
      type: 'Villa',
      featuredFrom: new Date('2024-01-01'),
      featuredUntil: new Date('2024-02-01'),
      isPaid: true
    },
    {
      id: 2,
      title: 'Sea View Apartment',
      location: 'Goa',
      price: 15000000,
      type: 'Apartment',
      featuredFrom: new Date('2024-01-15'),
      featuredUntil: new Date('2024-02-15'),
      isPaid: false
    }
  ])

  const handleRemoveFromFeatured = (id: number) => {
    setFeaturedProperties(prev => prev.filter(prop => prop.id !== id))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Featured Properties</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your featured property listings
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Add to Featured
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border">
        <div className="flex items-center space-x-2">
          <Calendar size={18} className="text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Date Range:</span>
        </div>
        <div className="flex items-center space-x-2">
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => setDateRange(update)}
            className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholderText="Select date range"
          />
        </div>
        <button
          onClick={() => setDateRange([null, null])}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      </div>

      {/* Properties List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProperties.map(property => (
          <div
            key={property.id}
            className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{property.title}</h3>
                  <p className="text-sm text-gray-500">{property.location}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${property.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {property.isPaid ? 'Paid' : 'Special'}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-900">
                  {formatCurrency(property.price)}
                </p>
                <p className="text-sm text-gray-500">{property.type}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-gray-500">
                  Featured from: {property.featuredFrom.toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-500">
                  Featured until: {property.featuredUntil.toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() => handleRemoveFromFeatured(property.id)}
                className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Remove from Featured
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add to Featured Modal */}
      {showAddModal && (
        <AddToFeaturedModal
          onClose={() => setShowAddModal(false)}
          onAdd={(propertyId, featuredFrom, featuredUntil, isPaid) => {
            setFeaturedProperties(prev => [
              ...prev,
              {
                id: propertyId,
                title: 'New Featured Property', // This would come from the actual property data
                location: 'Location', // This would come from the actual property data
                price: 0, // This would come from the actual property data
                type: 'Property', // This would come from the actual property data
                featuredFrom,
                featuredUntil,
                isPaid
              }
            ])
            setShowAddModal(false)
          }}
        />
      )}
    </div>
  )
}