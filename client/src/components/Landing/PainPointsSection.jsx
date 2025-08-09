import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const PainPointsSection = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const painPoints = [
    {
      icon: <AlertTriangle className="h-6 w-6 text-amber-500" />,
      text: 'Scattered resources across multiple websites',
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-amber-500" />,
      text: 'No structured learning roadmap',
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-amber-500" />,
      text: 'Weak aptitude & interview preparation',
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-amber-500" />,
      text: 'Lack of mock interview experience',
    },
  ];

  return (
    <section className="bg-amber-50 py-20">
      <div className="container mx-auto px-6">
        <motion.h2
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-4xl font-bold text-center text-gray-900 mb-12"
        >
          Why Most Students Fail in Placements
        </motion.h2>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto"
        >
          {painPoints.map((point, index) => (
            <motion.div key={index} variants={itemVariants} className="flex items-start gap-4">
              {point.icon}
              <p className="text-lg text-gray-700">{point.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center text-xl font-bold text-gray-900 mt-16"
        >
          PrepStack fixes this with an all-in-one structured platform.
        </motion.p>
      </div>
    </section>
  );
};

export default PainPointsSection;