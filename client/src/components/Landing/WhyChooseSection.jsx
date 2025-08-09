import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export const WhyChooseSection = () => {
  const tableVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const comparisonData = [
    {
      feature: 'DSA + Aptitude + SQL in one',
      prepstack: <Check className="h-6 w-6 text-green-500" />,
      others: <X className="h-6 w-6 text-red-500" />,
    },
    {
      feature: 'Mock Interviews',
      prepstack: <Check className="h-6 w-6 text-green-500" />,
      others: <X className="h-6 w-6 text-red-500" />,
    },
    {
      feature: 'Student-friendly design',
      prepstack: <Check className="h-6 w-6 text-green-500" />,
      others: <X className="h-6 w-6 text-red-500" />,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Why Choose PrepStack?
        </h2>
        <motion.div
          variants={tableVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="max-w-3xl mx-auto overflow-x-auto"
        >
          <table className="w-full text-lg border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-4 font-semibold text-slate-700 text-left border-b border-slate-200">Feature</th>
                <th className="p-4 font-semibold text-slate-700 text-center border-b border-slate-200">PrepStack</th>
                <th className="p-4 font-semibold text-slate-700 text-center border-b border-slate-200">Other Platforms</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index} className="border-t border-slate-200">
                  <td className="p-4 text-slate-600">{row.feature}</td>
                  <td className="p-4">
                    <div className="flex justify-center">{row.prepstack}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center">{row.others}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;