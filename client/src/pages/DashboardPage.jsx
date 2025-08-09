import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import LogForm from '../components/LogForm';
import LogList from '../components/LogList';
import StudyCalendar from '../components/StudyCalendar';
import StreakCard from '../components/StreakCard'; // <-- IMPORT THE NEW STREAK CARD
import api from '../utils/api';
import { Clock, Target, CheckSquare } from 'lucide-react';

// StatCard component for other stats
const StatCard = ({ icon, title, value, color }) => (
    <div className="card bg-base-200 shadow-md h-full">
        <div className="card-body flex-row items-center gap-4">
            <div className={`p-3 rounded-full ${color}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm opacity-70">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    </div>
);

// GoalProgress component
const GoalProgress = ({ goal }) => {
    const completed = goal.completedTopics.length;
    const total = goal.totalTopics > 0 ? goal.totalTopics : completed > 0 ? completed : 1;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="bg-base-200 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-1">
                <p className="font-semibold">{goal.subject}</p>
                <p className="text-sm opacity-70">{completed} / {total} Topics</p>
            </div>
            <progress 
                className="progress progress-primary w-full" 
                value={percentage} 
                max="100"
            ></progress>
        </div>
    );
};


const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [logs, setLogs] = useState([]);
  const [goals, setGoals] = useState([]);
  const [checklists, setChecklists] = useState([]);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editingLog, setEditingLog] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
        const [logsRes, goalsRes, checklistsRes, streakRes] = await Promise.all([
            api.get('/logs'),
            api.get('/goals'),
            api.get('/checklists'),
            api.get('/auth/streak')
        ]);
        setLogs(logsRes.data);
        setGoals(goalsRes.data);
        setChecklists(checklistsRes.data);
        setStreak(streakRes.data.streak);
    } catch (err) {
        console.error('Error fetching dashboard data:', err);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, []);
  
  const handleEdit = (log) => { setEditingLog(log); window.scrollTo(0, 0); };
  const handleUpdate = () => { setEditingLog(null); fetchData(); };
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this log?')) {
        try {
            await api.delete(`/logs/${id}`);
            fetchData();
            alert('Log deleted successfully.');
        } catch (err) {
            console.error('Error deleting log', err);
            alert('Failed to delete log.');
        }
    }
  };
  
  const totalHours = logs.reduce((acc, log) => 
    acc + log.subjects.reduce((subAcc, subject) => subAcc + (subject.hours || 0), 0), 0
  );
  const totalTopicsCompleted = goals.reduce((acc, goal) => acc + goal.completedTopics.length, 0);

  if (loading) { 
    return (
        <div className="flex h-screen items-center justify-center">
             <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">
        Welcome back, {user?.name}!
      </h1>
      
      {/* --- Stats Section with Enhanced Streak Card --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2"> {/* Make streak card take more space */}
            <StreakCard streak={streak} />
        </div>
        <StatCard icon={<Clock size={24} className="text-white"/>} title="Total Hours Studied" value={totalHours.toFixed(1)} color="bg-blue-500" />
        <StatCard icon={<Target size={24} className="text-white"/>} title="Topics Completed" value={totalTopicsCompleted} color="bg-green-500" />
      </div>

      {/* --- Main Grid Layout --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Calendar and Goals */}
        <div className="lg:col-span-1 space-y-8">
            <StudyCalendar logs={logs} />
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Goal Progress</h2>
                    <div className="space-y-4">
                        {goals.length > 0 ? (
                            goals.map(goal => <GoalProgress key={goal._id} goal={goal} />)
                        ) : (
                            <p>No goals set yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* Right Column: Log Form and Log List */}
        <div className="lg:col-span-2 space-y-8">
            <LogForm 
                onLogAdded={fetchData} 
                editingLog={editingLog} 
                onLogUpdated={handleUpdate} 
            />
            <LogList 
                logs={logs} 
                onDelete={handleDelete} 
                onEdit={handleEdit} 
            />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;