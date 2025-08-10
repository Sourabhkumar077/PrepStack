import React, { useState } from 'react';
import api from '../utils/api';
import { BookOpen, Link, Plus, Target, Trash2 } from 'lucide-react';

const GoalTracker = ({ goal, onGoalUpdated }) => {
  const [newTopic, setNewTopic] = useState('');
  const [newResource, setNewResource] = useState('');
  
  // State for editing the total topics target
  const [targetTopics, setTargetTopics] = useState(goal.totalTopics || 0);

  const handleUpdateTarget = async (e) => {
    e.preventDefault();
    const newTotal = parseInt(targetTopics, 10);
    if (isNaN(newTotal) || newTotal < 0) {
        alert('Please enter a valid number for total topics.');
        return;
    }
    try {
      await api.put(`/goals/${goal._id}`, { totalTopics: newTotal });
      onGoalUpdated(); // Refresh the data on the parent page
    } catch (err) {
      alert('Failed to update target topics.');
    }
  };

  const handleAddTopic = async (e) => {
    e.preventDefault();
    if (!newTopic.trim()) return;
    const updatedTopics = [...goal.completedTopics, newTopic.trim()];
    try {
      await api.put(`/goals/${goal._id}`, { completedTopics: updatedTopics });
      setNewTopic('');
      onGoalUpdated();
    } catch (err) {
      alert('Failed to add topic.');
    }
  };

  const handleRemoveTopic = async (topicToRemove) => {
    const updatedTopics = goal.completedTopics.filter(topic => topic !== topicToRemove);
    try {
      await api.put(`/goals/${goal._id}`, { completedTopics: updatedTopics });
      onGoalUpdated();
    } catch (err) {
      alert('Failed to remove topic.');
    }
  };

  const handleAddResource = async (e) => {
    e.preventDefault();
    if (!newResource.trim()) return;
    const updatedResources = [...goal.resources, newResource.trim()];
    try {
      await api.put(`/goals/${goal._id}`, { resources: updatedResources });
      setNewResource('');
      onGoalUpdated();
    } catch (err) {
      alert('Failed to add resource.');
    }
  };
  
  const isUrl = (string) => {
    try { new URL(string); return true; } catch (_) { return false; }
  };

  // Progress calculation
  const completedCount = goal.completedTopics.length;
  const totalCount = goal.totalTopics > 0 ? goal.totalTopics : completedCount;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="card bg-base-100 shadow-xl border border-white/10">
      <div className="card-body">
        <h2 className="card-title text-2xl">{goal.subject}</h2>
        
        {/* Progress Bar and Stats */}
        <div className="my-4">
            <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span className="font-semibold">{completedCount} / {goal.totalTopics || 'Not Set'}</span>
            </div>
            <progress 
                className="progress progress-primary w-full" 
                value={percentage} 
                max="100"
            ></progress>
        </div>

        {/* Set Target Form */}
        <form onSubmit={handleUpdateTarget} className="form-control gap-2">
            <label className="label-text font-semibold flex items-center gap-2"><Target size={16}/> Set Total Topics Target</label>
            <div className="join">
                <input 
                    type="number"
                    min="0"
                    value={targetTopics}
                    onChange={(e) => setTargetTopics(e.target.value)}
                    className="input input-bordered join-item w-full"
                    placeholder="e.g., 50"
                />
                <button type="submit" className="btn btn-secondary join-item">Set</button>
            </div>
        </form>

        {/* Completed Topics Section */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2 flex items-center gap-2"><BookOpen size={16}/> Completed Topics:</h3>
          {goal.completedTopics.length > 0 ? (
            <ul className="space-y-2 text-sm list-inside">
              {goal.completedTopics.map((topic, index) => (
                <li key={index} className="flex items-center justify-between bg-base-200/50 p-2 rounded-md">
                    <span>{topic}</span>
                    <button onClick={() => handleRemoveTopic(topic)} className="btn btn-ghost btn-xs btn-square">
                        <Trash2 size={14} className="text-red-400"/>
                    </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-base-content/70">No topics marked as complete yet.</p>
          )}
          <form onSubmit={handleAddTopic} className="form-control mt-4">
            <div className="join">
              <input 
                type="text"
                placeholder="Add new completed topic..."
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                className="input input-bordered join-item w-full"
              />
              <button type="submit" className="btn btn-primary join-item"><Plus size={16}/></button>
            </div>
          </form>
        </div>

        {/* Resources Section */}
        <div className="mt-6 border-t border-base-300 pt-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2"><Link size={16}/> Saved Resources:</h3>
          {goal.resources.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {goal.resources.map((resource, index) => (
                <li key={index} className="p-2 rounded-md bg-base-200/50">
                  {isUrl(resource) ? (
                    <a href={resource} target="_blank" rel="noopener noreferrer" className="link link-primary break-all">{resource}</a>
                  ) : (
                    <p>{resource}</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-base-content/70">No resources saved yet.</p>
          )}
          <form onSubmit={handleAddResource} className="form-control mt-4">
             <div className="join">
                <input 
                  type="text"
                  placeholder="Add a link or note..."
                  value={newResource}
                  onChange={(e) => setNewResource(e.target.value)}
                  className="input input-bordered join-item w-full"
                />
                <button type="submit" className="btn join-item">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GoalTracker;