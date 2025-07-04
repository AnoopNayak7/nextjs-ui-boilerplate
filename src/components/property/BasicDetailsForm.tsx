'use client'

import { useState, useEffect } from 'react'
import { Check, ChevronsUpDown, User, Building } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { agentsApi, buildersApi } from '@/lib/api'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface PropertyBasicDetails {
  title: string
  type: string
  propertyType: string // rent or sell
  bhk: string
  superBuiltUpArea: string
  carpetArea: string
  floor: string
  totalFloors: string
  age: string
  parking: string
  facing: string
  reraNumber?: string
  price: string
  description: string
  agentId?: string
  builderId?: string
}

interface BasicDetailsFormProps {
  onSubmit: (details: PropertyBasicDetails) => void
  initialValues?: Partial<PropertyBasicDetails>
  isSaving?: boolean
}

export default function BasicDetailsForm({ onSubmit, initialValues = {}, isSaving = false }: BasicDetailsFormProps) {
  // Ensure initialValues is properly initialized
  const safeInitialValues = initialValues || {}

  const [details, setDetails] = useState<PropertyBasicDetails>({
    title: safeInitialValues?.title || '',
    type: safeInitialValues?.type || '',
    propertyType: safeInitialValues?.propertyType || 'sell',
    bhk: safeInitialValues?.bhk || '',
    superBuiltUpArea: safeInitialValues?.superBuiltUpArea || '',
    carpetArea: safeInitialValues?.carpetArea || '',
    floor: safeInitialValues?.floor || '',
    totalFloors: safeInitialValues?.totalFloors || '',
    age: safeInitialValues?.age || '',
    parking: safeInitialValues?.parking || '',
    facing: safeInitialValues?.facing || '',
    reraNumber: safeInitialValues?.reraNumber || '',
    price: safeInitialValues?.price || '',
    description: safeInitialValues?.description || '',
    agentId: safeInitialValues?.agentId || '',
    builderId: safeInitialValues?.builderId || ''
  })

  const [errors, setErrors] = useState<Partial<Record<keyof PropertyBasicDetails, string>>>({})

  const propertyTypes = ['Apartment', 'Villa', 'House', 'Penthouse', 'Studio', 'Plot', 'Commercial']
  const propertyListingTypes = ['rent', 'sell']
  const bhkOptions = ['1 RK', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', '5+ BHK']
  const facingOptions = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West']

  // State for agent/builder selection
  const [agentSearchTerm, setAgentSearchTerm] = useState('')
  const [builderSearchTerm, setBuilderSearchTerm] = useState('')
  const [agentResults, setAgentResults] = useState<any[]>([])
  const [builderResults, setBuilderResults] = useState<any[]>([])
  const [showAgentDropdown, setShowAgentDropdown] = useState(false)
  const [showBuilderDropdown, setShowBuilderDropdown] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const [selectedBuilder, setSelectedBuilder] = useState<any>(null)

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PropertyBasicDetails, string>> = {}

    if (!details.title.trim()) {
      newErrors.title = 'Property title is required'
    }

    if (!details.type) {
      newErrors.type = 'Property type is required'
    }

    if (!details.propertyType) {
      newErrors.propertyType = 'Property listing type is required'
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

  // Function to search agents
  const handleAgentSearch = async (term: string) => {
    setAgentSearchTerm(term)

    if (term.length < 2) {
      setAgentResults([])
      return
    }

    try {
      // Search agents
      const agentsData = await agentsApi.search(term)
      setAgentResults(agentsData.data?.agents || [])
    } catch (error) {
      console.error('Error searching agents:', error)
    }
  }

  console.log("agentResultsagentResults", agentResults)

  // Function to search builders
  const handleBuilderSearch = async (term: string) => {
    setBuilderSearchTerm(term)

    if (term.length < 2) {
      setBuilderResults([])
      return
    }

    try {
      // Search builders
      const buildersData = await buildersApi.search(term)
      setBuilderResults(buildersData.data?.builders || [])
    } catch (error) {
      console.error('Error searching builders:', error)
    }
  }

  // Function to select an agent
  const selectAgent = (agent: any) => {
    setSelectedAgent(agent)
    setDetails(prev => ({ ...prev, agentId: agent.id }))
    setShowAgentDropdown(false)
  }

  // Function to select a builder
  const selectBuilder = (builder: any) => {
    setSelectedBuilder(builder)
    setDetails(prev => ({ ...prev, builderId: builder.id }))
    setShowBuilderDropdown(false)
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
              Property Listing Type
            </label>
            <select
              value={details.propertyType}
              onChange={(e) => handleChange('propertyType', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg text-sm ${errors.propertyType ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select listing type</option>
              {propertyListingTypes.map(type => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
            {errors.propertyType && <p className="mt-1 text-xs text-red-500">{errors.propertyType}</p>}
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

      {/* Agent/Builder Selection */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Agent (Optional)
          </label>
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search for an agent"
                  value={agentSearchTerm}
                  onChange={(e) => handleAgentSearch(e.target.value)}
                  onFocus={() => setShowAgentDropdown(true)}
                  className="w-full pr-10"
                />
                <DropdownMenu open={showAgentDropdown && agentResults.length > 0} onOpenChange={setShowAgentDropdown}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={(e) => {
                        e.preventDefault()
                        setShowAgentDropdown(!showAgentDropdown)
                      }}
                    >
                      <ChevronsUpDown className="h-4 w-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[--radix-dropdown-trigger-width] max-h-60">
                    {agentResults.map(agent => (
                      <DropdownMenuItem
                        key={agent.id}
                        onClick={() => selectAgent(agent)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <User className="h-4 w-4 text-gray-500" />
                        <div>
                          <div className="font-medium">{agent.firstName} {agent.lastName}</div>
                          <div className="text-xs text-gray-500">{agent.agentType}</div>
                        </div>
                        {selectedAgent?.id === agent.id && (
                          <Check className="h-4 w-4 ml-auto text-green-500" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {selectedAgent && (
                <div className="px-3 py-1 bg-gray-100 rounded-lg flex items-center">
                  <span className="text-sm">{selectedAgent.firstName} {selectedAgent.lastName}</span>
                  <button
                    type="button"
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      setSelectedAgent(null)
                      setDetails(prev => ({ ...prev, agentId: '' }))
                    }}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Builder (Optional)
          </label>
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search for a builder"
                  value={builderSearchTerm}
                  onChange={(e) => handleBuilderSearch(e.target.value)}
                  onFocus={() => setShowBuilderDropdown(true)}
                  className="w-full pr-10"
                />
                <DropdownMenu open={showBuilderDropdown && builderResults.length > 0} onOpenChange={setShowBuilderDropdown}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={(e) => {
                        e.preventDefault()
                        setShowBuilderDropdown(!showBuilderDropdown)
                      }}
                    >
                      <ChevronsUpDown className="h-4 w-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[--radix-dropdown-trigger-width] max-h-60">
                    {builderResults.map(builder => (
                      <DropdownMenuItem
                        key={builder.id}
                        onClick={() => selectBuilder(builder)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Building className="h-4 w-4 text-gray-500" />
                        <div>
                          <div className="font-medium">{builder.companyName}</div>
                          <div className="text-xs text-gray-500">{builder.city}, {builder.state}</div>
                        </div>
                        {selectedBuilder?.id === builder.id && (
                          <Check className="h-4 w-4 ml-auto text-green-500" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {selectedBuilder && (
                <div className="px-3 py-1 bg-gray-100 rounded-lg flex items-center">
                  <span className="text-sm">{selectedBuilder.companyName}</span>
                  <button
                    type="button"
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      setSelectedBuilder(null)
                      setDetails(prev => ({ ...prev, builderId: '' }))
                    }}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {details.propertyType === 'sell' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            RERA Number (Optional)
          </label>
          <input
            type="text"
            value={details.reraNumber}
            onChange={(e) => handleChange('reraNumber', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            placeholder="Enter RERA number"
          />
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className={`px-4 py-2 ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'} text-white rounded-lg transition-colors text-sm font-medium`}
        >
          {isSaving ? 'Saving...' : 'Save Details'}
        </button>
      </div>
    </form>
  )
}
