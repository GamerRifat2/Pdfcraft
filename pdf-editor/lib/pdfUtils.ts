import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export async function modifyPDF(
  pdfData: ArrayBuffer,
  textToAdd: string,
  pageNumber: number
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfData)
  const pages = pdfDoc.getPages()

  if (pageNumber > pages.length || pageNumber < 1) {
    throw new Error('Invalid page number')
  }

  const page = pages[pageNumber - 1]
  const { height } = page.getSize()

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

  page.drawText(textToAdd, {
    x: 50,
    y: height - 100,
    size: 24,
    font: font,
    color: rgb(0, 0, 0),
  })

  return await pdfDoc.save()
}

export async function downloadPDF(
  pdfData: ArrayBuffer | Uint8Array,
  filename: string
): Promise<void> {
  const blob = new Blob([pdfData], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}

export async function mergePDFs(pdfFiles: ArrayBuffer[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create()

  for (const pdfData of pdfFiles) {
    const pdf = await PDFDocument.load(pdfData)
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
    copiedPages.forEach((page) => mergedPdf.addPage(page))
  }

  return await mergedPdf.save()
}
