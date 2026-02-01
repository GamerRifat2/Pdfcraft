import * as pdfjsLib from 'pdfjs-dist'

let workerInitialized = false

export function setupPDFWorker() {
  if (workerInitialized) return

  pdfjsLib.GlobalWorkerOptions.workerSrc = 
    `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`

  workerInitialized = true
}

export async function renderPDFPage(
  pdfData: ArrayBuffer,
  pageNumber: number,
  canvas: HTMLCanvasElement
): Promise<number> {
  const loadingTask = pdfjsLib.getDocument({ data: pdfData })
  const pdf = await loadingTask.promise
  const page = await pdf.getPage(pageNumber)

  const scale = 1.5
  const viewport = page.getViewport({ scale })
  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Canvas context not available')
  }

  const outputScale = window.devicePixelRatio || 1

  canvas.width = Math.floor(viewport.width * outputScale)
  canvas.height = Math.floor(viewport.height * outputScale)
  canvas.style.width = Math.floor(viewport.width) + 'px'
  canvas.style.height = Math.floor(viewport.height) + 'px'

  const transform = outputScale !== 1 
    ? [outputScale, 0, 0, outputScale, 0, 0] 
    : undefined

  await page.render({
    canvasContext: context,
    transform,
    viewport,
  }).promise

  return pdf.numPages
}
