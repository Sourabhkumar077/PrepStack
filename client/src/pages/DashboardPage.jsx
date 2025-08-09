import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import LogForm from '../components/LogForm';
import LogList from '../components/LogList';
import api from '../utils/api';
import { Book, Clock, Target, CheckSquare } from 'lucide-react';

// Chhota card component stats ke liye
const StatCard = ({ icon, title, value, color }) => (
    <div className="card bg-base-200 shadow-md">
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

// Goal progress bar ke liye component
const GoalProgress = ({ goal }) => {
    const completed = goal.completedTopics.length;
    // totalTopics agar 0 hai to progress 0 hi rahegi
    const total = goal.totalTopics > 0 ? goal.totalTopics : completed > 0 ? completed : 1; // Avoid division by zero
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
  // checklists ke liye state add karein
  const [checklists, setChecklists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLog, setEditingLog] = useState(null);

  // Sab data ek saath fetch karein
  const fetchData = async () => {
    setLoading(true);
    try {
        const [logsRes, goalsRes, checklistsRes] = await Promise.all([
            api.get('/logs'),
            api.get('/goals'),
            api.get('/checklists')
        ]);
        setLogs(logsRes.data);
        setGoals(goalsRes.data);
        setChecklists(checklistsRes.data);
    } catch (err) {
        console.error('Error fetching dashboard data:', err);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  // Handler functions
  const handleEdit = (log) => { setEditingLog(log); window.scrollTo(0, 0); };
  const handleUpdate = () => { setEditingLog(null); fetchData(); };
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this log?')) {
        try {
            await api.delete(`/logs/${id}`);
            fetchData(); // Refresh all data
            alert('Log deleted successfully.');
        } catch (err) {
            console.error('Error deleting log', err);
            alert('Failed to delete log.');
        }
    }
  };
  
  // Stats calculate karein
  const totalHours = logs.reduce((acc, log) => 
    acc + log.subjects.reduce((subAcc, subject) => subAcc + (subject.hours || 0), 0), 0
  );
  const totalTopicsCompleted = goals.reduce((acc, goal) => acc + goal.completedTopics.length, 0);
  const totalChecklists = checklists.length;

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
      
      {/* --- Stats Cards Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard icon={<Clock size={24} className="text-white"/>} title="Total Hours Studied" value={totalHours.toFixed(1)} color="bg-blue-500" />
        <StatCard icon={<Target size={24} className="text-white"/>} title="Topics Completed" value={totalTopicsCompleted} color="bg-green-500" />
        <StatCard icon={<CheckSquare size={24} className="text-white"/>} title="Company Checklists" value={totalChecklists} color="bg-purple-500" />
      </div>

      {/* --- Main Grid Layout --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Goals and Checklists */}
        <div className="lg:col-span-1 space-y-8">
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