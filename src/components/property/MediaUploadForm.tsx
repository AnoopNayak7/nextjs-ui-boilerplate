'use client'

import { useState, useRef } from 'react'
import { X, Upload, Image as ImageIcon, FileText, Eye, Trash2 } from 'lucide-react'

interface PropertyImage {
  id: number
  file: File
  preview: string
  name: string
}

interface FloorPlan {
  id: number
  file: File
  name: string
  type: 'pdf' | 'image'
  preview?: string
}

interface MediaUploadFormProps {
  onSubmit: (data: { images: PropertyImage[], floorPlans: FloorPlan[] }) => void
  initialImages?: PropertyImage[]
  initialFloorPlans?: FloorPlan[]
  initialData?: {
    images?: PropertyImage[]
  }
  isSaving?: boolean
}

export default function MediaUploadForm({ onSubmit, initialImages = [], initialFloorPlans = [], initialData = {}, isSaving = false }: MediaUploadFormProps) {
  // Use initialData.images if provided, otherwise fall back to initialImages
  const startingImages = initialData?.images || initialImages
  const [images, setImages] = useState<PropertyImage[]>(startingImages)
  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>(initialFloorPlans)
  const [dragActive, setDragActive] = useState(false)
  const [activeTab, setActiveTab] = useState<'images' | 'floorPlans'>('images')
  const [error, setError] = useState<string | null>(null)

  const imageInputRef = useRef<HTMLInputElement>(null)
  const floorPlanInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const validateFile = (file: File, type: 'image' | 'floorPlan'): boolean => {
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      setError('File size should not exceed 5MB')
      return false
    }

    if (type === 'image') {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp']
      if (!validTypes.includes(file.type)) {
        setError('Please upload only JPG, PNG or WebP images')
        return false
      }
    } else {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png']
      if (!validTypes.includes(file.type)) {
        setError('Please upload PDF or image files for floor plans')
        return false
      }
    }

    setError(null)
    return true
  }

  const handleImageFiles = (files: FileList) => {
    const newImages: PropertyImage[] = []
    Array.from(files).forEach(file => {
      if (validateFile(file, 'image')) {
        newImages.push({
          id: Date.now() + Math.random(),
          file,
          preview: URL.createObjectURL(file),
          name: file.name
        })
      }
    })
    setImages(prev => [...prev, ...newImages])
  }

  const handleFloorPlanFiles = (files: FileList) => {
    const newPlans: FloorPlan[] = []
    Array.from(files).forEach(file => {
      if (validateFile(file, 'floorPlan')) {
        newPlans.push({
          id: Date.now() + Math.random(),
          file,
          name: file.name,
          type: file.type === 'application/pdf' ? 'pdf' : 'image',
          preview: file.type !== 'application/pdf' ? URL.createObjectURL(file) : undefined
        })
      }
    })
    setFloorPlans(prev => [...prev, ...newPlans])
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const { files } = e.dataTransfer
    if (!files) return

    if (activeTab === 'images') {
      handleImageFiles(files)
    } else {
      handleFloorPlanFiles(files)
    }
  }

  const handleDelete = (id: number, type: 'image' | 'floorPlan') => {
    if (type === 'image') {
      setImages(prev => prev.filter(img => img.id !== id))
    } else {
      setFloorPlans(prev => prev.filter(plan => plan.id !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ images, floorPlans })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab('images')}
          className={`pb-4 text-sm font-medium ${activeTab === 'images' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Property Images
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('floorPlans')}
          className={`pb-4 text-sm font-medium ${activeTab === 'floorPlans' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Floor Plans
        </button>
      </div>

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center ${dragActive ? 'border-red-600 bg-red-50' : 'border-gray-300'}`}
      >
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <Upload className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">
              Drag and drop your files here, or
              <button
                type="button"
                onClick={() => activeTab === 'images' ? imageInputRef.current?.click() : floorPlanInputRef.current?.click()}
                className="text-red-600 hover:text-red-700 mx-1"
              >
                browse
              </button>
              to upload
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {activeTab === 'images' ? 'JPG, PNG or WebP' : 'PDF, JPG or PNG'} (max. 5MB per file)
            </p>
          </div>
        </div>

        <input
          ref={imageInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => e.target.files && handleImageFiles(e.target.files)}
          className="hidden"
        />

        <input
          ref={floorPlanInputRef}
          type="file"
          multiple
          accept="application/pdf,image/jpeg,image/png"
          onChange={(e) => e.target.files && handleFloorPlanFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {/* Preview Area */}
      {activeTab === 'images' && images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.preview}
                alt={image.name}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity rounded-lg flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => handleDelete(image.id, 'image')}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-500 rounded-full hover:bg-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-1 truncate">{image.name}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'floorPlans' && floorPlans.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {floorPlans.map((plan) => (
            <div key={plan.id} className="border rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {plan.type === 'pdf' ? (
                  <FileText className="text-gray-400" size={24} />
                ) : (
                  <ImageIcon className="text-gray-400" size={24} />
                )}
                <span className="text-sm font-medium text-gray-700 truncate">{plan.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                {plan.type === 'image' && plan.preview && (
                  <button
                    type="button"
                    onClick={() => window.open(plan.preview, '_blank')}
                    className="p-1 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-700"
                  >
                    <Eye size={16} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleDelete(plan.id, 'floorPlan')}
                  className="p-1 hover:bg-gray-100 rounded-full text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className={`px-4 py-2 ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'} text-white rounded-lg transition-colors text-sm font-medium`}
        >
          {isSaving ? 'Saving...' : 'Save Media'}
        </button>
      </div>
    </form>
  )
}