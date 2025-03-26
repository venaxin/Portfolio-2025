// src/App.tsx
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll } from "@react-three/drei";
import HeroSection from "./components/HeroSection/HeroSection";
import Navbar from "./components/Navbar/Navbar";
import ComicPanel from "./components/ComicPanel/ComicPanel";
// import Projects from './components/Projects/Projects'
// import Skills from './components/Skills/Skills'
// import Contact from './components/Contact/Contact'
import Avatar from "./components/Avatar/Avatar";
import "./styles/globals.scss";

function App() {
  return (
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
        <ScrollControls pages={5} damping={0.25}>
          <Scroll>
            <HeroSection />
            <ComicPanel />
            <Avatar
              theme={{
                name: "marvel",
                colors: ["#ED1D24", "#FFFFFF", "#000000"],
              }}
            />
            {/* 
            <Projects />
            <Skills />
            <Contact /> */}
          </Scroll>
          <Scroll>
          <NavbarWithScroll />
        </Scroll>
        </ScrollControls>
      </Canvas>
  );
}

function NavbarWithScroll() {
  const scroll = useScroll();
  const scrollYProgress = scroll?.offset || 0; // Fallback to 0 if offset is null
  return <Navbar scrollYProgress={scrollYProgress} />;
}

export default App;
