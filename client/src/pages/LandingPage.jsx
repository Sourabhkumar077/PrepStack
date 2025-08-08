import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, ListChecks, BarChart2, CheckSquare } from 'lucide-react';

const FeatureCard = ({ icon, text, position, animationProps }) => {
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

  return (
    <div className="bg-slate-50 min-h-screen">
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

      <div className="relative max-w-7xl mx-auto flex justify-center py-24 md:py-32 px-8">
        <FeatureCard 
          icon={<BarChart2 className="h-8 w-8 text-green-500" />}
          text="Daily Study Logs"
          position="hidden md:block top-1/4 left-0"
          animationProps={floatAnimation()}
        />
        <FeatureCard 
          icon={<Target className="h-8 w-8 text-purple-500" />}
          text="Subject Goals"
          position="hidden md:block top-10 right-0"
          animationProps={floatAnimation(0.5)}
        />
        <FeatureCard 
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
    </div>
  );
};

export default LandingPage;