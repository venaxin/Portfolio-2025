/*
  ResponsiveImage: Lightweight responsive <img> that builds a srcset from a base URL.
  - Designed to work well with Unsplash (uses the `w` width param) but works for any URL.
  - Falls back gracefully if URL parsing fails.
*/
import React from "react";

function buildUrlWithWidth(src, width) {
  try {
    const u = new URL(src);
    // Prefer `w` for Unsplash; otherwise keep existing and add w
    u.searchParams.set("w", String(width));
    return u.toString();
  } catch {
    // Non-URL or invalid string; just return original
    return src;
  }
}

function resolveSrc(src) {
  // If path starts with '/', prefix with Vite base for GitHub Pages compatibility
  try {
    if (typeof src === "string" && src.startsWith("/")) {
      const base = import.meta?.env?.BASE_URL || "/";
      // Ensure no double slashes when concatenating
      return `${base.replace(/\/$/, "/")}${src.replace(/^\//, "")}`;
    }
  } catch {
    // ignore and fall through
  }
  return src;
}

export default function ResponsiveImage({
  src,
  alt = "",
  className,
  widths = [320, 480, 640, 768, 960, 1200],
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  loading = "lazy",
  decoding = "async",
  fetchpriority,
}) {
  const resolved = resolveSrc(src);
  const srcSet = widths
    .map((w) => `${buildUrlWithWidth(resolved, w)} ${w}w`)
    .join(", ");

  // Choose a reasonable default src (largest width)
  const fallbackSrc = buildUrlWithWidth(resolved, widths[widths.length - 1]);

  return (
    <img
      src={fallbackSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      fetchpriority={fetchpriority}
    />
  );
}
