'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, User, Briefcase, Users } from 'lucide-react'
import BasicDetailsForm from '@/components/property/BasicDetailsForm'
import MediaUploadForm from '@/components/property/MediaUploadForm'
import LegalDocumentsForm from '@/components/property/LegalDocumentsForm'
import NearbyPlacesForm from '@/components/property/NearbyPlacesForm'
import BankApprovalsForm from '@/components/property/BankApprovalsForm'
import PricingForm from '@/components/property/PricingForm'

type OwnerType = 'builder' | 'broker' | 'individual' | 'company'

interface OwnerTypeOption {
  id: OwnerType
  title: string
  description: string
  icon: React.ElementType
}

const OWNER_TYPES: OwnerTypeOption[] = [
  {
    id: 'builder',
    title: 'Builder',
    description: 'Add property as a builder or developer',
    icon: Building2
  },
  {
    id: 'broker',
    title: 'Broker',
    description: 'Add property as a real estate broker',
    icon: Briefcase
  },
  {
    id: 'individual',
    title: 'Individual',
    description: 'Add property as an individual owner',
    icon: User
  },
  {
    id: 'company',
    title: 'Company',
    description: 'Add property on behalf of a company',
    icon: Users
  }
]

const STEPS = [
  { id: 'owner-type', title: 'Owner Type' },
  { id: 'basic-details', title: 'Basic Details' },
  { id: 'media', title: 'Images & Floor Plans' },
  { id: 'pricing', title: 'Pricing Details' },
  { id: 'documents', title: 'Legal Documents' },
  { id: 'nearby', title: 'Nearby Places' },
  { id: 'bank-approvals', title: 'Bank Approvals' }
]

export default function AddPropertyPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [ownerType, setOwnerType] = useState<OwnerType | null>(null)
  const [formData, setFormData] = useState({
    basicDetails: null,
    media: null,
    pricing: null,
    documents: null,
    nearbyPlaces: null,
    bankApprovals: null
  })

  const handleStepSubmit = (data: any) => {
    setFormData(prev => ({
      ...prev,
      [STEPS[currentStep].id]: data
    }))

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      // Submit the complete form data
      console.log('Final form data:', { ownerType, ...formData })
      router.push('/dashboard/properties')
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const renderStep = () => {
    switch (STEPS[currentStep].id) {
      case 'owner-type':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OWNER_TYPES.map(type => {
              const Icon = type.icon
              return (
                <button
                  key={type.id}
                  onClick={() => {
                    setOwnerType(type.id)
                    handleStepSubmit(type.id)
                  }}
                  className={`p-6 text-left border-2 rounded-xl transition-all ${ownerType === type.id
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-200 hover:border-red-200 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-red-100 rounded-lg">
                      <Icon className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{type.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{type.description}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )

      case 'basic-details':
        return <BasicDetailsForm onSubmit={handleStepSubmit} />

      case 'media':
        return <MediaUploadForm onSubmit={handleStepSubmit} />

      case 'pricing':
        return <PricingForm onSubmit={handleStepSubmit} />

      case 'documents':
        return <LegalDocumentsForm onSubmit={handleStepSubmit} />

      case 'nearby':
        return <NearbyPlacesForm onSubmit={handleStepSubmit} />

      case 'bank-approvals':
        return <BankApprovalsForm onSubmit={handleStepSubmit} />

      default:
        return null
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Add New Property</h1>
        <p className="mt-2 text-sm text-gray-500">
          Fill in the details below to add a new property listing
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className="flex flex-col items-center relative z-10"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${index <= currentStep
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-400'}`}
              >
                {index + 1}
              </div>
              <div className="mt-2 text-xs text-gray-500">{step.title}</div>
            </div>
          ))}
          {/* Progress Line */}
          <div
            className="absolute top-4 left-0 h-0.5 bg-gray-200 -z-10"
            style={{ width: '100%' }}
          >
            <div
              className="h-full bg-red-600 transition-all duration-300"
              style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        {renderStep()}
      </div>

      {/* Navigation Buttons */}
      {currentStep > 0 && (
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Back
          </button>
          {currentStep === STEPS.length - 1 && (
            <button
              type="button"
              onClick={() => handleStepSubmit(formData)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Complete
            </button>
          )}
        </div>
      )}
    </div>
  )
}