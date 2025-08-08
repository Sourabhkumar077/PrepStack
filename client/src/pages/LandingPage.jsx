import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Code, 
  Database, 
  Brain, 
  MessageCircle, 
  CheckCircle, 
  X, 
  Target,
  Clock,
  BookOpen,
  Users,
  CheckSquare 
} from 'lucide-react';

// Animation variants for reusability
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

// --- Child Components for each section ---

const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          {/* Updated Logo */}
          <CheckSquare className="h-8 w-8 text-cyan-400" />
          <span className="text-2xl font-bold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
            PrepStack
          </span>
        </Link>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-gray-300 font-semibold hover:text-white transition-colors">
            Sign In
          </Link>
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white font-semibold shadow-lg hover:bg-white/20 transition-all"
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-400/10 to-pink-400/10 animate-pulse"></div>
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ rotate: { duration: 50, repeat: Infinity, ease: "linear" }, scale: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute -top-1/2 -right-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl"
        ></motion.div>
        <motion.div 
          animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
          transition={{ rotate: { duration: 60, repeat: Infinity, ease: "linear" }, scale: { duration: 10, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute -bottom-1/2 -left-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 blur-3xl"
        ></motion.div>
      </div>

      {/* Floating Icons */}
      <motion.div animate={{ y: [-20, 20, -20] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 left-1/4 text-cyan-400/30">
        <Code size={40} />
      </motion.div>
      <motion.div animate={{ y: [20, -20, 20] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/3 right-1/4 text-purple-400/30">
        <Database size={35} />
      </motion.div>
      <motion.div animate={{ y: [-15, 15, -15] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-1/3 left-1/3 text-indigo-400/30">
        <Brain size={45} />
      </motion.div>

      {/* Content */}
      <motion.div initial="initial" animate="animate" variants={staggerContainer} className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Updated Headline */}
        <motion.h1 variants={fadeInUp} className="text-3xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent leading-tight">
          Plan, Track and Ace your Placements 
          {/* <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            PrepStack
          </span> */}
        </motion.h1>
        
        <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Your all-in-one platform for DSA, Aptitude, SQL, and Mock Interviews. Master every aspect of placement preparation in one unified experience.
        </motion.p>
        
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link to="/login">
            <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-white font-semibold text-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center gap-3">
              Get Started
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200" size={20} />
            </motion.button>
          </Link>
          <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300">
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

const ProblemSection = () => {
  const problems = [
    { icon: <Target className="text-red-400" size={24} />, title: "Scattered Resources", description: "Students waste time jumping between different platforms and books" },
    { icon: <BookOpen className="text-amber-400" size={24} />, title: "No Structured Path", description: "Lack of clear learning roadmap leads to confusion and gaps" },
    { icon: <MessageCircle className="text-orange-400" size={24} />, title: "No Real Practice", description: "Missing realistic interview scenarios and feedback" },
    { icon: <Clock className="text-red-500" size={24} />, title: "Poor Time Management", description: "Students struggle to balance different preparation areas effectively" }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-amber-500/5 to-orange-500/5"></div>
      
      <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="container mx-auto px-4 relative z-10">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Why Most Students{' '}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Fail
            </span>{' '}
            in Placements
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {problems.map((problem, index) => (
            <motion.div key={index} variants={staggerItem} whileHover={{ scale: 1.02, y: -5 }} className="group p-6 bg-white/5 backdrop-blur-sm border border-red-500/20 rounded-2xl hover:border-red-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl group-hover:scale-110 transition-transform duration-200">
                  {problem.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{problem.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{problem.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeInUp} className="text-center">
          <p className="text-2xl md:text-3xl text-gray-300 mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              PrepStack
            </span> fixes this with...
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

const ComparisonSection = () => {
  const features = [
    { feature: "DSA + Aptitude + SQL in one", prepstack: true, others: false },
    { feature: "Mock Interviews with AI", prepstack: true, others: false },
    { feature: "Student-friendly Design", prepstack: true, others: false },
    { feature: "Structured Learning Path", prepstack: true, others: false },
    { feature: "Real-time Progress Tracking", prepstack: true, others: false },
    { feature: "Community Support", prepstack: true, others: false }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 right-0 w-72 h-72 rounded-full bg-gradient-to-l from-cyan-500/20 to-transparent blur-3xl"></motion.div>
      </div>

      <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="container mx-auto px-4 relative z-10">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              PrepStack?
            </span>
          </h2>
        </motion.div>

        <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-3xl overflow-hidden">
            <div className="grid grid-cols-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-b border-cyan-500/20">
              <div className="p-6"><h3 className="text-lg font-semibold text-gray-300">Features</h3></div>
              <div className="p-6 text-center border-x border-cyan-500/20"><h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">PrepStack</h3></div>
              <div className="p-6 text-center"><h3 className="text-lg font-semibold text-gray-300">Others</h3></div>
            </div>

            {features.map((item, index) => (
              <motion.div key={index} variants={staggerItem} whileHover={{ backgroundColor: 'rgba(6, 182, 212, 0.05)' }} className="grid grid-cols-3 border-b border-white/10 last:border-b-0 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5">
                <div className="p-6"><span className="text-white font-medium">{item.feature}</span></div>
                <div className="p-6 text-center border-x border-white/10 flex items-center justify-center">
                  {item.prepstack ? <CheckCircle className="text-green-400" size={24} /> : <X className="text-red-400" size={24} />}
                </div>
                <div className="p-6 text-center flex items-center justify-center">
                  {item.others ? <CheckCircle className="text-green-400" size={24} /> : <X className="text-red-400" size={24} />}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
        <motion.div animate={{ rotate: 360, scale: [0.8, 1.2, 0.8] }} transition={{ rotate: { duration: 40, repeat: Infinity, ease: "linear" }, scale: { duration: 12, repeat: Infinity, ease: "easeInOut" } }} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/30 to-purple-500/30 blur-3xl"></motion.div>
      </div>

      <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer} className="container mx-auto px-4 text-center relative z-10">
        <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-bold mb-8 text-white leading-tight">
          Start Your Placement Prep{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Today
          </span>
        </motion.h2>
        
        <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Join thousands of students who have successfully landed their dream jobs with PrepStack
        </motion.p>
        
        <motion.div variants={fadeInUp}>
          <Link to="/login">
            <motion.button whileHover={{ scale: 1.05, y: -3, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)" }} whileTap={{ scale: 0.95 }} className="group px-12 py-6 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-2xl text-white font-bold text-2xl shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 flex items-center gap-4 mx-auto">
              <Users size={28} />
              Join Now — It's Free
              <ArrowRight className="group-hover:translate-x-2 transition-transform duration-200" size={28} />
            </motion.button>
          </Link>
        </motion.div>

        <motion.p variants={fadeInUp} className="mt-8 text-gray-400 text-lg">
          No credit card required • Start learning immediately
        </motion.p>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-cyan-500/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            PrepStack
          </motion.h3>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Empowering students to achieve their placement dreams through comprehensive, structured preparation.
          </motion.p>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-gray-500 text-sm">
            © {new Date().getFullYear()} PrepStack. All rights reserved.
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

// Main LandingPage Component
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <ComparisonSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
