'use client'

import { useState, useCallback } from 'react'
import FileUpload from './FileUpload'
import PDFViewer from './PDFViewer'
import Toolbar from './Toolbar'
import { modifyPDF, downloadPDF } from '@/lib/pdfUtils'

export default function PDFEditor() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [textToAdd, setTextToAdd] = useState('')
  const [editMode, setEditMode] = useState(false)

  const handleFileUpload = useCallback((file: File) => {
    setPdfFile(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        setPdfData(e.target.result as ArrayBuffer)
      }
    }
    reader.readAsArrayBuffer(file)
  }, [])

  const handleAddText = async () => {
    if (!pdfData || !textToAdd) return

    try {
      const modifiedPdfBytes = await modifyPDF(pdfData, textToAdd, currentPage)
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' })
      const newFile = new File([blob], pdfFile?.name || 'edited.pdf')

      // Reload with modified PDF
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setPdfData(e.target.result as ArrayBuffer)
        }
      }
      reader.readAsArrayBuffer(newFile)
      setTextToAdd('')
      alert('Text added successfully!')
    } catch (error) {
      console.error('Error adding text:', error)
      alert('Failed to add text')
    }
  }

  const handleDownload = async () => {
    if (!pdfData) return
    await downloadPDF(pdfData, pdfFile?.name || 'edited.pdf')
  }

  return (
    <div className="space-y-6">
      {!pdfFile ? (
        <FileUpload onFileUpload={handleFileUpload} />
      ) : (
        <>
          <Toolbar
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevPage={() => setCurrentPage(p => Math.max(1, p - 1))}
            onNextPage={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            onDownload={handleDownload}
            editMode={editMode}
            onToggleEdit={() => setEditMode(!editMode)}
            textToAdd={textToAdd}
            onTextChange={setTextToAdd}
            onAddText={handleAddText}
            onNewFile={() => {
              setPdfFile(null)
              setPdfData(null)
              setCurrentPage(1)
            }}
          />

          {pdfData && (
            <PDFViewer
              pdfData={pdfData}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              onTotalPagesChange={setTotalPages}
            />
          )}
        </>
      )}
    </div>
  )
}
