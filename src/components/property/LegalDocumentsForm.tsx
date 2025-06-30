'use client'

import { useState, useRef } from 'react'
import { Upload, FileText, Trash2, AlertCircle } from 'lucide-react'

interface LegalDocument {
  id: number
  file: File
  name: string
  type: string
  category: 'rera' | 'ownership' | 'tax' | 'other'
}

interface LegalDocumentsFormProps {
  onSubmit: (documents: LegalDocument[]) => void
  initialDocuments?: LegalDocument[]
}

const DOCUMENT_CATEGORIES = [
  { id: 'rera', label: 'RERA Certificate' },
  { id: 'ownership', label: 'Ownership Documents' },
  { id: 'tax', label: 'Tax Documents' },
  { id: 'other', label: 'Other Documents' }
] as const

export default function LegalDocumentsForm({ onSubmit, initialDocuments = [] }: LegalDocumentsFormProps) {
  const [documents, setDocuments] = useState<LegalDocument[]>(initialDocuments)
  const [selectedCategory, setSelectedCategory] = useState<typeof DOCUMENT_CATEGORIES[number]['id']>('rera')
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const validateFile = (file: File): boolean => {
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      setError('File size should not exceed 10MB')
      return false
    }

    const validTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]

    if (!validTypes.includes(file.type)) {
      setError('Please upload PDF, Image (JPG/PNG) or Word documents only')
      return false
    }

    setError(null)
    return true
  }

  const handleFiles = (files: FileList) => {
    const newDocuments: LegalDocument[] = []
    Array.from(files).forEach(file => {
      if (validateFile(file)) {
        newDocuments.push({
          id: Date.now() + Math.random(),
          file,
          name: file.name,
          type: file.type,
          category: selectedCategory
        })
      }
    })
    setDocuments(prev => [...prev, ...newDocuments])
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const { files } = e.dataTransfer
    if (!files) return

    handleFiles(files)
  }

  const handleDelete = (id: number) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(documents)
  }

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄'
    if (type.includes('image')) return '🖼️'
    if (type.includes('word')) return '📝'
    return '📎'
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Category Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {DOCUMENT_CATEGORIES.map(category => (
          <button
            key={category.id}
            type="button"
            onClick={() => setSelectedCategory(category.id)}
            className={`p-4 rounded-lg text-sm font-medium text-center transition-colors ${selectedCategory === category.id
              ? 'bg-red-100 text-red-700 border-2 border-red-200'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent'}`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center ${dragActive ? 'border-red-600 bg-red-50' : 'border-gray-300'}`}
      >
        <div className="space-y-3">
          <div className="mx-auto w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <Upload className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">
              Drag and drop your files here, or
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-red-600 hover:text-red-700 mx-1"
              >
                browse
              </button>
              to upload
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PDF, Word or Images (max. 10MB)
            </p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,image/jpeg,image/png"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-red-500">
          <AlertCircle size={16} />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Documents List */}
      {documents.length > 0 && (
        <div className="space-y-4">
          {DOCUMENT_CATEGORIES.map(category => {
            const categoryDocs = documents.filter(doc => doc.category === category.id)
            if (categoryDocs.length === 0) return null

            return (
              <div key={category.id} className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">{category.label}</h3>
                <div className="space-y-2">
                  {categoryDocs.map(doc => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{getFileIcon(doc.type)}</span>
                        <span className="text-sm text-gray-700 truncate">{doc.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDelete(doc.id)}
                        className="p-1 hover:bg-gray-200 rounded-full text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
        >
          Save Documents
        </button>
      </div>
    </form>
  )
}