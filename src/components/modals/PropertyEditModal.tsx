'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface PropertyDetails {
  name: string
  type: string
  bhk: string
  area: string
  floor: string
  age: string
  parking: string
  facing: string
  reraNumber: string
}

interface PropertyEditModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (details: PropertyDetails) => void
  initialDetails: PropertyDetails
}

export default function PropertyEditModal({
  isOpen,
  onClose,
  onSave,
  initialDetails
}: PropertyEditModalProps) {
  const [details, setDetails] = useState<PropertyDetails>(initialDetails)
  const [errors, setErrors] = useState<Partial<Record<keyof PropertyDetails, string>>>({})

  if (!isOpen) return null

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PropertyDetails, string>> = {}

    if (!details.name.trim()) {
      newErrors.name = 'Property name is required'
    }

    if (!details.type) {
      newErrors.type = 'Property type is required'
    }

    if (!details.area.trim()) {
      newErrors.area = 'Area is required'
    } else if (isNaN(Number(details.area.replace(/[^0-9]/g, '')))) {
      newErrors.area = 'Area must be a number'
    }

    if (!details.bhk) {
      newErrors.bhk = 'BHK is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (field: keyof PropertyDetails, value: string) => {
    setDetails(prev => ({
      ...prev,
      [field]: value
    }))
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(details)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-4 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold text-gray-900">Edit Property Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Property Name */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Property Name*
            </label>
            <input
              type="text"
              value={details.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full p-2 text-xs border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Property Type*
            </label>
            <select
              value={details.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className={`w-full p-2 text-xs border ${errors.type ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            >
              <option value="">Select Type</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="plot">Plot</option>
              <option value="commercial">Commercial</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-xs text-red-600">{errors.type}</p>
            )}
          </div>

          {/* BHK */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              BHK*
            </label>
            <select
              value={details.bhk}
              onChange={(e) => handleChange('bhk', e.target.value)}
              className={`w-full p-2 text-xs border ${errors.bhk ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            >
              <option value="">Select BHK</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4 BHK</option>
              <option value="5+">5+ BHK</option>
            </select>
            {errors.bhk && (
              <p className="mt-1 text-xs text-red-600">{errors.bhk}</p>
            )}
          </div>

          {/* Area */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Area (sq ft)*
            </label>
            <input
              type="text"
              value={details.area}
              onChange={(e) => handleChange('area', e.target.value)}
              className={`w-full p-2 text-xs border ${errors.area ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            />
            {errors.area && (
              <p className="mt-1 text-xs text-red-600">{errors.area}</p>
            )}
          </div>

          {/* Floor */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Floor
            </label>
            <input
              type="text"
              value={details.floor}
              onChange={(e) => handleChange('floor', e.target.value)}
              className="w-full p-2 text-xs border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Age
            </label>
            <select
              value={details.age}
              onChange={(e) => handleChange('age', e.target.value)}
              className="w-full p-2 text-xs border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select Age</option>
              <option value="under_construction">Under Construction</option>
              <option value="newly_built">Newly Built</option>
              <option value="less_than_5">Less than 5 years</option>
              <option value="5_to_10">5-10 years</option>
              <option value="more_than_10">More than 10 years</option>
            </select>
          </div>

          {/* Parking */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Parking
            </label>
            <select
              value={details.parking}
              onChange={(e) => handleChange('parking', e.target.value)}
              className="w-full p-2 text-xs border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select Parking</option>
              <option value="none">None</option>
              <option value="1">1 Car</option>
              <option value="2">2 Cars</option>
              <option value="3+">3+ Cars</option>
            </select>
          </div>

          {/* Facing */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Facing
            </label>
            <select
              value={details.facing}
              onChange={(e) => handleChange('facing', e.target.value)}
              className="w-full p-2 text-xs border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select Facing</option>
              <option value="north">North</option>
              <option value="south">South</option>
              <option value="east">East</option>
              <option value="west">West</option>
              <option value="north_east">North East</option>
              <option value="north_west">North West</option>
              <option value="south_east">South East</option>
              <option value="south_west">South West</option>
            </select>
          </div>

          {/* RERA Number */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              RERA Number
            </label>
            <input
              type="text"
              value={details.reraNumber}
              onChange={(e) => handleChange('reraNumber', e.target.value)}
              className="w-full p-2 text-xs border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-medium hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}