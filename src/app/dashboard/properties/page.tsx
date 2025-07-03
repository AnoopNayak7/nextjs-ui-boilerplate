'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  ChevronDown,
  Home,
  DollarSign,
} from 'lucide-react'

export default function PropertiesPage() {
  const router = useRouter()
  const handleAddProperty = () => {
    router.push('/dashboard/properties/add')
  }

  const [selectedFilters, setSelectedFilters] = useState({
    status: 'all',
    type: 'all',
    propertyType: 'all', // rent or sell
    priceRange: [0, 100000000],
    location: 'all',
  })
  
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/v1/properties')
        const result = await response.json()
        
        if (result.success) {
          setProperties(result.data.items || [])
        } else {
          setError(result.error?.message || 'Failed to fetch properties')
        }
      } catch (error) {
        console.error('Error fetching properties:', error)
        setError('An error occurred while fetching properties')
      } finally {
        setLoading(false)
      }
    }
    
    fetchProperties()
  }, [])
  
  // Fallback to sample data if API fails or for development
  const sampleProperties = [
    {
      id: 1,
      title: 'Luxury Villa with Swimming Pool',
      type: 'Villa',
      location: 'Whitefield, Bangalore',
      price: 35000000,
      status: 'active',
      postedBy: 'Rajesh Kumar',
      postedDate: '2024-01-15',
      views: 1250,
      bedrooms: 4,
      bathrooms: 3,
      area: '3,200 sqft',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Modern 3BHK Apartment',
      type: 'Apartment',
      location: 'Koramangala, Bangalore',
      price: 12500000,
      status: 'active',
      postedBy: 'Priya Sharma',
      postedDate: '2024-01-20',
      views: 890,
      bedrooms: 3,
      bathrooms: 2,
      area: '1,800 sqft',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Spacious 2BHK in Gated Community',
      type: 'Apartment',
      location: 'Electronic City, Bangalore',
      price: 8500000,
      status: 'inactive',
      postedBy: 'Amit Gupta',
      postedDate: '2024-01-18',
      views: 567,
      bedrooms: 2,
      bathrooms: 2,
      area: '1,200 sqft',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Premium Penthouse with City View',
      type: 'Penthouse',
      location: 'UB City Mall, Bangalore',
      price: 85000000,
      status: 'active',
      postedBy: 'Sunita Reddy',
      postedDate: '2024-01-22',
      views: 2100,
      bedrooms: 5,
      bathrooms: 4,
      area: '4,500 sqft',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      title: 'Cozy Studio Apartment',
      type: 'Studio',
      location: 'Indiranagar, Bangalore',
      price: 4500000,
      status: 'active',
      postedBy: 'Karthik Nair',
      postedDate: '2024-01-25',
      views: 345,
      bedrooms: 1,
      bathrooms: 1,
      area: '600 sqft',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      title: 'Independent House with Garden',
      type: 'House',
      location: 'JP Nagar, Bangalore',
      price: 18000000,
      status: 'inactive',
      postedBy: 'Deepa Krishnan',
      postedDate: '2024-01-12',
      views: 678,
      bedrooms: 3,
      bathrooms: 2,
      area: '2,400 sqft',
      image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=400&h=300&fit=crop'
    },
    {
      id: 7,
      title: 'Luxury Duplex Villa',
      type: 'Villa',
      location: 'Sarjapur Road, Bangalore',
      price: 42000000,
      status: 'active',
      postedBy: 'Venkat Iyer',
      postedDate: '2024-01-28',
      views: 1567,
      bedrooms: 4,
      bathrooms: 4,
      area: '3,800 sqft',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop'
    },
    {
      id: 8,
      title: 'Affordable 1BHK Flat',
      type: 'Apartment',
      location: 'Marathahalli, Bangalore',
      price: 3200000,
      status: 'active',
      postedBy: 'Ravi Kumar',
      postedDate: '2024-01-30',
      views: 234,
      bedrooms: 1,
      bathrooms: 1,
      area: '500 sqft',
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop'
    }
  ]

  const formatPrice = (price:number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`
    }
    return `₹${price.toLocaleString()}`
  }

  const locations = [
    'Whitefield, Bangalore',
    'Koramangala, Bangalore', 
    'Electronic City, Bangalore',
    'UB City Mall, Bangalore',
    'Indiranagar, Bangalore',
    'JP Nagar, Bangalore',
    'Sarjapur Road, Bangalore',
    'Marathahalli, Bangalore',
    'HSR Layout, Bangalore',
    'Bellandur, Bangalore'
  ]

  const propertyTypes = ['Apartment', 'Villa', 'House', 'Penthouse', 'Studio']
  const propertyListingTypes = ['rent', 'sell']

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // Search filter
      if (searchQuery && !property.title?.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !property.location?.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Status filter
      if (selectedFilters.status !== 'all' && property.status !== selectedFilters.status) {
        return false
      }

      // Type filter (apartment, villa, etc.)
      if (selectedFilters.type !== 'all' && property.type !== selectedFilters.type) {
        return false
      }
      
      // Property listing type filter (rent or sell)
      if (selectedFilters.propertyType !== 'all' && property.propertyType !== selectedFilters.propertyType) {
        return false
      }

      // Price range filter
      if (property.price < selectedFilters.priceRange[0] || property.price > selectedFilters.priceRange[1]) {
        return false
      }

      // Location filter
      if (selectedFilters.location !== 'all' && property.location !== selectedFilters.location) {
        return false
      }

      return true
    })
  }, [searchQuery, selectedFilters, properties])

  const FilterDropdown = ({ label, options, value, onChange, type = 'select' }:any) => {
    const [isOpen, setIsOpen] = useState(false)
    
    if (type === 'range') {
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            {label}: {formatPrice(selectedFilters.priceRange[0])} - {formatPrice(selectedFilters.priceRange[1])}
          </label>
          <div className="px-3 py-2 bg-white border border-gray-200 rounded-lg">
            <input
              type="range"
              min="0"
              max="100000000"
              step="5000000"
              value={selectedFilters.priceRange[1]}
              onChange={(e) => setSelectedFilters({
                ...selectedFilters, 
                priceRange: [0, parseInt(e.target.value)]
              })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>₹0</span>
              <span>₹10 Cr+</span>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:border-gray-300 transition-colors min-w-[140px]"
        >
          <span className="font-medium text-gray-700">
            {value === 'all' ? `All ${label}` : value}
          </span>
          <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            <div 
              className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                onChange('all')
                setIsOpen(false)
              }}
            >
              All {label}
            </div>
            {options.map((option:any) => (
              <div 
                key={option}
                className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  onChange(option)
                  setIsOpen(false)
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">All Properties</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor all property listings</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 text-sm"
            />
          </div>

          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Filter size={16} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className={`bg-white rounded-xl border border-gray-200 shadow-sm transition-all duration-300 ${showFilters ? 'block' : 'hidden'}`}>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <FilterDropdown
                label="Status"
                options={['active', 'inactive', 'draft', 'approved', 'rejected', 'sold', 'rented', 'pending']}
                value={selectedFilters.status}
                onChange={(value:any) => setSelectedFilters({...selectedFilters, status: value})}
              />
            </div>
            
            {/* Property Listing Type Filter (Rent/Sell) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Listing Type</label>
              <FilterDropdown
                label="Listing Types"
                options={propertyListingTypes}
                value={selectedFilters.propertyType}
                onChange={(value:any) => setSelectedFilters({...selectedFilters, propertyType: value})}
              />
            </div>

            {/* Property Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Property Type</label>
              <FilterDropdown
                label="Types"
                options={propertyTypes}
                value={selectedFilters.type}
                onChange={(value:any) => setSelectedFilters({...selectedFilters, type: value})}
              />
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Location</label>
              <FilterDropdown
                label="Locations"
                options={locations}
                value={selectedFilters.location}
                onChange={(value:any) => setSelectedFilters({...selectedFilters, location: value})}
              />
            </div>

            {/* Price Range Filter */}
            <FilterDropdown
              label="Price Range"
              type="range"
            />
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {loading ? (
            <span>Loading properties...</span>
          ) : error ? (
            <span className="text-red-500">{error}</span>
          ) : (
            <span>Showing <span className="font-medium">{filteredProperties.length}</span> of <span className="font-medium">{properties.length}</span> properties</span>
          )}
        </div>
        {searchQuery && (
          <div className="text-sm text-gray-500">
            Search results for "<span className="font-medium">{searchQuery}</span>"
          </div>
        )}
      </div>

      {/* Properties Table */}
      <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">Loading properties...</div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-500 text-lg mb-2">{error}</div>
            <div className="text-gray-400 text-sm">Please try again later</div>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProperties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-16 rounded-lg overflow-hidden bg-gray-200">
                        <img 
                          src={property.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop'} 
                          alt={property.title}
                          className="h-full w-full object-cover"
                          onError={(e:any) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.classList.add('bg-gray-200');
                          }}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{property.title}</div>
                        <div className="text-sm text-gray-500">
                          {property.bhk || property.bedrooms} beds • {property.bathrooms || '2'} baths • {property.superBuiltUpArea || property.area}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatPrice(property.price)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${property.propertyType === 'rent' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {property.propertyType === 'rent' ? (
                        <Home size={12} className="mr-1" />
                      ) : (
                        <DollarSign size={12} className="mr-1" />
                      )}
                      {property.propertyType ? property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1) : 'Sell'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{property.postedBy || 'Admin'}</div>
                    <div className="text-sm text-gray-500">{property.postedDate || new Date(property.createdAt || Date.now()).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${property.status === 'active' || property.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : property.status === 'inactive' || property.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : property.status === 'draft'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                      {property.status === 'active' || property.status === 'approved' ? (
                        <CheckCircle size={12} className="mr-1" />
                      ) : (
                        <XCircle size={12} className="mr-1" />
                      )}
                      {property.status ? property.status.charAt(0).toUpperCase() + property.status.slice(1) : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(property.views || 0).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button 
                      onClick={() => router.push(`/dashboard/properties/${property.id}`)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      onClick={() => router.push(`/dashboard/properties/${property.id}/edit`)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={async () => {
                        if (confirm('Are you sure you want to delete this property?')) {
                          try {
                            const response = await fetch(`/api/v1/properties/${property.id}`, {
                              method: 'DELETE',
                            });
                            const result = await response.json();
                            if (result.success) {
                              // Refresh the properties list
                              setProperties(properties.filter(p => p.id !== property.id));
                            } else {
                              alert('Failed to delete property: ' + result.error?.message);
                            }
                          } catch (error) {
                            console.error('Error deleting property:', error);
                            alert('An error occurred while deleting the property');
                          }
                        }
                      }}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        {!loading && !error && filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">No properties found</div>
            <div className="text-gray-400 text-sm">Try adjusting your search criteria or filters</div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={handleAddProperty}
        className="fixed bottom-8 right-8 p-4 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 z-50"
      >
        <Plus size={24} />
      </button>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #4f46e5;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #4f46e5;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  )
}