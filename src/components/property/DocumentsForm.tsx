'use client'

import { useState } from 'react'
import LegalDocumentsForm from './LegalDocumentsForm'

interface DocumentsData {
  documents: any[]
}

interface DocumentsFormProps {
  onSubmit: (data: DocumentsData) => void
  initialData?: {
    documents?: any[]
  }
  isSaving?: boolean
}

export default function DocumentsForm({ onSubmit, initialData = {}, isSaving = false }: DocumentsFormProps) {
  const [documents, setDocuments] = useState<any[]>(initialData.documents || [])

  const handleDocumentsSubmit = (uploadedDocuments: any[]) => {
    setDocuments(uploadedDocuments)
    onSubmit({ documents: uploadedDocuments })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Legal Documents</h2>
      <p className="text-sm text-gray-500">
        Upload all legal documents related to the property including RERA certificates, ownership documents, and tax documents.
      </p>
      
      <LegalDocumentsForm 
        onSubmit={handleDocumentsSubmit}
        initialDocuments={documents}
        isSaving={isSaving}
      />
    </div>
  )
}