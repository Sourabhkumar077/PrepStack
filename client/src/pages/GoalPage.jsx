import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import GoalTracker from '../components/GoalTracker';

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGoals = async () => {
    try {
      const res = await api.get('/goals');
      setGoals(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  if (loading) return <p>Loading goals...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {goals.map(goal => (
        <GoalTracker key={goal._id} goal={goal} onGoalUpdated={fetchGoals} />
      ))}
    </div>
  );
};

export default GoalsPage;