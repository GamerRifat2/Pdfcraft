'use client'

interface ToolbarProps {
  currentPage: number
  totalPages: number
  onPrevPage: () => void
  onNextPage: () => void
  onDownload: () => void
  editMode: boolean
  onToggleEdit: () => void
  textToAdd: string
  onTextChange: (text: string) => void
  onAddText: () => void
  onNewFile: () => void
}

export default function Toolbar({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  onDownload,
  editMode,
  onToggleEdit,
  textToAdd,
  onTextChange,
  onAddText,
  onNewFile,
}: ToolbarProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
      {/* Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevPage}
            disabled={currentPage <= 1}
            className="toolbar-button"
          >
            ← Previous
          </button>

          <span className="px-4 py-2 bg-gray-100 rounded">
            Page {currentPage} / {totalPages}
          </span>

          <button
            onClick={onNextPage}
            disabled={currentPage >= totalPages}
            className="toolbar-button"
          >
            Next →
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleEdit}
            className={`toolbar-button ${editMode ? 'bg-green-500 hover:bg-green-600' : ''}`}
          >
            {editMode ? '✓ Edit Mode' : 'Edit Mode'}
          </button>

          <button
            onClick={onDownload}
            className="toolbar-button bg-green-500 hover:bg-green-600"
          >
            📥 Download
          </button>

          <button
            onClick={onNewFile}
            className="toolbar-button bg-gray-500 hover:bg-gray-600"
          >
            New File
          </button>
        </div>
      </div>

      {/* Edit Tools */}
      {editMode && (
        <div className="border-t pt-4">
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="text"
              value={textToAdd}
              onChange={(e) => onTextChange(e.target.value)}
              placeholder="Enter text to add..."
              className="flex-1 min-w-[200px] px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={onAddText}
              disabled={!textToAdd}
              className="toolbar-button"
            >
              Add Text to Page
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-2">
            💡 Enter text and click "Add Text" to add it to the current page
          </p>
        </div>
      )}
    </div>
  )
}
