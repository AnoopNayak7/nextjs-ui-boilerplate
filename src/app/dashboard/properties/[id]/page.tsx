'use client'

import { Activity, Award, Briefcase, Building, Calendar, Car, Check, CheckCircle, ChevronDown, Clock, Compass, Edit3, Eye, FileText, GraduationCap, Home, Landmark, MapPin, Plus, Save, Shield, ShoppingCart, Star, Train, Trash2, Upload, User, X, ArrowLeft, DollarSign, Edit } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import FloorPlanModal from '@/components/modals/FloorPlanModal'
import LegalDocumentModal from '@/components/modals/LegalDocumentModal'
import PropertyEditModal from '@/components/modals/PropertyEditModal'
import ImageUploadModal from '@/components/modals/ImageUploadModal'
import AmenitiesModal from '@/components/modals/AmenitiesModal'
import { formatPrice } from '@/lib/utils'

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [propertyData, setPropertyData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/v1/properties/${params.id}`)
        const result = await response.json()
        
        if (result.success) {
          setPropertyData(result.data)
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
  
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this property?')) {
      try {
        const response = await fetch(`/api/v1/properties/${params.id}`, {
          method: 'DELETE',
        })
        const result = await response.json()
        
        if (result.success) {
          router.push('/dashboard/properties')
        } else {
          alert('Failed to delete property: ' + result.error?.message)
        }
      } catch (error) {
        console.error('Error deleting property:', error)
        alert('An error occurred while deleting the property')
      }
    }
  }
  const [isEditing, setIsEditing] = useState(false)
  const [selectedBanks, setSelectedBanks] = useState(['HDFC', 'SBI'])
  const [showBankDropdown, setShowBankDropdown] = useState(false)
  const [editingDescription, setEditingDescription] = useState(false)
  const [description, setDescription] = useState('Luxurious 4BHK villa with modern amenities, swimming pool, landscaped gardens, and premium finishes. Located in a prime area with excellent connectivity to IT hubs and commercial centers.')
  const [images, setImages] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop', name: 'Main View' },
    { id: 2, url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop', name: 'Living Room' },
    { id: 3, url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop', name: 'Kitchen' }
  ])
  const [showDocumentViewer, setShowDocumentViewer] = useState<any>(false)
  const [showPropertyEditModal, setShowPropertyEditModal] = useState(false)
  const [showFloorPlanModal, setShowFloorPlanModal] = useState(false)
  const [showLegalDocumentModal, setShowLegalDocumentModal] = useState(false)
  const [showImageUploadModal, setShowImageUploadModal] = useState(false)
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false)

  // Sample property data to use as fallback
  const samplePropertyData:any = {
    id: '1',
    title: 'Luxury Villa with Swimming Pool',
    type: 'Villa',
    bhk: '4 BHK',
    superBuiltUpArea: '3,200 sqft',
    carpetArea: '2,800 sqft',
    floor: '2nd Floor',
    totalFloors: 3,
    age: '2 years',
    parking: '2 Covered',
    facing: 'East',
    reraNumber: 'PRM/KA/RERA/1234/789',
    reraVerified: true,
    price: 35000000,
    postedBy: {
      type: 'Builder',
      name: 'Prestige Group',
      logo: '/builder-logo.png',
      reraId: 'RERA/BUILD/1234',
      rating: 4.8,
      projectsCount: 45,
      contact: {
        phone: '+91 9876543210',
        email: 'sales@prestigegroup.com'
      }
    },
    amenities: {
      inBuilding: ['Lift', 'Power Backup', 'Security', 'Gym', 'Pool', 'Clubhouse'],
      society: ['Gated Community', 'Parks', 'Schools', 'Metro Station']
    },
    documents: {
      ownership: { name: 'Ownership Proof.pdf', status: 'verified' },
      saleDeed: { name: 'Sale Deed.pdf', status: 'verified' },
      rera: { name: 'RERA Certificate.pdf', status: 'verified' },
      buildingPlan: { name: 'Building Plan.pdf', status: 'pending' },
      tax: { name: 'Tax Receipt.pdf', status: 'verified' },
      encumbrance: { name: 'Encumbrance.pdf', status: 'pending' }
    },
    distances: {
      schools: '0.5 km',
      hospitals: '1.2 km',
      supermarkets: '0.8 km',
      metro: '2.5 km',
      techPark: '5 km'
    },
    floorPlans: [
      { name: 'Ground Floor.pdf', type: 'pdf' },
      { name: '3D View.jpg', type: 'image' }
    ],
    legal: {
      reraStatus: 'Approved',
      legalVerification: 'Completed',
      builderReputation: 'A+'
    }
  }

  const banks = [
    'HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank', 'Kotak Bank',
    'PNB', 'Bank of Baroda', 'Canara Bank', 'Yes Bank', 'Federal Bank'
  ]

  const handleImageUpload = (files: File[]) => {
    const newImages = files.map(file => ({
      id: Date.now(),
      url: URL.createObjectURL(file),
      name: file.name
    }))
    setImages([...images, ...newImages])
    setShowImageUploadModal(false)
  }

  const handleImageDelete = (id:any) => {
    setImages(images.filter(img => img.id !== id))
  }

  const handleDocumentUpload = () => {
    // Simulate document upload
    console.log('Document upload triggered')
  }

  const handleDocumentVerify = (docKey:any) => {
    // Simulate document verification
    console.log('Verifying document:', docKey)
  }

  const DocumentCard = ({ docKey, name, status }:any) => (
    <div className="flex items-center justify-between p-2 border rounded-lg bg-white hover:shadow-sm transition-shadow">
      <div className="flex items-center space-x-2">
        <FileText className="text-gray-400" size={16} />
        <span className="text-xs font-medium text-gray-700">{name}</span>
      </div>
      <div className="flex items-center space-x-1">
        {status === 'verified' ? (
          <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
            <CheckCircle size={10} className="mr-1" /> Verified
          </span>
        ) : (
          <div className="flex items-center space-x-1">
            <span className="text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
              <Clock size={10} className="mr-1" /> Pending
            </span>
            <button 
              onClick={() => handleDocumentVerify(docKey)}
              className="text-blue-600 hover:text-blue-800 text-xs"
            >
              Verify
            </button>
          </div>
        )}
        <button 
          onClick={() => setShowDocumentViewer(docKey)}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <Eye size={12} className="text-gray-500" />
        </button>
      </div>
    </div>
  )

  const DistanceCard = ({ icon: Icon, label, distance }:any) => (
    <div className="flex items-center space-x-2 p-2 border rounded-lg bg-white">
      <div className="p-1.5 bg-red-50 rounded-lg">
        <Icon size={14} className="text-red-600" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-500">{distance}</p>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
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

  // Use API data if available, otherwise fall back to sample data
  const property = propertyData || samplePropertyData
  
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header with back button and actions */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => router.push('/dashboard/properties')}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Properties
        </button>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => router.push(`/dashboard/properties/${params.id}/edit`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <Edit size={16} className="mr-2" />
            Edit
          </button>
          <button 
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
          >
            <Trash2 size={16} className="mr-2" />
            Delete
          </button>
        </div>
      </div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{property.title}</h1>
          <p className="text-gray-500 text-sm mt-1">{property.type} • {property.bhk} • {property.superBuiltUpArea}</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xl font-bold text-gray-900">₹{(property.price / 10000000).toFixed(2)} Cr</span>
          <button 
            onClick={() => router.push(`/dashboard/properties/${params.id}/edit`)}
            className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 text-sm"
          >
            <Edit3 size={14} />
            <span>Edit Details</span>
          </button>
        </div>
      </div>

      {/* Property Images */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-gray-900">Property Images</h2>
            <button 
              onClick={() => setShowImageUploadModal(true)}
              className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-1 text-sm"
            >
              <Plus size={14} />
              <span>Add Image</span>
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <img 
                  src={image.url} 
                  alt={image.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity rounded-lg flex items-center justify-center">
                  <button 
                    onClick={() => handleImageDelete(image.id)}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-500 rounded-full hover:bg-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <p className="text-xs text-gray-600 mt-1 text-center">{image.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Details */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4">
              <h2 className="text-base font-semibold text-gray-900 mb-3">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Building className="text-gray-400" size={16} />
                    <div>
                      <p className="text-xs font-medium text-gray-900">Property Type</p>
                      <p className="text-xs text-gray-500">{property.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Home className="text-gray-400" size={16} />
                    <div>
                      <p className="text-xs font-medium text-gray-900">Configuration</p>
                      <p className="text-xs text-gray-500">{property.bhk}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="text-gray-400" size={16} />
                    <div>
                      <p className="text-xs font-medium text-gray-900">Floor</p>
                      <p className="text-xs text-gray-500">{property.floor} of {property.totalFloors}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="text-gray-400" size={16} />
                    <div>
                      <p className="text-xs font-medium text-gray-900">Age of Property</p>
                      <p className="text-xs text-gray-500">{property.age}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Car className="text-gray-400" size={16} />
                    <div>
                      <p className="text-xs font-medium text-gray-900">Parking</p>
                      <p className="text-xs text-gray-500">{property.parking}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Compass className="text-gray-400" size={16} />
                    <div>
                      <p className="text-xs font-medium text-gray-900">Facing</p>
                      <p className="text-xs text-gray-500">{property.facing}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="text-gray-400" size={16} />
                    <div>
                      <p className="text-xs font-medium text-gray-900">RERA Number</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-gray-500">{property.reraNumber}</p>
                        {property.reraVerified ? (
                          <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-xs">
                            Verified
                          </span>
                        ) : (
                          <button className="text-red-600 text-xs font-medium hover:text-red-800">
                            Mark as Verified
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-gray-900">Description</h2>
                <button 
                  onClick={() => setEditingDescription(!editingDescription)}
                  className="text-red-600 hover:text-red-800 text-xs font-medium flex items-center space-x-1"
                >
                  {editingDescription ? <Save size={12} /> : <Edit3 size={12} />}
                  <span>{editingDescription ? 'Save' : 'Edit'}</span>
                </button>
              </div>
              {editingDescription ? (
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-xs resize-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  rows={4}
                  placeholder="Enter property description..."
                />
              ) : (
                <p className="text-gray-600 text-xs leading-relaxed">{description}</p>
              )}
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4">
              <h2 className="text-base font-semibold text-gray-900 mb-3">Amenities</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-medium text-gray-700 mb-2">In Building</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {property.amenities.inBuilding.map((amenity:any) => (
                      <div key={amenity} className="flex items-center space-x-1 text-xs text-gray-600">
                        <Check size={12} className="text-green-500" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                    <button 
                      onClick={() => setShowAmenitiesModal(true)}
                      className="flex items-center space-x-1 text-xs text-red-600 hover:text-red-800"
                    >
                      <Plus size={12} />
                      <span>Add More</span>
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-gray-700 mb-2">Society/Area</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {property.amenities.society.map((amenity:any) => (
                      <div key={amenity} className="flex items-center space-x-1 text-xs text-gray-600">
                        <Check size={12} className="text-green-500" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                    <button 
                      onClick={() => setShowAmenitiesModal(true)}
                      className="flex items-center space-x-1 text-xs text-red-600 hover:text-red-800"
                    >
                      <Plus size={12} />
                      <span>Add More</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-gray-900">Legal Documents</h2>
                <button 
                  onClick={() => setShowLegalDocumentModal(true)}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-1 text-xs"
                >
                  <Upload size={12} />
                  <span>Upload Document</span>
                </button>
              </div>
              <div className="grid gap-2">
                {Object.entries(property.documents).map(([key, doc]:any) => (
                  <DocumentCard key={key} docKey={key} {...doc} />
                ))}
              </div>
            </div>
          </div>

          {/* Floor Plans */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4">
              <h2 className="text-base font-semibold text-gray-900 mb-3">Floor Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {property.floorPlans.map((plan:any) => (
                  <div key={plan.name} className="border rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="text-gray-400" size={16} />
                      <span className="text-xs font-medium text-gray-700">{plan.name}</span>
                    </div>
                    <button className="text-red-600 hover:text-red-800">
                      <Eye size={14} />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => setShowFloorPlanModal(true)}
                  className="border-2 border-dashed rounded-lg p-3 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
                >
                  <Plus size={16} className="mr-1" />
                  <span className="text-xs">Add Floor Plan</span>
                </button>
              </div>
            </div>
          </div>

          {/* Distances */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4">
              <h2 className="text-base font-semibold text-gray-900 mb-3">Nearby Places</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <DistanceCard icon={GraduationCap} label="Schools" distance={property.distances.schools} />
                <DistanceCard icon={Activity} label="Hospitals" distance={property.distances.hospitals} />
                <DistanceCard icon={ShoppingCart} label="Supermarkets" distance={property.distances.supermarkets} />
                <DistanceCard icon={Train} label="Metro Station" distance={property.distances.metro} />
                <DistanceCard icon={Briefcase} label="Tech Park" distance={property.distances.techPark} />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Posted By */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4">
              <h2 className="text-base font-semibold text-gray-900 mb-3">Posted By</h2>
              <div className="flex items-center space-x-3 mb-3">
                {property.postedBy.type === 'Builder' ? (
                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Building size={20} className="text-gray-400" />
                  </div>
                ) : (
                  <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <User size={20} className="text-gray-400" />
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{property.postedBy.name}</h3>
                  <p className="text-xs text-gray-500">{property.postedBy.type}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star size={12} className="text-yellow-400 fill-current" />
                    <span className="text-xs font-medium text-gray-700">{property.postedBy.rating}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Shield className="text-gray-400" size={14} />
                  <span>RERA ID: {property.postedBy.reraId}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Building className="text-gray-400" size={14} />
                  <span>{property.postedBy.projectsCount} Projects</span>
                </div>
              </div>
              <div className="mt-3 space-y-2">
                <button className="w-full px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs font-medium">
                  Contact Now
                </button>
                <button className="w-full px-3 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium">
                  View Profile
                </button>
              </div>
            </div>
          </div>

          {/* Legal Status */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4">
              <h2 className="text-base font-semibold text-gray-900 mb-3">Legal Status</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-700">RERA Status</p>
                  <p className="text-xs text-gray-900 mt-1 flex items-center space-x-1">
                    <CheckCircle size={12} className="text-green-500" />
                    <span>{property.legal.reraStatus}</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-700">Legal Verification</p>
                  <p className="text-xs text-gray-900 mt-1 flex items-center space-x-1">
                    <CheckCircle size={12} className="text-green-500" />
                    <span>{property.legal.legalVerification}</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-700">Builder Reputation</p>
                  <p className="text-xs text-gray-900 mt-1 flex items-center space-x-1">
                    <Star size={12} className="text-yellow-400 fill-current" />
                    <span>{property.legal.builderReputation}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Approvals */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4">
              <h2 className="text-base font-semibold text-gray-900 mb-3">Bank Approvals</h2>
              <div className="space-y-3">
                <div className="relative">
                  <button
                    onClick={() => setShowBankDropdown(!showBankDropdown)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg flex items-center justify-between hover:bg-gray-50 text-xs"
                  >
                    <span className="text-gray-700">Select Banks</span>
                    <ChevronDown size={14} className="text-gray-400" />
                  </button>
                  {showBankDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                      {banks.map((bank) => (
                        <label
                          key={bank}
                          className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedBanks.includes(bank)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedBanks([...selectedBanks, bank])
                              } else {
                                setSelectedBanks(selectedBanks.filter((b) => b !== bank))
                              }
                            }}
                            className="rounded text-red-600 focus:ring-red-500"
                          />
                          <span className="text-xs text-gray-700">{bank}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedBanks.map((bank) => (
                    <div
                      key={bank}
                      className="px-2 py-1 bg-gray-100 rounded-full flex items-center space-x-1"
                    >
                      <Landmark size={10} className="text-gray-500" />
                      <span className="text-xs text-gray-700">{bank}</span>
                      <button
                        onClick={() => setSelectedBanks(selectedBanks.filter((b) => b !== bank))}
                        className="ml-1 hover:text-gray-700"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PropertyEditModal
        isOpen={showPropertyEditModal}
        onClose={() => setShowPropertyEditModal(false)}
        onSave={(details) => {
          console.log('Saving property details:', details)
          setShowPropertyEditModal(false)
        }}
        initialDetails={{
          name: property.title,
          type: property.type,
          bhk: property.bhk,
          area: property.superBuiltUpArea,
          floor: property.floor,
          age: property.age,
          parking: property.parking,
          facing: property.facing,
          reraNumber: property.reraNumber
        }}
      />

      <ImageUploadModal
        isOpen={showImageUploadModal}
        onClose={() => setShowImageUploadModal(false)}
        onUpload={handleImageUpload}
      />

      <AmenitiesModal
        isOpen={showAmenitiesModal}
        onClose={() => setShowAmenitiesModal(false)}
        onSave={(amenities) => {
          console.log('Saving amenities:', amenities)
          setShowAmenitiesModal(false)
        }}
        initialAmenities={{
          inBuilding: property.amenities.inBuilding,
          society: property.amenities.society
        }}
      />

      <FloorPlanModal
        isOpen={showFloorPlanModal}
        onClose={() => setShowFloorPlanModal(false)}
        onUpload={(files) => {
          // Handle floor plan upload
          console.log('Uploading floor plans:', files)
          setShowFloorPlanModal(false)
        }}
        existingPlans={property.floorPlans}
      />

      <LegalDocumentModal
        isOpen={showLegalDocumentModal}
        onClose={() => setShowLegalDocumentModal(false)}
        onUpload={(documents) => {
          // Handle document upload
          console.log('Uploading documents:', documents)
          setShowLegalDocumentModal(false)
        }}
        existingDocuments={Object.entries(property.documents).map(([key, doc]: [string, any]) => ({
          name: doc.name,
          type: key as any,
          url: '#' // Add actual document URL here
        }))}
      />

      {/* Document Viewer Modal */}
      {showDocumentViewer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Document Viewer</h3>
              <button 
                onClick={() => setShowDocumentViewer(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 h-96 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <FileText size={48} className="text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Document preview would appear here</p>
                <p className="text-sm text-gray-500 mt-2">
                  Viewing: {property.documents[showDocumentViewer]?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}