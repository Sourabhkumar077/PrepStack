import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios'; // We will replace this with a custom 'api' utility
import LogForm from '../components/LogForm';
import LogList from '../components/LogList';

const DashboardPage = () => {
  const { logout, token } = useContext(AuthContext);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      const res = await axios.get('/api/logs', config);
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

        <LogForm onLogAdded={fetchLogs} />
        <LogList logs={logs} />
      </div>
    </div>
  );
};

export default DashboardPage;