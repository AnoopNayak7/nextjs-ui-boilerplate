'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Building2, MapPin, Calendar, Users, Home, FileText, Upload } from 'lucide-react'
import Link from 'next/link'

interface Property {
  id: string
  name: string
  image: string
  price: string
  location: string
  type: string
  status: string
}

interface Document {
  id: string
  name: string
  type: string
  uploadedAt: string
  size: string
}

interface Builder {
  id: string
  name: string
  logo: string
  description: string
  establishedYear: number
  location: string
  propertyCount: number
  followerCount: number
  about: string
  properties: Property[]
  documents: Document[]
}

const dummyBuilder: Builder = {
  id: '1',
  name: 'Prestige Group',
  logo: '/builders/prestige-logo.svg',
  description: 'Leading real estate developer with over 30 years of experience in luxury properties.',
  establishedYear: 1986,
  location: 'Bangalore',
  propertyCount: 3,
  followerCount: 1200,
  about: 'Prestige Group has been at the forefront of real estate development in India since 1986. Known for our commitment to quality and innovation, we have delivered numerous landmark projects across residential, commercial, retail, and hospitality sectors.',
  properties: [
    {
      id: '1',
      name: 'Prestige Park Grove',
      image: '/properties/property-1.jpg',
      price: '₹2.5 Cr onwards',
      location: 'Whitefield, Bangalore',
      type: 'Apartment',
      status: 'Ongoing'
    },
    {
      id: '2',
      name: 'Prestige Elm Park',
      image: '/properties/property-2.jpg',
      price: '₹3.8 Cr onwards',
      location: 'Channasandra, Bangalore',
      type: 'Villa',
      status: 'Ready to Move'
    },
    {
      id: '3',
      name: 'Prestige Liberty Towers',
      image: '/properties/property-3.jpg',
      price: '₹1.8 Cr onwards',
      location: 'Electronic City, Bangalore',
      type: 'Apartment',
      status: 'Under Construction'
    }
  ],
  documents: [
    {
      id: '1',
      name: 'Partnership Agreement',
      type: 'PDF',
      uploadedAt: '2023-10-15',
      size: '2.5 MB'
    },
    {
      id: '2',
      name: 'Legal Documentation',
      type: 'PDF',
      uploadedAt: '2023-10-10',
      size: '1.8 MB'
    }
  ]
}

export default function BuilderDetailsPage({ params }: { params: { id: string } }) {
  const [builder, setBuilder] = useState<Builder | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // In a real application, fetch builder data based on params.id
    setBuilder(dummyBuilder)
  }, [params.id])

  if (!builder) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pb-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
              <Image
                src={builder.logo}
                alt={builder.name}
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{builder.name}</h1>
              <p className="text-gray-500 mt-1">{builder.description}</p>
            </div>
          </div>
          <button className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
            Follow Builder
          </button>
        </div>

        <div className="flex space-x-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-4 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'overview'
                ? 'border-b-2 border-red-500 text-red-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('properties')}
            className={`pb-4 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'properties'
                ? 'border-b-2 border-red-500 text-red-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Properties
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`pb-4 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'documents'
                ? 'border-b-2 border-red-500 text-red-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Documents
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-3">
                  <Building2 className="text-gray-400" size={20} />
                  <span className="text-gray-500">Established</span>
                </div>
                <p className="text-2xl font-semibold text-gray-900 mt-2">{builder.establishedYear}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-3">
                  <MapPin className="text-gray-400" size={20} />
                  <span className="text-gray-500">Location</span>
                </div>
                <p className="text-2xl font-semibold text-gray-900 mt-2">{builder.location}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-3">
                  <Home className="text-gray-400" size={20} />
                  <span className="text-gray-500">Properties</span>
                </div>
                <p className="text-2xl font-semibold text-gray-900 mt-2">{builder.propertyCount}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-3">
                  <Users className="text-gray-400" size={20} />
                  <span className="text-gray-500">Followers</span>
                </div>
                <p className="text-2xl font-semibold text-gray-900 mt-2">{builder.followerCount}</p>
              </div>
            </div>

            {/* About */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">{builder.about}</p>
            </div>
          </div>
        )}

        {activeTab === 'properties' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {builder.properties.map((property) => (
              <div key={property.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="aspect-video relative bg-gray-100">
                  <Image
                    src={property.image}
                    alt={property.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
                  <p className="text-red-600 font-medium mt-2">{property.price}</p>
                  <div className="mt-4 space-y-2 text-sm text-gray-500">
                    <p>{property.location}</p>
                    <p>{property.type}</p>
                    <p className="inline-block px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {property.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Legal Documents</h2>
                <button className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  <Upload size={16} />
                  <span>Upload Document</span>
                </button>
              </div>
              <div className="space-y-4">
                {builder.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="text-gray-400" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">{doc.name}</p>
                        <p className="text-sm text-gray-500">
                          {doc.type} • {doc.size} • Uploaded on {doc.uploadedAt}
                        </p>
                      </div>
                    </div>
                    <button className="text-sm text-gray-600 hover:text-gray-900">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}