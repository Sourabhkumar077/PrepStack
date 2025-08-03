import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import ChecklistCard from '../components/ChecklistCard';

const ChecklistsPage = () => {
  const [checklists, setChecklists] = useState([]);
  const [company, setCompany] = useState('');

  const fetchChecklists = async () => {
    try {
      const res = await api.get('/checklists');
      setChecklists(res.data);
    } catch (err) {
      console.error('Failed to fetch checklists', err);
    }
  };

  useEffect(() => {
    fetchChecklists();
  }, []);

  const handleCreateChecklist = async (e) => {
    e.preventDefault();
    if (!company.trim()) return;

    const newChecklist = {
      company,
      items: [
        { title: 'Online Assessment', done: false },
        { title: 'Technical Interview 1', done: false },
        { title: 'Technical Interview 2', done: false },
        { title: 'HR Round', done: false },
      ],
    };

    try {
      await api.post('/checklists', newChecklist);
      setCompany('');
      fetchChecklists();
    } catch (err) {
      console.error('Failed to create checklist', err);
      alert('Failed to create checklist.');
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateChecklist} className="bg-white p-6 rounded-lg shadow-md mb-8 flex gap-4">
        <input
          type="text"
          placeholder="Enter Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="flex-grow p-3 border rounded-md"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
          Add Checklist
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {checklists.map(checklist => (
          <ChecklistCard key={checklist._id} checklist={checklist} onUpdate={fetchChecklists} />
        ))}
      </div>
    </div>
  );
};

export default ChecklistsPage;