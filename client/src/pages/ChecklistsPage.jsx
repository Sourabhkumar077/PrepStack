import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import ChecklistCard from '../components/ChecklistCard';

const ChecklistsPage = () => {
  const [checklists, setChecklists] = useState([]);
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchChecklists = async () => {
    try {
      const res = await api.get('/checklists');
      setChecklists(res.data);
    } catch (err) {
      console.error('Failed to fetch checklists', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChecklists();
  }, []);

  const handleCreateChecklist = async (e) => {
    e.preventDefault();
    if (!company.trim()) return;

    // Check if a checklist for this company already exists
    const existing = checklists.find(c => c.company.toLowerCase() === company.trim().toLowerCase());
    if (existing) {
        alert(`A checklist for ${company} already exists!`);
        return;
    }

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
      alert('Failed to create checklist.');
    }
  };
  
  // Function to delete a checklist
  const handleDeleteChecklist = async (id) => {
    if (window.confirm('Are you sure you want to delete this entire checklist?')) {
        try {
            await api.delete(`/checklists/${id}`);
            fetchChecklists(); // Refresh the list after deleting
        } catch (err) {
            alert('Failed to delete checklist.');
        }
    }
  };

  if (loading) return <p className="text-center mt-8">Loading checklists...</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Company Checklists</h1>
      
      <div className="card bg-base-100 shadow-xl">
        <form onSubmit={handleCreateChecklist} className="card-body">
          <h2 className="card-title">Add a New Company</h2>
          <div className="form-control">
            <div className="join">
              <input
                type="text"
                placeholder="Enter Company Name (e.g., Google)"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="input input-bordered join-item w-full"
                required
              />
              <button type="submit" className="btn btn-primary join-item">
                Add Checklist
              </button>
            </div>
          </div>
        </form>
      </div>

      {checklists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {checklists.map(checklist => (
            <ChecklistCard 
                key={checklist._id} 
                checklist={checklist} 
                onUpdate={fetchChecklists}
                onDelete={handleDeleteChecklist} // Pass the delete handler
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 card bg-base-100 shadow-xl">
            <p className="opacity-70">No checklists found. Add a company to get started!</p>
        </div>
      )}
    </div>
  );
};

export default ChecklistsPage;