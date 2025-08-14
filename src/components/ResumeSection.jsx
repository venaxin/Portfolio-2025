import { FiDownload, FiExternalLink, FiPrinter } from "react-icons/fi";

// Simple, print-friendly Resume viewer that embeds the PDF and provides actions
export default function ResumeSection({ pdfUrl }) {
  return (
    <div className="w-full max-w-5xl mx-auto text-left">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-2xl font-semibold text-white">Resume</h3>
        <div className="flex items-center gap-2">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm font-semibold text-white hover:border-white/40"
          >
            <FiExternalLink /> View in new tab
          </a>
          <a
            href={pdfUrl}
            download
            className="inline-flex items-center gap-2 rounded-md bg-yellow-400/90 px-3 py-2 text-sm font-semibold text-black hover:bg-yellow-400"
          >
            <FiDownload /> Download PDF
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

      {/* PDF embed with graceful fallback */}
      <div className="rounded-xl overflow-hidden border border-white/10 bg-black/20 backdrop-blur">
        <object
          data={pdfUrl}
          type="application/pdf"
          className="w-full h-[70vh]"
        >
          <iframe title="Resume PDF" src={pdfUrl} className="w-full h-[70vh]" />
          <div className="p-6 text-white/90">
            Your browser can’t display embedded PDFs. Use the buttons above to
            view or download the resume.
          </div>
        </object>
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
