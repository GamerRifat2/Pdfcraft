'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface FileUploadProps {
  onFileUpload: (file: File) => void
}

export default function FileUpload({ onFileUpload }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file && file.type === 'application/pdf') {
      onFileUpload(file)
    } else {
      alert('Please upload a PDF file')
    }
  }, [onFileUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
    maxSize: 50 * 1024 * 1024, // 50MB
  })

  return (
    <div
      {...getRootProps()}
      className={`
        border-4 border-dashed rounded-lg p-16 text-center cursor-pointer
        transition-colors duration-200
        ${isDragActive 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }
      `}
    >
      <input {...getInputProps()} />
      <div className="space-y-4">
        <svg
          className="mx-auto h-16 w-16 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {isDragActive ? (
          <p className="text-xl font-semibold text-blue-600">
            Drop your PDF here...
          </p>
        ) : (
          <>
            <p className="text-xl font-semibold text-gray-700">
              Drag & drop your PDF file here
            </p>
            <p className="text-sm text-gray-500">
              or click to browse from your computer
            </p>
            <p className="text-xs text-gray-400">
              Maximum file size: 50MB
            </p>
          </>
        )}
      </div>
    </div>
  )
}
