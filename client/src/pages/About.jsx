import { motion } from 'framer-motion';
import { Particles } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const AboutPage = () => {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0d1b2a] to-[#1f2937] overflow-hidden ">
      {/* Particle Background */}
      <Particles
        id="about-particles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#3B82F6" },
            shape: { type: "circle" },
            opacity: { value: 0.3, random: false },
            size: { value: 2, random: true },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
            },
          },
          interactivity: {
            events: {
              onhover: { enable: true, mode: "repulse" },
            },
          },
        }}
        className="absolute inset-0 z-0 "
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h1
            className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mt-7"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            About Us
          </motion.h1>
          <motion.p
            className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Shaping the future of campus storytelling through innovation and community collaboration
          </motion.p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className="relative group bg-gray-900/50 backdrop-blur-lg border border-blue-500/30 rounded-2xl p-8 sm:p-12 shadow-2xl hover:shadow-3xl transition-all">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Our Mission
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              At University News Nexus, we're redefining campus journalism through cutting-edge technology 
              and immersive storytelling. Our platform combines real-time updates with AI-enhanced curation 
              to deliver news that matters, when it matters.
            </p>
          </div>
        </motion.div>

        {/* Contribution Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Contributor Card */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative group bg-gray-900/50 backdrop-blur-lg border border-blue-500/30 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Become a Storyteller</h3>
            <p className="text-gray-300 mb-6">
              Share your unique perspective with our global campus community. Whether it's breaking news, 
              investigative journalism, or creative storytelling - your voice matters.
            </p>
            <ul className="space-y-3 mb-6">
              {['AI-powered writing tools', 'Real-time collaboration', 'Multimedia integration', 'Performance analytics'].map((item) => (
                <li key={item} className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-purple-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium flex items-center"
            >
              <span>Start Contributing</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </motion.div>

          {/* Admin Card */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative group bg-gray-900/50 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Join Our Leadership</h3>
            <p className="text-gray-300 mb-6">
              Shape the future of campus media as part of our editorial team. Leverage cutting-edge tools 
              to curate and amplify important stories.
            </p>
            <div className="space-y-4 mb-6">
              {['Content Strategy', 'Quality Assurance', 'Team Leadership', 'Analytics Dashboard'].map((item, index) => (
                <div key={item} className="flex items-center">
                  <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-purple-400">{index + 1}.</span>
                  </div>
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-medium flex items-center"
            >
              <span>Apply Now</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </motion.div>
        </div>

        {/* Workflow Section */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gray-900/50 backdrop-blur-lg border border-blue-500/30 rounded-2xl p-8 sm:p-12 mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
            Next-Gen Publishing Pipeline
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['AI Drafting', 'Peer Review', 'Dynamic Layout', 'Smart Distribution'].map((step, index) => (
              <motion.div
                key={step}
                whileHover={{ y: -5 }}
                className="p-6 bg-gray-800/50 rounded-xl border border-blue-500/20"
              >
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-blue-400 text-xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">{step}</h3>
                <p className="text-gray-300 text-sm">
                  {[
                    'AI-assisted content creation tools',
                    'Collaborative editing environment',
                    'Automated responsive layouts',
                    'Multi-channel distribution system'
                  ][index]}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-12 shadow-2xl"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Shape the Future of Campus Media
          </h2>
          <p className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto">
            Join our network of innovators, storytellers, and digital pioneers. Together, we're building 
            the most advanced university news platform in the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:join@newsnexus.edu"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl flex items-center justify-center gap-2"
            >
              <span>Get Involved</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;