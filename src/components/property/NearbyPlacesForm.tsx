'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'

interface NearbyPlace {
  id: number
  name: string
  category: string
  distance: string
}

interface NearbyPlacesFormProps {
  onSubmit: (places: NearbyPlace[]) => void
  initialPlaces?: NearbyPlace[]
  initialData?: {
    distances?: NearbyPlace[]
  }
  isSaving?: boolean
}

const PLACE_CATEGORIES = [
  'School',
  'Hospital',
  'Shopping Mall',
  'Metro Station',
  'Bus Stop',
  'Park',
  'Restaurant',
  'Bank',
  'Supermarket',
  'Other'
] as const

export default function NearbyPlacesForm({ onSubmit, initialPlaces = [], initialData = {}, isSaving = false }: NearbyPlacesFormProps) {
  // Ensure initialData and its properties are properly initialized
  const safeInitialData = initialData || {}
  const safeInitialPlaces = initialPlaces || []
  
  // Use initialData.distances if provided, otherwise fall back to initialPlaces
  const startingPlaces = safeInitialData.distances || safeInitialPlaces
  const [places, setPlaces] = useState<NearbyPlace[]>(startingPlaces || [])
  const [newPlace, setNewPlace] = useState<{
    name: string;
    category: typeof PLACE_CATEGORIES[number];
    distance: string;
  }>({
    name: '',
    category: PLACE_CATEGORIES[0],
    distance: ''
  })
  const [error, setError] = useState<string | null>(null)

  const validatePlace = () => {
    if (!newPlace.name.trim()) {
      setError('Place name is required')
      return false
    }
    if (!newPlace.distance.trim()) {
      setError('Distance is required')
      return false
    }
    // Check if distance is a valid number with unit
    const distancePattern = /^\d+(\.\d+)?\s*(km|m)$/i
    if (!distancePattern.test(newPlace.distance)) {
      setError('Distance must be a number followed by km or m (e.g., 2 km or 500 m)')
      return false
    }
    setError(null)
    return true
  }

  const handleAddPlace = () => {
    if (!validatePlace()) return

    const newPlaceWithId: NearbyPlace = {
      id: Date.now(),
      ...newPlace
    }

    setPlaces(prev => [...prev, newPlaceWithId])
    setNewPlace({
      name: '',
      category: PLACE_CATEGORIES[0],
      distance: ''
    })
  }

  const handleRemovePlace = (id: number) => {
    setPlaces(prev => prev.filter(place => place.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(places)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Add New Place */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="place-name" className="block text-sm font-medium text-gray-700 mb-1">
              Place Name
            </label>
            <input
              id="place-name"
              type="text"
              value={newPlace.name}
              onChange={(e) => setNewPlace(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter place name"
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              value={newPlace.category}
              onChange={(e) => setNewPlace((prev:any) => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
            >
              {PLACE_CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-1">
              Distance
            </label>
            <div className="flex space-x-2">
              <input
                id="distance"
                type="text"
                value={newPlace.distance}
                onChange={(e) => setNewPlace(prev => ({ ...prev, distance: e.target.value }))}
                placeholder="e.g., 2 km or 500 m"
                className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleAddPlace}
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

      {/* Places List */}
      {places.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Added Places</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {places.map(place => (
              <div
                key={place.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">{place.name}</span>
                    <span className="text-xs text-gray-500">{place.distance}</span>
                  </div>
                  <span className="text-xs text-gray-500">{place.category}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemovePlace(place.id)}
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
          disabled={isSaving}
          className={`px-4 py-2 text-white rounded-lg transition-colors text-sm font-medium ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
        >
          {isSaving ? 'Saving...' : 'Save Places'}
        </button>
      </div>
    </form>
  )
}