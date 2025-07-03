'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Builder {
  id: string
  name: string
  logo: string
  description: string
  propertyCount: number
  followerCount: number
  establishedYear: number
  location: string
}

const dummyBuilders: Builder[] = [
  {
    id: '1',
    name: 'Prestige Group',
    logo: '/builders/prestige-logo.svg',
    description: 'Leading real estate developer with over 30 years of experience in luxury properties.',
    propertyCount: 3,
    followerCount: 1200,
    establishedYear: 1986,
    location: 'Bangalore'
  },
  {
    id: '2',
    name: 'Sobha Limited',
    logo: '/builders/sobha-logo.svg',
    description: 'Premium real estate developer known for quality and innovation in construction.',
    propertyCount: 2,
    followerCount: 980,
    establishedYear: 1995,
    location: 'Bangalore'
  }
]

export default function BuildersPage() {
  const [builders] = useState<Builder[]>(dummyBuilders)

  return (
    <div className="relative min-h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Builders</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor builder partnerships</p>
        </div>

        {/* Add Builder Button */}
        <Link
          href="/dashboard/builders/add"
          className="fixed bottom-6 right-6 z-10 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg transition-colors duration-200"
        >
          <Plus size={20} />
          <span>Add Builder</span>
        </Link>
      </div>

      {/* Builders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {builders.map((builder) => (
          <Link
            key={builder.id}
            href={`/dashboard/builders/${builder.id}`}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center">
                  <Image
                    src={builder.logo}
                    alt={`${builder.name} logo`}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-900">{builder.propertyCount} Properties</span>
                  <span className="text-sm text-gray-500">{builder.followerCount} Followers</span>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">{builder.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{builder.description}</p>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>Est. {builder.establishedYear}</span>
                <span>{builder.location}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}