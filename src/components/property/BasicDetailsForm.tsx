'use client'

import { useState } from 'react'

interface PropertyBasicDetails {
  title: string
  type: string
  bhk: string
  superBuiltUpArea: string
  carpetArea: string
  floor: string
  totalFloors: string
  age: string
  parking: string
  facing: string
  reraNumber: string
  price: string
  description: string
}

interface BasicDetailsFormProps {
  onSubmit: (details: PropertyBasicDetails) => void
  initialValues?: Partial<PropertyBasicDetails>
}

export default function BasicDetailsForm({ onSubmit, initialValues = {} }: BasicDetailsFormProps) {
  const [details, setDetails] = useState<PropertyBasicDetails>({
    title: initialValues.title || '',
    type: initialValues.type || '',
    bhk: initialValues.bhk || '',
    superBuiltUpArea: initialValues.superBuiltUpArea || '',
    carpetArea: initialValues.carpetArea || '',
    floor: initialValues.floor || '',
    totalFloors: initialValues.totalFloors || '',
    age: initialValues.age || '',
    parking: initialValues.parking || '',
    facing: initialValues.facing || '',
    reraNumber: initialValues.reraNumber || '',
    price: initialValues.price || '',
    description: initialValues.description || ''
  })

  const [errors, setErrors] = useState<Partial<Record<keyof PropertyBasicDetails, string>>>({})

  const propertyTypes = ['Apartment', 'Villa', 'House', 'Penthouse', 'Studio', 'Plot', 'Commercial']
  const bhkOptions = ['1 RK', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', '5+ BHK']
  const facingOptions = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West']

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PropertyBasicDetails, string>> = {}

    if (!details.title.trim()) {
      newErrors.title = 'Property title is required'
    }

    if (!details.type) {
      newErrors.type = 'Property type is required'
    }

    if (!details.superBuiltUpArea.trim()) {
      newErrors.superBuiltUpArea = 'Super built-up area is required'
    } else if (isNaN(Number(details.superBuiltUpArea.replace(/[^0-9.]/g, '')))) {
      newErrors.superBuiltUpArea = 'Invalid area format'
    }

    if (!details.price.trim()) {
      newErrors.price = 'Price is required'
    } else if (isNaN(Number(details.price.replace(/[^0-9.]/g, '')))) {
      newErrors.price = 'Invalid price format'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(details)
    }
  }

  const handleChange = (field: keyof PropertyBasicDetails, value: string) => {
    setDetails(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Title
            </label>
            <input
              type="text"
              value={details.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg text-sm ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter property title"
            />
            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Type
            </label>
            <select
              value={details.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg text-sm ${errors.type ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select property type</option>
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.type && <p className="mt-1 text-xs text-red-500">{errors.type}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Configuration
            </label>
            <select
              value={details.bhk}
              onChange={(e) => handleChange('bhk', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">Select configuration</option>
              {bhkOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Super Built-up Area (sq ft)
            </label>
            <input
              type="text"
              value={details.superBuiltUpArea}
              onChange={(e) => handleChange('superBuiltUpArea', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg text-sm ${errors.superBuiltUpArea ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter super built-up area"
            />
            {errors.superBuiltUpArea && <p className="mt-1 text-xs text-red-500">{errors.superBuiltUpArea}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Carpet Area (sq ft)
            </label>
            <input
              type="text"
              value={details.carpetArea}
              onChange={(e) => handleChange('carpetArea', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="Enter carpet area"
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Floor
              </label>
              <input
                type="text"
                value={details.floor}
                onChange={(e) => handleChange('floor', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Floor number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Floors
              </label>
              <input
                type="text"
                value={details.totalFloors}
                onChange={(e) => handleChange('totalFloors', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Total floors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Age
            </label>
            <input
              type="text"
              value={details.age}
              onChange={(e) => handleChange('age', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="e.g., 2 years"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parking
            </label>
            <input
              type="text"
              value={details.parking}
              onChange={(e) => handleChange('parking', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="e.g., 2 Covered"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Facing
            </label>
            <select
              value={details.facing}
              onChange={(e) => handleChange('facing', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">Select facing</option>
              {facingOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (₹)
            </label>
            <input
              type="text"
              value={details.price}
              onChange={(e) => handleChange('price', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg text-sm ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter price"
            />
            {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={details.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          rows={4}
          placeholder="Enter property description"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
        >
          Save Details
        </button>
      </div>
    </form>
  )
}