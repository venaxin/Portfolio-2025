import React, { useEffect, useRef, useState } from "react";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";

// Minimal single-page PDF renderer as a fallback when <object>/<embed> cannot show the PDF (e.g., iOS Safari)
export default function PdfCanvasFallback({ src, height = 0.7 }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Configure worker via URL to support Vite bundling
    GlobalWorkerOptions.workerSrc = new URL(
      "../../node_modules/pdfjs-dist/build/pdf.worker.mjs",
      import.meta.url
    ).toString();
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;
        const desiredHeight = Math.max(
          320,
          Math.floor(window.innerHeight * height)
        );
        const desiredWidth = container.clientWidth || window.innerWidth;
        const loadingTask = getDocument(src);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1 });
        const scale = Math.min(
          desiredWidth / viewport.width,
          desiredHeight / viewport.height
        );
        const scaled = page.getViewport({ scale });
        const ctx = canvas.getContext("2d");
        canvas.width = Math.floor(scaled.width);
        canvas.height = Math.floor(scaled.height);
        if (cancelled) return;
        await page.render({ canvasContext: ctx, viewport: scaled }).promise;
      } catch (e) {
        if (!cancelled) setError(e?.message || "Failed to load PDF");
      }
    }
    load();
    const onResize = () => load();
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
    };
  }, [src, height]);

  return (
    <div ref={containerRef} className="w-full flex justify-center bg-black/20">
      {error ? (
        <div className="p-6 text-white/90 text-sm">{error}</div>
      ) : (
        <canvas ref={canvasRef} className="max-w-full h-auto" />
      )}
    </div>
  );
}
