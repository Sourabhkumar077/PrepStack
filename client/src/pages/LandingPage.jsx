import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, ListChecks, BarChart2, CheckSquare, BrainCircuit, BookCopy, MessageSquare, Bot } from 'lucide-react';

// Helper component for the floating feature cards in the hero section
const FeatureCardFloat = ({ icon, text, position, animationProps }) => {
  return (
    <motion.div
      className={`absolute ${position} z-0 flex items-center gap-4 bg-white p-4 rounded-2xl shadow-lg border border-slate-100`}
      {...animationProps}
    >
      {icon}
      <p className="font-semibold text-slate-700">{text}</p>
    </motion.div>
  );
};

const LandingPage = () => {
  const floatAnimation = (delay = 0) => ({
    initial: { y: 0 },
    animate: { y: [0, -10, 0] },
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
      delay
    }
  });

  // Animation variants for other sections
  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="bg-slate-50 font-sans text-gray-800">
      {/* Navbar from your Hero Section Code */}
      <nav className="max-w-7xl mx-auto py-4 px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CheckSquare className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-slate-800">PrepStack</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-slate-600 font-semibold hover:text-blue-600">
            Sign In
          </Link>
          <Link to="/login">
            <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* 1. Hero Section (Your Provided Code) */}
      <div className="relative max-w-7xl mx-auto flex justify-center py-24 md:py-32 px-8">
        <FeatureCardFloat 
          icon={<BarChart2 className="h-8 w-8 text-green-500" />}
          text="Daily Study Logs"
          position="hidden md:block top-1/4 left-0"
          animationProps={floatAnimation()}
        />
        <FeatureCardFloat 
          icon={<Target className="h-8 w-8 text-purple-500" />}
          text="Subject Goals"
          position="hidden md:block top-10 right-0"
          animationProps={floatAnimation(0.5)}
        />
        <FeatureCardFloat 
          icon={<ListChecks className="h-8 w-8 text-red-500" />}
          text="Company Checklists"
          position="hidden md:block bottom-1/4 right-10"
          animationProps={floatAnimation(1)}
        />
        <div className="relative z-10 text-center max-w-3xl">
          <BarChart2 className="h-12 w-12 mx-auto text-blue-600 mb-6" />
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Plan, Track, and Ace Your Placements.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10">
            Your all-in-one dashboard to streamline preparation and boost your success.
          </p>
          <Link to="/login">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Start Tracking for Free
            </motion.button>
          </Link>
        </div>
      </div>

      {/* 2. Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Succeed
          </h2>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <FeatureCard 
              icon={<BrainCircuit className="h-8 w-8 text-indigo-600" />}
              title="DSA Practice"
              description="Solve curated coding problems for placement prep."
            />
            <FeatureCard 
              icon={<BookCopy className="h-8 w-8 text-indigo-600" />}
              title="Aptitude Tests"
              description="Practice quantitative, logical, and verbal reasoning."
            />
            <FeatureCard 
              icon={<MessageSquare className="h-8 w-8 text-indigo-600" />}
              title="SQL Mastery"
              description="Hands-on SQL queries for interview success."
            />
            <FeatureCard 
              icon={<Bot className="h-8 w-8 text-indigo-600" />}
              title="Mock Interviews"
              description="Real-world simulated interview experience."
            />
          </motion.div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            How PrepStack Works
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-20">
            <HowItWorksStep number="1" title="Sign Up" description="Create your free account in seconds."/>
            <HowItWorksStep number="2" title="Choose Your Track" description="Select your target roles and subjects."/>
            <HowItWorksStep number="3" title="Start Preparing" description="Dive into our curated content and track your progress."/>
          </div>
        </div>
      </section>

      {/* 4. Call-to-Action Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Ace Your Placements?</h2>
          <Link to="/login">
            <button className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full text-lg mt-4 hover:bg-gray-100 transition-colors">
              Join Free Beta
            </button>
          </Link>
        </div>
      </motion.section>

      {/* 5. Footer */}
      <footer className="bg-gray-100">
        <div className="container mx-auto px-6 py-8 flex justify-between items-center">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} PrepStack. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-indigo-600">About</a>
            <a href="#" className="text-gray-500 hover:text-indigo-600">Contact</a>
            <a href="#" className="text-gray-500 hover:text-indigo-600">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper component for Feature cards
const FeatureCard = ({ icon, title, description }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  return (
    <motion.div variants={cardVariants} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

// Helper component for "How It Works" steps
const HowItWorksStep = ({ number, title, description }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="flex items-center justify-center h-16 w-16 mx-auto bg-indigo-100 text-indigo-600 rounded-full text-2xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default LandingPage;