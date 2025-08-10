import React, { useState, useEffect } from 'react';
import { dsaTopics } from '../data/dsaQuestions';
import { Book, Search, ExternalLink, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DSA_PROGRESS_KEY = 'dsaProgress';

const DSAPage = () => {
  const [progress, setProgress] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  // Load progress from local storage
  useEffect(() => {
    const savedProgress = localStorage.getItem(DSA_PROGRESS_KEY);
    if (savedProgress) setProgress(JSON.parse(savedProgress));
  }, []);

  // Save progress to local storage
  useEffect(() => {
    localStorage.setItem(DSA_PROGRESS_KEY, JSON.stringify(progress));
  }, [progress]);

  const handleToggle = (questionTitle) => {
    setProgress(prev => ({ ...prev, [questionTitle]: !prev[questionTitle] }));
  };

  const filteredTopics = dsaTopics.map(topic => ({
      ...topic,
      questions: topic.questions.filter(q => 
          q.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
  })).filter(topic => topic.questions.length > 0);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold">450 DSA Cracker</h1>
        <p className="mt-2 text-lg text-gray-400">
          Your personal tracker for the Love Babbar 450 DSA sheet.
        </p>
      </div>
      
      {/* Search Bar */}
      <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
              type="text"
              placeholder="Search for a question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full pl-12"
          />
      </div>

      {/* Accordion Container */}
      <div className="space-y-2">
        <AnimatePresence>
          {filteredTopics.map((topic, index) => {
            const completedCount = topic.questions.filter(q => progress[q.title]).length;
            const totalCount = topic.questions.length;
            const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

            return (
              <motion.div
                key={topic.topic}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="collapse collapse-arrow bg-base-100 border border-white/10 shadow-lg"
              >
                <input type="checkbox" className="peer" /> 
                <div className="collapse-title text-xl font-medium peer-checked:bg-slate-800">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                    <div className="flex items-center gap-3">
                      <Book className="text-cyan-400" />
                      {topic.topic}
                    </div>
                    <div className="text-sm text-gray-400 mt-2 sm:mt-0">
                      <span className="font-semibold">{completedCount} / {totalCount} Done</span>
                    </div>
                  </div>
                  <progress 
                      className="progress progress-primary w-full mt-2" 
                      value={percentage} 
                      max="100"
                  ></progress>
                </div>
                <div className="collapse-content bg-base-200/50"> 
                  <ul className="space-y-2 pt-4">
                    {topic.questions.map((q) => (
                      <li key={q.title} className="flex items-center gap-4 p-2 hover:bg-base-100/50 rounded-lg transition-colors group">
                        <input
                          type="checkbox"
                          checked={!!progress[q.title]}
                          onChange={() => handleToggle(q.title)}
                          className="checkbox checkbox-success"
                        />
                        <a 
                          href={q.link || '#'} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={`flex-grow ${progress[q.title] ? 'line-through text-gray-500' : ''}`}
                        >
                          {q.title}
                        </a>
                        <ExternalLink size={16} className="text-gray-600 group-hover:text-primary transition-colors" />
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DSAPage;