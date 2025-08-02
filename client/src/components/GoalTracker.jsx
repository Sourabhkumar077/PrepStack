import React, { useState } from 'react';
import api from '../utils/api';

const GoalTracker = ({ goal, onGoalUpdated }) => {
  const [newTopic, setNewTopic] = useState('');

  const handleAddTopic = async (e) => {
    e.preventDefault();
    if (!newTopic.trim()) return;

    const updatedTopics = [...goal.completedTopics, newTopic];

    try {
      await api.put(`/goals/${goal._id}`, { completedTopics: updatedTopics });
      setNewTopic('');
      onGoalUpdated(); // Refresh all goals
    } catch (err) {
      console.error('Failed to update goal', err);
      alert('Failed to add topic.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="text-xl font-bold text-gray-800">{goal.subject}</h4>
      <p className="text-gray-600 my-2">
        Progress: {goal.completedTopics.length} / {goal.totalTopics > 0 ? goal.totalTopics : 'N/A'} topics completed
      </p>

      <div className="mt-4">
        <h5 className="font-semibold mb-2">Completed Topics:</h5>
        {goal.completedTopics.length > 0 ? (
          <ul className="list-disc list-inside space-y-1">
            {goal.completedTopics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No topics marked as complete yet.</p>
        )}
      </div>

      <form onSubmit={handleAddTopic} className="flex gap-2 mt-4">
        <input 
          type="text"
          placeholder="Add new completed topic"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          className="flex-grow p-2 border rounded"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add</button>
      </form>
    </div>
  );
};

export default GoalTracker;