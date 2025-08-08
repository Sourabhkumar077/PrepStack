import React, { useState } from 'react';
import api from '../utils/api';

const GoalTracker = ({ goal, onGoalUpdated }) => {
  const [newTopic, setNewTopic] = useState('');
  const [newResource, setNewResource] = useState('');

  const handleAddTopic = async (e) => {
    e.preventDefault();
    if (!newTopic.trim()) return;
    const updatedTopics = [...goal.completedTopics, newTopic];
    try {
      await api.put(`/goals/${goal._id}`, { completedTopics: updatedTopics });
      setNewTopic('');
      onGoalUpdated();
    } catch (err) {
      alert('Failed to add topic.');
    }
  };

  const handleAddResource = async (e) => {
    e.preventDefault();
    if (!newResource.trim()) return;
    const updatedResources = [...goal.resources, newResource];
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

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{goal.subject}</h2>
        <p>Progress: {goal.completedTopics.length} topics completed</p>

        {/* Completed Topics Section */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Completed Topics:</h3>
          {goal.completedTopics.length > 0 ? (
            <ul className="list-disc list-inside space-y-2 text-sm">
              {goal.completedTopics.map((topic, index) => <li key={index}>{topic}</li>)}
            </ul>
          ) : (
            <p className="text-sm text-base-content/70">No topics marked as complete yet.</p>
          )}
          <form onSubmit={handleAddTopic} className="form-control mt-4">
            <div className="join">
              <input 
                type="text"
                placeholder="Add new topic..."
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                className="input input-bordered join-item w-full"
              />
              <button type="submit" className="btn btn-primary join-item">Add</button>
            </div>
          </form>
        </div>

        {/* Resources Section */}
        <div className="mt-6 border-t border-base-300 pt-4">
          <h3 className="font-semibold mb-2">Saved Resources:</h3>
          {goal.resources.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {goal.resources.map((resource, index) => (
                <li key={index}>
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