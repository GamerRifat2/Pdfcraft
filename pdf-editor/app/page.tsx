import PDFEditor from '@/components/PDFEditor'

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2">
            PDF Editor
          </h1>
          <p className="text-center text-gray-600">
            Edit, merge, and modify your PDF files online for free
          </p>
        </header>
        <PDFEditor />
      </div>
    </main>
  )
}
