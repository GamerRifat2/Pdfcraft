# PDF Editor - Like Sejda.com

A modern PDF editor built with Next.js, PDF.js, and pdf-lib.

## Features

- 📄 View PDF files with navigation
- ✏️ Edit PDF content (add text, images)
- 🔄 Merge multiple PDFs
- 📝 Add annotations and signatures
- 💾 Download edited PDFs
- 🎨 Modern UI with drag & drop

## Getting Started

### Install Dependencies

\`\`\`bash
npm install
\`\`\`

### Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Deploy to Vercel

\`\`\`bash
npm install -g vercel
vercel deploy
\`\`\`

## Tech Stack

- **Next.js 15** - React framework
- **PDF.js** - PDF rendering
- **pdf-lib** - PDF manipulation
- **React Dropzone** - File uploads
- **Tailwind CSS** - Styling

## Project Structure

\`\`\`
pdf-editor/
├── app/
│   ├── page.tsx          # Main page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── PDFViewer.tsx     # PDF viewer component
│   ├── PDFEditor.tsx     # PDF editor component
│   ├── Toolbar.tsx       # Editor toolbar
│   └── FileUpload.tsx    # File upload component
├── lib/
│   ├── pdfUtils.ts       # PDF utility functions
│   └── pdfWorker.ts      # PDF.js worker setup
└── public/               # Static assets

\`\`\`

## Usage

1. Upload a PDF file by dragging and dropping or clicking
2. Navigate through pages using Previous/Next buttons
3. Use toolbar to add text, images, or annotations
4. Download the edited PDF

## License

MIT
