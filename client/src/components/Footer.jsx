import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, CheckSquare } from 'lucide-react'; // Social icons import karein

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-cyan-500/20 relative overflow-hidden mt-16">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckSquare className="h-8 w-8 text-cyan-400" />
            <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              PrepStack
            </span>
          </div>

          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.1 }} 
            className="text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            Empowering students to achieve their placement dreams through comprehensive, structured preparation.
          </motion.p>
          
          {/* Social Media Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center gap-6 mb-8"
          >
            <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="https://twitter.com/your-username" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={24} />
            </a>
          </motion.div>
          
          {/* Copyright Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.3 }} 
            className="text-gray-500 text-sm"
          >
            © {new Date().getFullYear()} PrepStack. All rights reserved.
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;