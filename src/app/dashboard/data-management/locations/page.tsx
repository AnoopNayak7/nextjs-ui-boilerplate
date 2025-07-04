'use client'

import { useState, useEffect } from 'react'
import { MapPin, Plus, ChevronRight, Edit2, Trash2 } from 'lucide-react'
import { locationsApi } from '@/lib/api'

interface City {
  name: string
  properties: any
}

interface State {
  name: string
  cities: City[]
}

interface LocationData {
  name: string
  states: State[]
}

export default function LocationsPage() {
  const [locationData, setLocationData] = useState<LocationData | null>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Modal states
  const [isAddStateModalOpen, setIsAddStateModalOpen] = useState(false)
  const [isAddCityModalOpen, setIsAddCityModalOpen] = useState(false)
  const [newStateName, setNewStateName] = useState('')
  const [newCityData, setNewCityData] = useState<City>({
    name: '',
    properties: {
      pinCodes: [''],
      landmarks: [''],
      areas: [''],
      propertyTypes: [''],
      amenities: ['']
    }
  })

  useEffect(() => {
    fetchLocationData()
  }, [])

  const fetchLocationData = async () => {
    try {
      const data = await locationsApi.getAll()
      setLocationData(data)
      setIsLoading(false)
    } catch (err) {
      setError('Failed to fetch location data')
      setIsLoading(false)
    }
  }

  const handleAddState = async () => {
    try {
      await locationsApi.addState(newStateName)
      fetchLocationData()
      setIsAddStateModalOpen(false)
      setNewStateName('')
    } catch (err) {
      setError('Failed to add state')
    }
  }

  const handleAddCity = async () => {
    if (!selectedState) return

    try {
      await locationsApi.addCity(selectedState, newCityData)
      fetchLocationData()
      setIsAddCityModalOpen(false)
      setNewCityData({
        name: '',
        properties: {
          pinCodes: [''],
          landmarks: [''],
          areas: [''],
          propertyTypes: [''],
          amenities: ['']
        }
      })
    } catch (err) {
      setError('Failed to add city')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Location Management</h1>
            <p className="text-gray-600 mt-1">Manage states and cities for property listings</p>
          </div>
          <button
            onClick={() => setIsAddStateModalOpen(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Add State</span>
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* States List */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">States</h2>
            <div className="space-y-2">
              {locationData?.states.map((state) => (
                <button
                  key={state.name}
                  onClick={() => setSelectedState(state.name)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${selectedState === state.name ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex items-center space-x-3">
                    <MapPin size={18} />
                    <span>{state.name}</span>
                  </div>
                  <ChevronRight size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Cities List */}
          {selectedState && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Cities in {selectedState}</h2>
                <button
                  onClick={() => setIsAddCityModalOpen(true)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="space-y-2">
                {locationData?.states
                  .find((state) => state.name === selectedState)
                  ?.cities?.map((city) => (
                    <button
                      key={city.name}
                      onClick={() => setSelectedCity(city.name)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${selectedCity === city.name ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'}`}
                    >
                      <span>{city.name}</span>
                      <div className="flex items-center space-x-2">
                        <Edit2 size={16} />
                        <Trash2 size={16} />
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* City Details */}
          {selectedCity && selectedState && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">City Details</h2>
              {locationData?.states
                .find((state) => state.name === selectedState)
                ?.cities.find((city) => city.name === selectedCity)
                ?.properties && (
                <div className="space-y-4">
                  {Object.entries(locationData?.states
                    .find((state) => state.name === selectedState)
                    ?.cities.find((city) => city.name === selectedCity)
                    ?.properties || {}).map(([key, values]) => (
                    <div key={key} className="space-y-2">
                      <h3 className="font-medium text-gray-900 capitalize">{key}</h3>
                      <div className="flex flex-wrap gap-2">
                        {(values as string[]).map((value) => (
                          <span
                            key={value}
                            className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                          >
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add State Modal */}
      {isAddStateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-xl font-semibold mb-4">Add New State</h2>
            <input
              type="text"
              value={newStateName}
              onChange={(e) => setNewStateName(e.target.value)}
              placeholder="Enter state name"
              className="w-full p-2 border rounded-lg mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAddStateModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleAddState}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Add State
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add City Modal */}
      {isAddCityModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[600px]">
            <h2 className="text-xl font-semibold mb-4">Add New City</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={newCityData.name}
                onChange={(e) => setNewCityData({ ...newCityData, name: e.target.value })}
                placeholder="Enter city name"
                className="w-full p-2 border rounded-lg"
              />
              {Object.entries(newCityData.properties || {}).map(([key, values]) => (
                <div key={key} className="space-y-2">
                  <label className="block font-medium text-gray-900 capitalize">{key}</label>
                  <input
                    type="text"
                    value={(values as string[]).join(', ')}
                    onChange={(e) => {
                      const newValues = e.target.value.split(',').map((v) => v.trim())
                      setNewCityData({
                        ...newCityData,
                        properties: {
                          ...newCityData.properties,
                          [key]: newValues
                        }
                      })
                    }}
                    placeholder={`Enter ${key} (comma-separated)`}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setIsAddCityModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCity}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Add City
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}