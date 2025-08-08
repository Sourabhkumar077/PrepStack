import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import LogForm from '../components/LogForm';
import LogList from '../components/LogList';
import api from '../utils/api';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLog, setEditingLog] = useState(null);

  const fetchLogs = async () => {
    try {
        const res = await api.get('/logs');
        setLogs(res.data);
    } catch (err) {
        console.error('Error fetching logs:', err);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => { fetchLogs(); }, []);

  const handleEdit = (log) => { setEditingLog(log); window.scrollTo(0, 0); };
  const handleUpdate = () => { setEditingLog(null); fetchLogs(); };
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this log?')) {
        try {
            await api.delete(`/logs/${id}`);
            setLogs(logs.filter(log => log._id !== id));
            alert('Log deleted successfully.');
        } catch (err) {
            console.error('Error deleting log', err);
            alert('Failed to delete log.');
        }
    }
  };

  if (loading) { return <div className="flex h-screen items-center justify-center">Loading Dashboard...</div>; }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">
        Welcome back, {user?.name}!
      </h1>

      <LogForm 
        onLogAdded={fetchLogs} 
        editingLog={editingLog} 
        onLogUpdated={handleUpdate} 
      />

      <LogList 
        logs={logs} 
        onDelete={handleDelete} 
        onEdit={handleEdit} 
      />
    </div>
  );
};

export default DashboardPage;