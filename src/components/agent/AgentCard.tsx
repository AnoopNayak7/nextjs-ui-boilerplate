import { Ban, CheckCircle, MapPin, Phone, Mail, Star } from 'lucide-react'
import Image from 'next/image'

interface Agent {
  id: number
  name: string
  email: string
  phone: string
  reraId: string
  location: string
  propertiesListed: number
  propertiesSold: number
  rating: number
  isBlocked: boolean
  profileImage?: string
  joinedDate: Date
}

interface AgentCardProps {
  agent: Agent
  onToggleBlock: () => void
}

export default function AgentCard({ agent, onToggleBlock }: AgentCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 relative">
      {/* Status Badge */}
      <div
        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
          agent.isBlocked
            ? 'bg-red-100 text-red-800'
            : 'bg-green-100 text-green-800'
        }`}
      >
        {agent.isBlocked ? 'Blocked' : 'Active'}
      </div>

      {/* Agent Info */}
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 relative rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          {agent.profileImage ? (
            <Image
              src={agent.profileImage}
              alt={agent.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-2xl font-semibold">
              {agent.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
          <p className="text-sm text-gray-500">RERA ID: {agent.reraId}</p>
          
          <div className="mt-2 space-y-1">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin size={16} className="mr-2" />
              {agent.location}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Phone size={16} className="mr-2" />
              {agent.phone}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Mail size={16} className="mr-2" />
              {agent.email}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-4 py-4 border-y">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500">Listed</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">{agent.propertiesListed}</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500">Sold</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">{agent.propertiesSold}</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500">Rating</p>
          <p className="mt-1 text-lg font-semibold text-gray-900 flex items-center justify-center">
            {agent.rating}
            <Star size={16} className="ml-1 text-yellow-400" />
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4">
        <button
          onClick={onToggleBlock}
          className={`w-full flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            agent.isBlocked
              ? 'bg-green-50 text-green-700 hover:bg-green-100'
              : 'bg-red-50 text-red-700 hover:bg-red-100'
          }`}
        >
          {agent.isBlocked ? (
            <>
              <CheckCircle size={16} className="mr-2" />
              Unblock Agent
            </>
          ) : (
            <>
              <Ban size={16} className="mr-2" />
              Block Agent
            </>
          )}
        </button>
      </div>

      {/* Joined Date */}
      <p className="mt-4 text-xs text-gray-500 text-center">
        Joined on {agent.joinedDate.toLocaleDateString()}
      </p>
    </div>
  )
}