import React, { useState, useEffect } from 'react';
import { projects } from '../data/projects';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute top-20 right-20 w-48 h-48 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-2xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-500/5 to-orange-500/5 rounded-full blur-xl"
          animate={{ 
            x: [0, -20, 0],
            y: [0, 20, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      <div className="container">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Projects
          </h2>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredProject(idx)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image Container */}
              <div 
                className="relative h-80 w-full overflow-hidden cursor-pointer"
                onClick={() => openModal(proj)}
              >
                <motion.img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                  initial={{ opacity: 0, scale: 1.1 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                />
                
                {/* Dark overlay - appears on hover */}
                <motion.div 
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-500" 
                />
                
                {/* Project title - appears on hover */}
                <motion.div 
                  className="absolute bottom-6 left-6 right-6 z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: hoveredProject === idx ? 1 : 0,
                    y: hoveredProject === idx ? 0 : 20
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-white font-bold text-2xl drop-shadow-lg mb-1">
                    {proj.title}
                  </h3>
                  <p className="text-white/90 text-sm drop-shadow-md">
                    {proj.period}
                  </p>
                </motion.div>

                {/* Spiral Wind Effect - appears on hover */}
                <AnimatePresence>
                  {hoveredProject === idx && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Spiral wind particles */}
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white/60 rounded-full"
                          style={{
                            left: '50%',
                            top: '50%',
                            transformOrigin: '0 0',
                          }}
                          initial={{
                            x: 0,
                            y: 0,
                            scale: 0,
                            rotate: i * 30,
                          }}
                          animate={{
                            x: [0, Math.cos(i * 30 * Math.PI / 180) * 100],
                            y: [0, Math.sin(i * 30 * Math.PI / 180) * 100],
                            scale: [0, 1, 0],
                            rotate: [i * 30, i * 30 + 360],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Modal Content */}
            <motion.div
              className="relative w-[95vw] max-w-5xl max-h-[95vh] rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl p-0 shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
                {/* Modal header with image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover object-center"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-white font-bold text-4xl drop-shadow-lg mb-2">
                      {selectedProject.title}
                    </h2>
                    <p className="text-white/90 text-lg drop-shadow-md">
                      {selectedProject.period}
                    </p>
                  </div>
                  
                  {/* Close button */}
                  <motion.button 
                    className="absolute right-6 top-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition-all duration-300"
                    aria-label="Close dialog"
                    onClick={closeModal}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
                
                {/* Modal content */}
                <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                  <div>
                    <h4 className="font-bold text-foreground text-xl mb-4 flex items-center gap-3">
                      <span className="w-3 h-3 bg-gradient-to-r from-primary to-purple-500 rounded-full"></span>
                      Project Description
                    </h4>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {selectedProject.description}
                    </p>
                  </div>
                  
                  {selectedProject.tags && (
                    <div>
                      <h4 className="font-bold text-foreground text-xl mb-4 flex items-center gap-3">
                        <span className="w-3 h-3 bg-gradient-to-r from-primary to-purple-500 rounded-full"></span>
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.tags.map((t, i) => (
                          <motion.span 
                            key={i} 
                            className="inline-flex items-center rounded-full border border-border/50 px-4 py-2 text-sm font-medium text-muted-foreground bg-gradient-to-r from-muted/30 to-muted/50 hover:from-primary/10 hover:to-purple-500/10 transition-all duration-300"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {t}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Visit Sites Button - Centered and Bigger */}
                <div className="flex justify-center items-center p-8 border-t border-border/20">
                  <motion.a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-primary to-purple-500 text-white font-bold text-lg rounded-2xl hover:from-primary/90 hover:to-purple-500/90 transition-all duration-300 shadow-xl hover:shadow-2xl"
                    whileHover={{ scale: 1.08, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visit Site
                  </motion.a>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;