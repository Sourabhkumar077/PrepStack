import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import LogForm from '../components/LogForm';
import LogList from '../components/LogList';
import api from '../utils/api';

const DashboardPage = () => {
  const { logout, token } = useContext(AuthContext);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLog, setEditingLog] = useState(null);

  const handleEdit = (log) => {
    setEditingLog(log);
    window.scrollTo(0, 0); // Scroll to top to see the form
  };

  const handleUpdate = () => {
    setEditingLog(null); // Clear editing state
    fetchLogs(); // Refresh the entire list
  };

  const handleDelete = async (id) => {
    // Add a confirmation dialog
    if (window.confirm('Are you sure you want to delete this log?')) {
      try {
        await api.delete(`/logs/${id}`);
        // Refresh logs by filtering out the deleted one
        setLogs(logs.filter(log => log._id !== id));
        alert('Log deleted successfully.');
      } catch (err) {
        console.error('Error deleting log', err);
        alert('Failed to delete log.');
      }
    }
  };
  const fetchLogs = async () => {
    try {
      // No need to pass headers manually anymore!
      const res = await api.get('/logs');
      setLogs(res.data);
    } catch (err) {
      console.error('Error fetching logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Loading logs...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome to your Dashboard!</h1>
          <button
            onClick={logout}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <LogForm onLogAdded={fetchLogs} editingLog={editingLog} onLogUpdated={handleUpdate}  />
        <LogList logs={logs} onDelete={handleDelete} onEdit={handleEdit}/>
      </div>
    </div>
  );
};

export default DashboardPage;