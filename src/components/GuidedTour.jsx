import React, { useEffect, useState } from "react";

/**
 * GuidedTour - Professional 3-step onboarding experience
 * Step 1: Highlights accessibility button, encourages user to click
 * Step 2: Guides user to enable Blackhole Parallax
 * Step 3: Prompts user to close settings and explore portfolio
 */
export default function GuidedTour({
  menuOpen,
  setMenuOpen,
  bhEnabled,
  setBhEnabled,
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [buttonRect, setButtonRect] = useState(null);

  // Initialize tour
  useEffect(() => {
    const tourCompleted = localStorage.getItem("guidedTourCompleted");
    const onboardingSeen = localStorage.getItem("onboardingSeen");

    if (!tourCompleted && onboardingSeen) {
      // Start tour after brief delay
      setTimeout(() => {
        setVisible(true);
        setCurrentStep(1);
        updateButtonPosition();
      }, 800);
    }
  }, []);

  // Update spotlight position when needed
  const updateButtonPosition = () => {
    const button = document.querySelector('[title="Accessibility & Themes"]');
    if (button) {
      const rect = button.getBoundingClientRect();
      setButtonRect(rect);
    }
  };

  // Track when menu opens/closes
  useEffect(() => {
    if (currentStep === 1 && menuOpen) {
      // User opened settings! Move to step 2
      setTimeout(() => setCurrentStep(2), 600);
    } else if (currentStep === 3 && !menuOpen) {
      // User closed settings! Tour complete
      completeTour();
    }
  }, [menuOpen, currentStep]);

  // Track when blackhole parallax is enabled
  useEffect(() => {
    if (currentStep === 2 && bhEnabled) {
      // User enabled blackhole! Move to step 3
      setTimeout(() => setCurrentStep(3), 800);
    }
  }, [bhEnabled, currentStep]);

  const completeTour = () => {
    setVisible(false);
    localStorage.setItem("guidedTourCompleted", "true");
  };

  const skipTour = () => {
    completeTour();
  };

  useEffect(() => {
    // Update button position on scroll/resize
    const handleUpdate = () => updateButtonPosition();
    window.addEventListener("scroll", handleUpdate);
    window.addEventListener("resize", handleUpdate);
    return () => {
      window.removeEventListener("scroll", handleUpdate);
      window.removeEventListener("resize", handleUpdate);
    };
  }, []);

  if (!visible || currentStep === 0) return null;

  const steps = {
    1: {
      title: "Step 1: Customize Your Experience",
      description:
        "Click the settings icon in the top-right corner to unlock beautiful themes and visual effects.",
      highlightSelector: '[title="Accessibility & Themes"]',
      position: "top-right",
      showArrow: true,
      pulseTarget: true,
    },
    2: {
      title: "Step 2: Add Visual Magic ✨",
      description:
        "Enable 'Blackhole Parallax' to see a stunning animated background effect as you scroll.",
      highlightSelector: null, // Will highlight inside the menu
      position: "menu-content",
      showArrow: false,
      action: () => {
        if (!bhEnabled) {
          setBhEnabled(true);
        }
      },
      actionText: "Enable Blackhole Parallax",
    },
    3: {
      title: "Step 3: Explore My Work 🚀",
      description:
        "Close the settings panel and scroll through my portfolio to see the effects in action!",
      highlightSelector: null,
      position: "menu-content",
      showArrow: false,
      action: () => setMenuOpen(false),
      actionText: "Close & Explore",
    },
  };

  const step = steps[currentStep];

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm animate-fade-in"
        style={{ pointerEvents: currentStep === 1 ? "none" : "auto" }}
        onClick={() => {
          if (currentStep === 2 || currentStep === 3) return;
          skipTour();
        }}
      />

      {/* Spotlight cutout for accessibility button (Step 1 only) */}
      {currentStep === 1 && buttonRect && (
        <>
          {/* Pulsing rings around button */}
          <div
            className="fixed z-[61] pointer-events-none"
            style={{
              left: buttonRect.left - 12,
              top: buttonRect.top - 12,
              width: buttonRect.width + 24,
              height: buttonRect.height + 24,
            }}
          >
            <div className="absolute inset-0 rounded-full border-4 border-amber-400/60 animate-ping-slow" />
            <div className="absolute inset-[-8px] rounded-full border-2 border-amber-400/40 animate-pulse" />
          </div>

          {/* Arrow pointing to button */}
          <div
            className="fixed z-[61] pointer-events-none animate-bounce"
            style={{
              left: buttonRect.left + buttonRect.width / 2 - 12,
              top: buttonRect.top - 40,
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-amber-400"
            >
              <path
                d="M12 4v16m0 0l-6-6m6 6l6-6"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </>
      )}

      {/* Tour instruction card */}
      <div
        className={`fixed z-[62] animate-slide-in ${
          currentStep === 1
            ? "top-24 right-4 max-w-xs"
            : currentStep === 2
            ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md"
            : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md"
        }`}
      >
        <div className="relative rounded-2xl border-2 border-amber-400/40 bg-gradient-to-br from-black/95 to-gray-900/95 backdrop-blur-xl p-6 shadow-2xl">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s === currentStep
                      ? "w-8 bg-amber-400"
                      : s < currentStep
                      ? "w-1.5 bg-green-500"
                      : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-white/60 font-medium">
              {currentStep} of 3
            </span>
          </div>

          {/* Content */}
          <div className="flex items-start gap-4 mb-4">
            <span className="text-4xl flex-shrink-0" aria-hidden="true">
              {currentStep === 1 ? "👆" : currentStep === 2 ? "✨" : "🚀"}
            </span>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
            <button
              onClick={skipTour}
              className="text-xs text-white/50 hover:text-white/80 transition-colors"
            >
              Skip tour
            </button>

            {step.action && (
              <button
                onClick={step.action}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm shadow-lg hover:shadow-amber-500/50 transition-all hover:scale-105"
              >
                {step.actionText}
              </button>
            )}
          </div>

          {/* Helper text for step 1 */}
          {currentStep === 1 && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-xs text-amber-400/80 text-center animate-pulse">
                Click the glowing icon above ↑
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
