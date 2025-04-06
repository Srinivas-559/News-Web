
import { motion } from 'framer-motion';
import { Particles } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import {Link} from 'react-router-dom'

const HeroSection = () => {
  // Particle initialization
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };
  const StarBackground = () => (
    <Canvas className="absolute inset-0 z-0">
      {/* Floor Plane */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial 
          color="#1f2937" 
          metalness={0.5} 
          roughness={0.2} 
        />
      </mesh>

      <OrbitControls autoRotate autoRotateSpeed={0.3} enableZoom={false} />
      <Stars
        radius={100}
        depth={50}
        count={3000}
        factor={4}
        saturation={0}
        fade
      />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </Canvas>
  );



  return (
    <section className="relative h-screen bg-gradient-to-br from-[#0d1b2a] to-[#1f2937] overflow-hidden">
      Particle Background Layer
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 150, density: { enable: true, value_area: 800 } },
            color: { value: "#3B82F6" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#3B82F6",
              opacity: 0.4,
              width: 1,
            },
          },
          interactivity: {
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" },
            },
          },
          retina_detect: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* Optional 3D Star Background (Uncomment to use) */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <OrbitControls autoRotate autoRotateSpeed={0.3} enableZoom={false} />
          <Stars
            radius={100}
            depth={50}
            count={3000}
            factor={4}
            saturation={0}
            fade
          />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
        </Canvas>
      </div>

      {/* Floating Gradient Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Main Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="space-y-8"
        >
          {/* Animated Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="block">University</span>
            <span className="block mt-2">News Nexus</span>
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            Experience news in a revolutionary dimension with real-time updates, 
            AI-curated feeds, and immersive storytelling.
          </motion.p>

          {/* Animated Buttons */}
          <motion.div
            className="flex gap-6 justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 1 }}
          >
            <Link to='/universityNews' className=''>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all"
            >
              Explore Now
            </motion.button></Link>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-blue-500 hover:bg-blue-500/20 rounded-2xl text-[#2363ec] text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all"
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.div
          className="absolute bottom-8"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ 
            repeat: Infinity,
            duration: 1.5,
            repeatType: 'mirror'
          }}
        >
          <motion.div
            className="w-8 h-8 border-4 border-blue-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;