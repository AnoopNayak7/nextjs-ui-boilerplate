'use client'

import { useState, useRef } from 'react'
import { X, Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'

interface DocumentUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (documents: File[]) => void
  allowedTypes?: string[]
}

export default function DocumentUploadModal({ 
  isOpen, 
  onClose, 
  onUpload,
  allowedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png']
}: DocumentUploadModalProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const inputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const validateFile = (file: File) => {
    const extension = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!allowedTypes.includes(extension)) {
      return `File type ${extension} is not supported`
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      return 'File size exceeds 10MB limit'
    }
    return null
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const processFiles = (files: File[]) => {
    const newErrors: {[key: string]: string} = {}
    const validFiles = files.filter(file => {
      const error = validateFile(file)
      if (error) {
        newErrors[file.name] = error
        return false
      }
      return true
    })
    setErrors(newErrors)
    return validFiles
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    const validFiles = processFiles(files)
    setSelectedFiles(prev => [...prev, ...validFiles])
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      const validFiles = processFiles(files)
      setSelectedFiles(prev => [...prev, ...validFiles])
    }
  }

  const handleUpload = () => {
    onUpload(selectedFiles)
    setSelectedFiles([])
    setErrors({})
    onClose()
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Upload Documents</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center ${dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-sm text-gray-600">
            Drag and drop your documents here, or
            <button 
              onClick={() => inputRef.current?.click()}
              className="text-indigo-600 hover:text-indigo-800 font-medium mx-1"
            >
              browse
            </button>
            to choose files
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Supported formats: {allowedTypes.join(', ')} (Max size: 10MB)
          </p>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept={allowedTypes.join(',')}
            onChange={handleChange}
            className="hidden"
          />
        </div>

        {(selectedFiles.length > 0 || Object.keys(errors).length > 0) && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Selected Files</h3>
            <div className="space-y-2">
              {selectedFiles.map((file, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="text-green-500" size={16} />
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {Object.entries(errors).map(([fileName, error]) => (
                <div 
                  key={fileName}
                  className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50"
                >
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="text-red-500" size={20} />
                    <div>
                      <p className="text-sm font-medium text-red-700">{fileName}</p>
                      <p className="text-xs text-red-500">{error}</p>
                    </div>
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
      </div>
    </div>
  )
}