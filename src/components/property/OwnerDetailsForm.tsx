'use client'

import { useState } from 'react'

interface OwnerDetails {
  name: string
  email: string
  phone: string
  address?: string
  reraId?: string
  companyName?: string
  designation?: string
}

interface OwnerDetailsFormProps {
  ownerType: 'builder' | 'broker' | 'individual' | 'company'
  onSubmit: (details: OwnerDetails) => void
  initialValues?: Partial<OwnerDetails>
}

export default function OwnerDetailsForm({ ownerType, onSubmit, initialValues = {} }: OwnerDetailsFormProps) {
  const [details, setDetails] = useState<OwnerDetails>({
    name: initialValues.name || '',
    email: initialValues.email || '',
    phone: initialValues.phone || '',
    address: initialValues.address || '',
    reraId: initialValues.reraId || '',
    companyName: initialValues.companyName || '',
    designation: initialValues.designation || ''
  })

  const [errors, setErrors] = useState<Partial<Record<keyof OwnerDetails, string>>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof OwnerDetails, string>> = {}

    if (!details.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!details.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!details.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(details.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Invalid phone number format'
    }

    if (ownerType === 'builder' && !details.reraId?.trim()) {
      newErrors.reraId = 'RERA ID is required for builders'
    }

    if (ownerType === 'company' && !details.companyName?.trim()) {
      newErrors.companyName = 'Company name is required'
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

  const handleChange = (field: keyof OwnerDetails, value: string) => {
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
              Full Name
            </label>
            <input
              type="text"
              value={details.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg text-sm ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter full name"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={details.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter email address"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={details.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg text-sm ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter phone number"
            />
            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
          </div>
        </div>

        {/* Additional Information based on owner type */}
        <div className="space-y-4">
          {(ownerType === 'builder' || ownerType === 'broker') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                RERA ID
              </label>
              <input
                type="text"
                value={details.reraId}
                onChange={(e) => handleChange('reraId', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg text-sm ${errors.reraId ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter RERA ID"
              />
              {errors.reraId && <p className="mt-1 text-xs text-red-500">{errors.reraId}</p>}
            </div>
          )}

          {ownerType === 'company' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={details.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-sm ${errors.companyName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter company name"
                />
                {errors.companyName && <p className="mt-1 text-xs text-red-500">{errors.companyName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Designation
                </label>
                <input
                  type="text"
                  value={details.designation}
                  onChange={(e) => handleChange('designation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="Enter designation"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              value={details.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              rows={3}
              placeholder="Enter address"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
        >
          Save Details
        </button>
      </div>
    </form>
  )
}