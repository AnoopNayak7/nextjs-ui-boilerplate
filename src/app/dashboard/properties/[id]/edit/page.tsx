'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import BasicDetailsForm from '@/components/property/BasicDetailsForm'
import MediaUploadForm from '@/components/property/MediaUploadForm'
import PricingForm from '@/components/property/PricingForm'
import NearbyPlacesForm from '@/components/property/NearbyPlacesForm'
import BankApprovalsForm from '@/components/property/BankApprovalsForm'
import DocumentsForm from '@/components/property/DocumentsForm'

export default function EditPropertyPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [property, setProperty] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<any>({
    basicDetails: {},
    media: {},
    pricing: {},
    documents: {},
    nearbyPlaces: {},
    bankApprovals: {}
  })
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/v1/properties/${params.id}`)
        const result = await response.json()
        
        if (result.success) {
          setProperty(result.data)
          // Initialize form data with property data
          setFormData({
            basicDetails: {
              title: result.data.title || '',
              description: result.data.description || '',
              type: result.data.type || '',
              propertyType: result.data.propertyType || 'sell',
              bedrooms: result.data.bedrooms || result.data.bhk || '',
              bathrooms: result.data.bathrooms || '',
              superBuiltUpArea: result.data.superBuiltUpArea || result.data.area || '',
              carpetArea: result.data.carpetArea || '',
              floor: result.data.floor || '',
              totalFloors: result.data.totalFloors || '',
              age: result.data.age || '',
              facing: result.data.facing || '',
              location: result.data.location || '',
              agentId: result.data.agentId || '',
              builderId: result.data.builderId || ''
            },
            media: {
              images: result.data.images || []
            },
            pricing: {
              price: result.data.price || '',
              maintenanceCharges: result.data.maintenanceCharges || '',
              bookingAmount: result.data.bookingAmount || '',
              otherCharges: result.data.otherCharges || ''
            },
            documents: {
              documents: result.data.documents || {}
            },
            nearbyPlaces: {
              distances: result.data.distances || {}
            },
            bankApprovals: {
              banks: result.data.banks || []
            }
          })
        } else {
          setError(result.error?.message || 'Failed to fetch property details')
        }
      } catch (error) {
        console.error('Error fetching property:', error)
        setError('An error occurred while fetching property details')
      } finally {
        setLoading(false)
      }
    }
    
    fetchProperty()
  }, [params.id])

  type StepData = Record<string, any>

  const handleStepSubmit = (stepData: StepData, step: number) => {
    // Update form data for the current step
    setFormData({
      ...formData,
      [getStepKey(step)]: stepData
    })

    // Move to the next step or submit if on the last step
    if (step < 6) {
      setCurrentStep(step + 1)
    } else {
      submitProperty()
    }
  }

  const getStepKey = (step: number) => {
    switch (step) {
      case 1: return 'basicDetails'
      case 2: return 'media'
      case 3: return 'pricing'
      case 4: return 'documents'
      case 5: return 'nearbyPlaces'
      case 6: return 'bankApprovals'
      default: return 'basicDetails'
    }
  }

  const submitProperty = async () => {
    try {
      setSaving(true)
      setSaveError('')

      // Prepare property data from all form sections
      const propertyData = {
        ...formData.basicDetails,
        images: formData.media.images,
        ...formData.pricing,
        documents: formData.documents.documents,
        distances: formData.nearbyPlaces.distances,
        banks: formData.bankApprovals.banks
      }

      // Send PUT request to update property
      const response = await fetch(`/api/v1/properties/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(propertyData)
      })

      const result = await response.json()

      if (result.success) {
        // Redirect to property details page on success
        router.push(`/dashboard/properties/${params.id}`)
      } else {
        setSaveError(result.error?.message || 'Failed to update property')
      }
    } catch (error) {
      console.error('Error updating property:', error)
      setSaveError('An error occurred while updating the property')
    } finally {
      setSaving(false)
    }
  }

  const renderStepForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicDetailsForm 
            onSubmit={(data) => handleStepSubmit(data, 1)} 
            initialValues={formData.basicDetails}
            isSaving={saving}
          />
        )
      case 2:
        return (
          <MediaUploadForm 
            onSubmit={(data) => handleStepSubmit(data, 2)} 
            initialData={formData.media}
            isSaving={saving}
          />
        )
      case 3:
        return (
          <PricingForm 
            onSubmit={(data) => handleStepSubmit(data, 3)} 
            initialData={formData.pricing}
            isSaving={saving}
          />
        )
      case 4:
        return (
          <DocumentsForm 
            onSubmit={(data) => handleStepSubmit(data, 4)} 
            initialData={formData.documents}
            isSaving={saving}
          />
        )
      case 5:
        return (
          <NearbyPlacesForm 
            onSubmit={(data) => handleStepSubmit(data, 5)} 
            initialData={formData.nearbyPlaces}
            isSaving={saving}
          />
        )
      case 6:
        return (
          <BankApprovalsForm 
            onSubmit={(data) => handleStepSubmit(data, 6)} 
            initialData={formData.bankApprovals}
            isSaving={saving}
          />
        )
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <div className="text-center py-12">
          <div className="text-red-500 text-lg mb-2">{error}</div>
          <button 
            onClick={() => router.push('/dashboard/properties')}
            className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Back to Properties
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => router.push(`/dashboard/properties/${params.id}`)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Property
          </button>
        </div>
        <h1 className="text-xl font-bold text-gray-900">Edit Property</h1>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex justify-between items-center">
          {['Basic Details', 'Media', 'Pricing', 'Documents', 'Nearby Places', 'Bank Approvals'].map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep > index + 1 ? 'bg-green-100 text-green-800' : currentStep === index + 1 ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500'}`}
              >
                {currentStep > index + 1 ? '✓' : index + 1}
              </div>
              <span className="text-xs mt-1 text-gray-500">{step}</span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded"></div>
          <div 
            className="absolute top-0 left-0 h-1 bg-red-600 rounded transition-all duration-300"
            style={{ width: `${(currentStep - 1) * 20}%` }}
          ></div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {saveError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {saveError}
          </div>
        )}
        {renderStepForm()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className={`px-4 py-2 rounded-md ${currentStep === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors`}
        >
          Previous
        </button>
        <button
          onClick={() => {
            if (currentStep < 6) {
              setCurrentStep(currentStep + 1)
            } else {
              submitProperty()
            }
          }}
          disabled={saving}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
        >
          {saving ? 'Saving...' : currentStep === 6 ? (
            <>
              <Save size={16} className="mr-2" />
              Save Property
            </>
          ) : 'Next'}
        </button>
      </div>
    </div>
  )
}