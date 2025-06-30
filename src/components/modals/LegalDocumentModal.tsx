'use client'

import { useState, useRef } from 'react'
import { X, Upload, FileText, AlertCircle } from 'lucide-react'

type DocumentType = 
  | 'ownership_proof'
  | 'sale_deed'
  | 'rera_certificate'
  | 'building_plan'
  | 'tax_receipt'
  | 'encumbrance_certificate'

interface Document {
  name: string
  type: DocumentType
  size: number
  file: File
}

interface LegalDocumentModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (documents: Document[]) => void
  existingDocuments?: Array<{
    name: string
    type: DocumentType
    url?: string
  }>
}

const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  ownership_proof: 'Ownership Proof',
  sale_deed: 'Sale Deed',
  rera_certificate: 'RERA Certificate',
  building_plan: 'Building Plan Approval',
  tax_receipt: 'Tax Receipt',
  encumbrance_certificate: 'Encumbrance Certificate'
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export default function LegalDocumentModal({
  isOpen,
  onClose,
  onUpload,
  existingDocuments = []
}: LegalDocumentModalProps) {
  const [selectedDocuments, setSelectedDocuments] = useState<Document[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<DocumentType>('ownership_proof')
  const inputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return 'File size exceeds 10MB limit'
    }
    if (!file.type.match('application/pdf|image.*')) {
      return 'Only PDF and image files are allowed'
    }
    return null
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    setError(null)

    const file = e.dataTransfer.files[0]
    const validationError = validateFile(file)
    
    if (validationError) {
      setError(validationError)
      return
    }

    const newDocument: Document = {
      name: file.name,
      type: selectedType,
      size: file.size,
      file: file
    }

    setSelectedDocuments(prev => [...prev, newDocument])
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    if (e.target.files?.length) {
      const file = e.target.files[0]
      const validationError = validateFile(file)

      if (validationError) {
        setError(validationError)
        return
      }

      const newDocument: Document = {
        name: file.name,
        type: selectedType,
        size: file.size,
        file: file
      }

      setSelectedDocuments(prev => [...prev, newDocument])
    }
  }

  const removeDocument = (index: number) => {
    setSelectedDocuments(prev => prev.filter((_, i) => i !== index))
  }

  const handleUpload = () => {
    onUpload(selectedDocuments)
    setSelectedDocuments([])
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Legal Documents</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Existing Documents */}
        {existingDocuments.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Existing Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {existingDocuments.map((doc, index) => (
                <div 
                  key={index}
                  className="border rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="text-gray-400" size={24} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{doc.name}</p>
                      <p className="text-xs text-gray-500">{DOCUMENT_TYPE_LABELS[doc.type]}</p>
                    </div>
                  </div>
                  {doc.url && (
                    <a 
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      View
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Document Type Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Document Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as DocumentType)}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {Object.entries(DOCUMENT_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* Upload Area */}
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center ${dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-sm text-gray-600">
            Drag and drop your document here, or
            <button 
              onClick={() => inputRef.current?.click()}
              className="text-indigo-600 hover:text-indigo-800 font-medium mx-1"
            >
              browse
            </button>
            to choose a file
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Supported formats: PDF, PNG, JPG (Max size: 10MB)
          </p>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 flex items-center text-red-600">
            <AlertCircle size={16} className="mr-2" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Selected Documents */}
        {selectedDocuments.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Selected Documents</h3>
            <div className="space-y-3">
              {selectedDocuments.map((doc, index) => (
                <div 
                  key={index}
                  className="border rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="text-gray-400" size={24} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{doc.name}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{DOCUMENT_TYPE_LABELS[doc.type]}</span>
                        <span>•</span>
                        <span>{(doc.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeDocument(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={selectedDocuments.length === 0}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Upload {selectedDocuments.length > 0 && `(${selectedDocuments.length})`}
          </button>
        </div>
      </div>
    </div>
  )
}