'use client'

import { useEffect, useRef, useState } from 'react'
import { setupPDFWorker, renderPDFPage } from '@/lib/pdfWorker'

interface PDFViewerProps {
  pdfData: ArrayBuffer
  currentPage: number
  onPageChange: (page: number) => void
  onTotalPagesChange: (total: number) => void
}

export default function PDFViewer({
  pdfData,
  currentPage,
  onPageChange,
  onTotalPagesChange,
}: PDFViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setupPDFWorker()
  }, [])

  useEffect(() => {
    if (!pdfData || !canvasRef.current) return

    const renderPage = async () => {
      setLoading(true)
      setError(null)

      try {
        const totalPages = await renderPDFPage(
          pdfData,
          currentPage,
          canvasRef.current!
        )
        onTotalPagesChange(totalPages)
      } catch (err) {
        console.error('Error rendering PDF:', err)
        setError('Failed to render PDF')
      } finally {
        setLoading(false)
      }
    }

    renderPage()
  }, [pdfData, currentPage, onTotalPagesChange])

  return (
    <div className="canvas-container bg-gray-100 rounded-lg p-4">
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading PDF...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-8 text-red-600">
          <p>{error}</p>
        </div>
      )}

      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          className="max-w-full h-auto bg-white"
          style={{ display: loading ? 'none' : 'block' }}
        />
      </div>
    </div>
  )
}
