import React, { useEffect, useRef } from "react";

export default function OnboardingModal({
  isOpen,
  onClose,
  onOpenAccessibility,
  lowPower = false,
  galaxiesEnabled,
  bhGifsEnabled,
  bhEnabled,
  setGalaxiesEnabled,
  setBhGifsEnabled,
  setBhEnabled,
}) {
  const firstBtnRef = useRef(null);

  // Focus first action when opening
  useEffect(() => {
    if (isOpen && firstBtnRef.current) {
      firstBtnRef.current.focus();
    }
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const step1Done = false; // we don't track this persistently
  const step2Done = galaxiesEnabled || bhGifsEnabled;
  const step3Done = bhEnabled;

  const Step = ({ done, children }) => (
    <div className="flex items-start gap-3 p-2 rounded-md">
      <div
        className={
          "mt-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] " +
          (done ? "bg-green-500 text-black" : "bg-white/15 text-white/70")
        }
        aria-hidden="true"
      >
        {done ? "✓" : ""}
      </div>
      <div className="text-sm text-white/90">{children}</div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome tips"
      style={{
        contain: "layout style paint",
        minHeight: "100vh",
      }}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => onClose(false)}
      />
      <div
        className="relative w-[92vw] max-w-md rounded-xl border border-white/15 bg-black/70 p-4 shadow-2xl"
        style={{
          minHeight: lowPower ? "280px" : "420px",
          contain: "layout",
        }}
      >
        <h2 className="text-lg font-semibold text-white mb-1">Quick tips</h2>
        <p className="text-xs text-white/70 mb-3">
          {lowPower
            ? "Low Power Mode is on — basic theme changes available."
            : "Heavy backgrounds are loading. Try Low Power mode for instant performance, then explore visuals when ready."}
        </p>

        <div className="space-y-3">
          {/* Step 0: Suggest Low Power first if not enabled */}
          {!lowPower && (
            <Step done={false}>
              <strong>Recommended:</strong> Enable Low Power mode for best
              performance
              <div className="mt-2">
                <button
                  className="text-xs px-2 py-1 rounded-md border border-amber-400/50 bg-amber-500/10 hover:bg-amber-500/20 transition-colors"
                  onClick={() => {
                    // Trigger low power from parent
                    const event = new CustomEvent("toggle-low-power");
                    window.dispatchEvent(event);
                  }}
                >
                  Enable Low Power
                </button>
              </div>
            </Step>
          )}

          <Step done={step1Done}>
            Open the Accessibility panel to customize visuals
            <div className="mt-2">
              <button
                ref={firstBtnRef}
                className="text-xs px-2 py-1 rounded-md border border-white/30 hover:border-white/60 transition-colors"
                onClick={() => {
                  onOpenAccessibility();
                }}
              >
                Open now
              </button>
            </div>
          </Step>

          {!lowPower && (
            <Step done={step2Done}>
              Add a soft galaxy or black hole parallax
              <div className="mt-2 flex gap-2">
                <button
                  className={`text-xs px-2 py-1 rounded-md border transition-colors ${
                    galaxiesEnabled
                      ? "border-white/60 text-accent"
                      : "border-white/30 hover:border-white/60"
                  }`}
                  onClick={() => setGalaxiesEnabled((v) => !v)}
                >
                  Galaxy
                </button>
                <button
                  className={`text-xs px-2 py-1 rounded-md border transition-colors ${
                    bhGifsEnabled
                      ? "border-white/60 text-accent"
                      : "border-white/30 hover:border-white/60"
                  }`}
                  onClick={() => setBhGifsEnabled((v) => !v)}
                >
                  GIFs
                </button>
              </div>
            </Step>
          )}

          {!lowPower && (
            <Step done={step3Done}>
              Switch to the high‑fidelity Pixel Blackhole
              <div className="mt-2">
                <button
                  className={`text-xs px-2 py-1 rounded-md border transition-colors ${
                    bhEnabled
                      ? "border-white/60 text-accent"
                      : "border-white/30 hover:border-white/60"
                  }`}
                  onClick={() => setBhEnabled((v) => !v)}
                >
                  {bhEnabled ? "Disable" : "Enable"}
                </button>
              </div>
            </Step>
          )}
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            className="text-xs px-3 py-1 rounded-md border border-white/25 hover:border-white/50 transition-colors"
            onClick={() => onClose(false)}
          >
            Maybe later
          </button>
          <button
            className="text-xs px-3 py-1 rounded-md btn-accent transition-colors"
            onClick={() => onClose(true)}
          >
            Done, don't show again
          </button>
        </div>
      </div>
    </div>
  );
}
