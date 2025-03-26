// src/components/Navbar/Navbar.tsx
import { useRef, useState, useEffect } from "react";
import { useScroll, motion, AnimatePresence } from "framer-motion";
import "./Navbar.scss";
import { Html } from "@react-three/drei";
// Theme colors
const themes = {
  marvel: {
    primary: "#ED1D24",
    secondary: "#FFFFFF",
    accent: "#F78F20",
  },
  dc: {
    primary: "#0078F0",
    secondary: "#FFFFFF",
    accent: "#FFDE00",
  },
  manga: {
    primary: "#000000",
    secondary: "#FFFFFF",
    accent: "#E70B0B",
  },
};

export default function Navbar({
  scrollYProgress,
}: {
  scrollYProgress: number;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<keyof typeof themes>("marvel");
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState("");
  const bubbleTimeout = useRef<NodeJS.Timeout | null>(null);

  // Set random bubble text on hover
  const bubbleTexts = [
    "POW! Let's go!",
    "BAM! Nice click!",
    "WHAM! Explore!",
    "ZAP! Awesome!",
    "BOOM! More!",
  ];

  const handleItemHover = () => {
    setBubbleText(bubbleTexts[Math.floor(Math.random() * bubbleTexts.length)]);
    setShowBubble(true);
    if (bubbleTimeout.current) {
      clearTimeout(bubbleTimeout.current);
    }
    bubbleTimeout.current = setTimeout(() => setShowBubble(false), 2000);
  };

  // Theme switch handler
  const switchTheme = () => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(activeTheme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setActiveTheme(themeKeys[nextIndex] as keyof typeof themes);
    setBubbleText(`Theme: ${themeKeys[nextIndex].toUpperCase()}!`);
    setShowBubble(true);
    if (bubbleTimeout.current) {
      clearTimeout(bubbleTimeout.current);
    }
    bubbleTimeout.current = setTimeout(() => setShowBubble(false), 2000);
  };

  const navItems = [
    { name: "Home", icon: "🦸", color: themes[activeTheme].accent },
    { name: "Work", icon: "💥", color: themes[activeTheme].accent },
    { name: "Skills", icon: "📊", color: themes[activeTheme].accent },
    { name: "Contact", icon: "📨", color: themes[activeTheme].accent },
  ];

  return (
    <Html position={[0, 0, 0]}>
      {/* HTML-based Navbar */}
      <motion.nav
        className="comic-navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        style={{
          backgroundColor: themes[activeTheme].primary,
          borderColor: themes[activeTheme].secondary,
        }}
      >
        {/* Animated Progress Bar */}
        <motion.div
          className="progress-bar"
          style={{
            scaleX: scrollYProgress,
            backgroundColor: themes[activeTheme].accent,
          }}
        />

        <div className="nav-content">
          {/* Logo with 3D effect */}
          <motion.div
            className="logo-container"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div
              className="comic-logo"
              style={{
                backgroundColor: themes[activeTheme].accent,
                color: themes[activeTheme].secondary,
                borderColor: themes[activeTheme].secondary,
              }}
            >
              <span className="comic-bubble">PORTFOLIO</span>
              <div className="logo-highlight" />
              <div className="logo-reflection" />
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            {navItems.map((item, i) => (
              <motion.a
                key={`desktop-${i}`}
                href={`#${item.name.toLowerCase()}`}
                onMouseEnter={handleItemHover}
                whileHover={{
                  y: -3,
                  color: item.color,
                  textShadow: `0 0 8px ${item.color}`,
                }}
                whileTap={{ scale: 0.95 }}
                className="comic-nav-item"
                style={
                  {
                    "--item-color": item.color,
                    color: themes[activeTheme].secondary,
                  } as React.CSSProperties
                }
              >
                <span className="nav-icon">{item.icon}</span>
                {item.name}
                <span className="nav-underline" />
              </motion.a>
            ))}
          </div>

          {/* Theme Toggle Button */}
          <motion.button
            className="theme-toggle"
            onClick={switchTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              backgroundColor: themes[activeTheme].accent,
              color: themes[activeTheme].secondary,
              borderColor: themes[activeTheme].secondary,
            }}
          >
            {activeTheme.toUpperCase()}
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className={`menu-icon ${isMenuOpen ? "open" : ""}`}>
              <span
                style={{ backgroundColor: themes[activeTheme].secondary }}
              />
              <span
                style={{ backgroundColor: themes[activeTheme].secondary }}
              />
              <span
                style={{ backgroundColor: themes[activeTheme].secondary }}
              />
            </div>
          </motion.button>
        </div>

        {/* Speech Bubble */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              className="speech-bubble"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              style={{
                backgroundColor: themes[activeTheme].secondary,
                color: themes[activeTheme].primary,
                borderColor: themes[activeTheme].primary,
              }}
            >
              {bubbleText}
              <div
                className="bubble-tail"
                style={{ borderTopColor: themes[activeTheme].secondary }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            style={{
              backgroundColor: themes[activeTheme].primary,
              borderColor: themes[activeTheme].secondary,
            }}
          >
            {navItems.map((item, i) => (
              <motion.a
                key={`mobile-${i}`}
                href={`#${item.name.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={handleItemHover}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="mobile-nav-item"
                style={
                  {
                    "--item-color": item.color,
                    color: themes[activeTheme].secondary,
                  } as React.CSSProperties
                }
              >
                <span className="nav-icon">{item.icon}</span>
                {item.name}
                <motion.span
                  className="nav-underline"
                  whileHover={{ width: "100%" }}
                />
              </motion.a>
            ))}

            <motion.button
              className="theme-toggle mobile"
              onClick={switchTheme}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: navItems.length * 0.1 }}
              style={{
                backgroundColor: themes[activeTheme].accent,
                color: themes[activeTheme].secondary,
                borderColor: themes[activeTheme].secondary,
              }}
            >
              Switch to{" "}
              {activeTheme === "marvel"
                ? "DC"
                : activeTheme === "dc"
                ? "Manga"
                : "Marvel"}{" "}
              Theme
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </Html>
  );
}
