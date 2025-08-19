import { FiDownload, FiExternalLink, FiPrinter } from "react-icons/fi";
import { useEffect, useState } from "react";
import PdfCanvasFallback from "./PdfCanvasFallback.jsx";

// Simple, print-friendly Resume viewer that embeds the PDF and provides actions
export default function ResumeSection({ pdfUrl, showTitle = true }) {
  const [useCanvasFallback, setUseCanvasFallback] = useState(false);
  // Detect iOS Safari which often can't show inline PDFs reliably
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || "";
    const isiOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (ua.includes("Mac") && "ontouchend" in document);
    if (isiOS) setUseCanvasFallback(true);
  }, []);
  return (
    <div className="w-full max-w-5xl mx-auto text-left">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        {showTitle && (
          <h3 className="text-2xl font-semibold text-white">Resume</h3>
        )}
        <div className="flex items-center gap-2">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm font-semibold text-white hover:border-white/40"
          >
            <FiExternalLink /> View
          </a>
          <a
            href={pdfUrl}
            download
            className="inline-flex items-center gap-2 rounded-md bg-yellow-400/90 px-3 py-2 text-sm font-semibold text-black hover:bg-yellow-400"
          >
            <FiDownload /> Download
          </a>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm font-semibold text-white hover:border-white/40"
          >
            <FiPrinter /> Print
          </button>
        </div>
      </div>

      {/* PDF embed with graceful fallback: use canvas-based renderer on iOS or when embedding fails */}
      <div className="rounded-xl overflow-hidden border border-white/10 bg-black/20 backdrop-blur">
        {useCanvasFallback ? (
          <PdfCanvasFallback src={pdfUrl} height={0.7} />
        ) : (
          <object
            data={pdfUrl}
            type="application/pdf"
            className="w-full h-[70vh]"
            aria-label="Resume PDF"
            role="document"
            onError={() => setUseCanvasFallback(true)}
          >
            <embed
              src={pdfUrl}
              type="application/pdf"
              className="w-full h-[70vh]"
              onError={() => setUseCanvasFallback(true)}
            />
            <div className="p-6 text-white/90">
              Your browser can’t display embedded PDFs. Use the buttons above to
              view or download the resume.
            </div>
          </object>
        )}
      </div>

      {/* Print styles guidance (hidden on screen) */}
      <style>
        {`@media print {
          body { background: #fff; }
          .gradient-sky, nav, .MeteorShower { display: none !important; }
          section { padding: 0 !important; }
        }`}
      </style>
    </div>
  );
}
