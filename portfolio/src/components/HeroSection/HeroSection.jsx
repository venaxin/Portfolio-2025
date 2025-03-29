/* eslint-disable no-unused-vars */
// src/components/HeroSection.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const HeroSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
          Next-Gen Portfolio
        </h1>
        <p className="mt-4 text-xl text-gray-400">Building the future of web experiences</p>
      </motion.div>
    </section>
  );
};