import React, { useState, useEffect, useContext, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { AuthContext } from '../contexts/AuthContext';
import LogForm from '../components/LogForm';
import LogList from '../components/LogList';
import StudyCalendar from '../components/StudyCalendar';
import StreakCard from '../components/StreakCard';
import { PrintableLogListClass } from '../components/PrintableLogListClass'; // Using the stable class component
import api from '../utils/api';
import { Clock, Target, CheckSquare, Download } from 'lucide-react';

// Reusable component for summary statistics
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

// Reusable component for displaying goal progress
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
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editingLog, setEditingLog] = useState(null);

  // Ref for the hidden, printable component
  const printableRef = useRef(null);

  // Hook for handling the print action
  const handlePrint = useReactToPrint({
    content: () => printableRef.current,
    documentTitle: `PrepStack-Study-Logs-${user?.name}`,
  });

  // Fetches all necessary data for the dashboard in one go
  const fetchData = async () => {
    setLoading(true);
    try {
        const [logsRes, goalsRes, streakRes] = await Promise.all([
            api.get('/logs'),
            api.get('/goals'),
            api.get('/auth/streak')
        ]);
        setLogs(logsRes.data);
        setGoals(goalsRes.data);
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
  
  // Handlers for log actions
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
  
  // Calculate stats from the fetched data
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
        {/* Header Section with Export Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-4xl font-bold">
                Welcome back, {user?.name}!
            </h1>
            <button 
                onClick={handlePrint} 
                className="btn btn-outline btn-primary gap-2"
                disabled={logs.length === 0} // Button is disabled if there are no logs
            >
                <Download size={16} />
                Export Logs to PDF
            </button>
        </div>
      
        {/* Top Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2">
                <StreakCard streak={streak} />
            </div>
            <StatCard icon={<Clock size={24} className="text-white"/>} title="Total Hours Studied" value={totalHours.toFixed(1)} color="bg-blue-500" />
            <StatCard icon={<Target size={24} className="text-white"/>} title="Topics Completed" value={totalTopicsCompleted} color="bg-green-500" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
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

            {/* Right Column */}
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
      
        {/* Hidden component for printing */}
        <div className="hidden">
            <PrintableLogListClass ref={printableRef} logs={logs} user={user} />
        </div>
    </div>
  );
};

export default DashboardPage;