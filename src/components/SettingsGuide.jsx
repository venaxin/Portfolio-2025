import React, { useEffect, useState } from "react";

/**
 * SettingsGuide - Blur overlay that guides users to the accessibility settings
 * Shows once after onboarding is dismissed to help users discover customization options
 */
export default function SettingsGuide({ onDismiss }) {
  const [visible, setVisible] = useState(false);

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem("settingsGuideSeen", "true");
    if (onDismiss) onDismiss();
  };

  useEffect(() => {
    // Check if user has seen this guide
    const hasSeenGuide = localStorage.getItem("settingsGuideSeen");
    if (!hasSeenGuide) {
      // Show after a short delay
      const timer = setTimeout(() => {
        setVisible(true);
        // Auto-dismiss after 9 seconds
        const dismissTimer = setTimeout(() => {
          handleDismiss();
        }, 9000);

        return () => clearTimeout(dismissTimer);
      }, 1000);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Blur overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm animate-fade-in"
        onClick={handleDismiss}
      />

      {/* Spotlight effect pointing to settings button */}
      <div
        className="fixed top-4 right-4 z-50 pointer-events-none"
        style={{
          filter: "drop-shadow(0 0 40px rgba(245, 158, 11, 0.6))",
        }}
      >
        {/* Pulsing ring around settings button area */}
        <div className="absolute -inset-8 rounded-full border-4 border-amber-400/60 animate-ping-slow" />
        <div className="absolute -inset-6 rounded-full border-2 border-amber-400/40 animate-pulse" />
      </div>

      {/* Guide text */}
      <div className="fixed top-20 right-4 z-50 max-w-xs animate-slide-in pointer-events-auto">
        <div className="rounded-lg border border-amber-400/30 bg-black/90 backdrop-blur-md p-4 shadow-2xl">
          <div className="flex items-start gap-3">
            <span className="text-3xl flex-shrink-0" aria-hidden="true">
              👆
            </span>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-amber-400 mb-2">
                Customize Your Experience
              </h3>
              <p className="text-xs text-white/90 mb-3">
                Tap the settings icon above to unlock beautiful themes,
                animations, and visual effects!
              </p>
              <button
                onClick={handleDismiss}
                className="text-xs px-3 py-1 rounded-md border border-white/30 hover:border-white/60 transition-colors bg-white/5 hover:bg-white/10"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
