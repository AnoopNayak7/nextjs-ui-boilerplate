'use client'

import { useState } from 'react'
import { X, Plus, Check } from 'lucide-react'

interface AmenitiesModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (amenities: { inBuilding: string[], society: string[] }) => void
  initialAmenities: {
    inBuilding: string[]
    society: string[]
  }
}

const commonAmenities = {
  inBuilding: [
    'Lift', 'Power Backup', 'Security', 'Gym', 'Pool', 'Clubhouse',
    'Indoor Games', 'Theater', 'Spa', 'Kids Play Area', 'Garden',
    'Conference Room', 'Party Hall', 'Visitor Parking', 'Fire Safety',
    'Service Elevator', 'CCTV', 'Intercom'
  ],
  society: [
    'Gated Community', 'Parks', 'Schools', 'Metro Station',
    'Shopping Complex', 'Hospital', 'ATM', 'Bank', 'Restaurant',
    'Pharmacy', 'Supermarket', 'Temple', 'Bus Stop', 'Petrol Pump',
    'Water Treatment', 'Waste Disposal', 'Rain Water Harvesting'
  ]
}

export default function AmenitiesModal({
  isOpen,
  onClose,
  onSave,
  initialAmenities
}: AmenitiesModalProps) {
  const [selectedAmenities, setSelectedAmenities] = useState(initialAmenities)
  const [customAmenity, setCustomAmenity] = useState('')
  const [amenityType, setAmenityType] = useState<'inBuilding' | 'society'>('inBuilding')

  if (!isOpen) return null

  const handleToggleAmenity = (type: 'inBuilding' | 'society', amenity: string) => {
    setSelectedAmenities(prev => {
      const isSelected = prev[type].includes(amenity)
      return {
        ...prev,
        [type]: isSelected
          ? prev[type].filter(a => a !== amenity)
          : [...prev[type], amenity]
      }
    })
  }

  const handleAddCustomAmenity = () => {
    if (customAmenity.trim()) {
      setSelectedAmenities(prev => ({
        ...prev,
        [amenityType]: [...prev[amenityType], customAmenity.trim()]
      }))
      setCustomAmenity('')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-4 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold text-gray-900">Manage Amenities</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Tabs */}
          <div className="flex space-x-4 border-b">
            <button
              onClick={() => setAmenityType('inBuilding')}
              className={`pb-2 text-xs font-medium ${amenityType === 'inBuilding' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500'}`}
            >
              In Building
            </button>
            <button
              onClick={() => setAmenityType('society')}
              className={`pb-2 text-xs font-medium ${amenityType === 'society' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500'}`}
            >
              Society/Area
            </button>
          </div>

          {/* Amenities Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {commonAmenities[amenityType].map((amenity) => (
              <div
                key={amenity}
                onClick={() => handleToggleAmenity(amenityType, amenity)}
                className={`flex items-center p-2 rounded-lg cursor-pointer text-xs ${selectedAmenities[amenityType].includes(amenity) ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'}`}
              >
                <div className={`w-4 h-4 rounded border mr-2 flex items-center justify-center ${selectedAmenities[amenityType].includes(amenity) ? 'border-red-600 bg-red-600' : 'border-gray-300'}`}>
                  {selectedAmenities[amenityType].includes(amenity) && (
                    <Check size={12} className="text-white" />
                  )}
                </div>
                {amenity}
              </div>
            ))}
          </div>

          {/* Custom Amenity Input */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={customAmenity}
              onChange={(e) => setCustomAmenity(e.target.value)}
              placeholder="Add custom amenity"
              className="flex-1 text-xs p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-red-500"
            />
            <button
              onClick={handleAddCustomAmenity}
              disabled={!customAmenity.trim()}
              className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
            >
              <Plus size={12} className="mr-1" />
              Add
            </button>
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(selectedAmenities)
              onClose()
            }}
            className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}