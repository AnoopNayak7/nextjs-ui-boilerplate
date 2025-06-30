'use client'

import { useState, useRef } from 'react'
import { X, Upload, FileText, Image as ImageIcon, Eye } from 'lucide-react'

interface FloorPlanModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (files: File[]) => void
  existingPlans?: Array<{
    name: string
    type: 'pdf' | 'image'
    url?: string
  }>
}

export default function FloorPlanModal({ 
  isOpen, 
  onClose, 
  onUpload,
  existingPlans = []
}: FloorPlanModalProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type === 'application/pdf' || file.type.startsWith('image/')
    )
    setSelectedFiles(prev => [...prev, ...files])
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(file => 
        file.type === 'application/pdf' || file.type.startsWith('image/')
      )
      setSelectedFiles(prev => [...prev, ...files])
    }
  }

  const handleUpload = () => {
    onUpload(selectedFiles)
    setSelectedFiles([])
    onClose()
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handlePreview = (file: File) => {
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  const closePreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Floor Plans</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Existing Floor Plans */}
        {existingPlans.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Existing Floor Plans</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {existingPlans.map((plan, index) => (
                <div 
                  key={index}
                  className="border rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    {plan.type === 'pdf' ? (
                      <FileText className="text-gray-400" size={24} />
                    ) : (
                      <ImageIcon className="text-gray-400" size={24} />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-700">{plan.name}</p>
                      <p className="text-xs text-gray-500">{plan.type.toUpperCase()}</p>
                    </div>
                  </div>
                  {plan.url && (
                    <button 
                      onClick={() => window.open(plan.url, '_blank')}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <Eye size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

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
            Drag and drop your floor plans here, or
            <button 
              onClick={() => inputRef.current?.click()}
              className="text-indigo-600 hover:text-indigo-800 font-medium mx-1"
            >
              browse
            </button>
            to choose files
          </p>
          <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, PNG, JPG, JPEG</p>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".pdf,image/*"
            onChange={handleChange}
            className="hidden"
          />
        </div>

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Selected Files</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedFiles.map((file, index) => (
                <div 
                  key={index}
                  className="border rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    {file.type === 'application/pdf' ? (
                      <FileText className="text-gray-400" size={24} />
                    ) : (
                      <ImageIcon className="text-gray-400" size={24} />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-700">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {file.type.startsWith('image/') && (
                      <button
                        onClick={() => handlePreview(file)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <Eye size={20} />
                      </button>
                    )}
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
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
            disabled={selectedFiles.length === 0}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Upload {selectedFiles.length > 0 && `(${selectedFiles.length})`}
          </button>
        </div>

        {/* Image Preview Modal */}
        {previewUrl && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative max-w-4xl max-h-[90vh] overflow-auto">
              <button
                onClick={closePreview}
                className="absolute top-4 right-4 text-white hover:text-gray-300"
              >
                <X size={24} />
              </button>
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-full h-auto"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}