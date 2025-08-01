import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const LogForm = ({ onLogAdded, editingLog, onLogUpdated }) => {
  const initialSubject = { name: '', hours: '', notes: '' };
  const [date, setDate] = useState('');
  const [subjects, setSubjects] = useState([initialSubject]);
  const [overallNote, setOverallNote] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editingLog) {
      setIsEditing(true);
      setDate(editingLog.date);
      setSubjects(editingLog.subjects);
      setOverallNote(editingLog.overallNote);
    } else {
      setIsEditing(false);
      clearForm();
    }
  }, [editingLog]);

  const handleSubjectChange = (index, event) => {
    const values = [...subjects];
    values[index][event.target.name] = event.target.value;
    setSubjects(values);
  };

  const handleAddSubject = () => setSubjects([...subjects, { name: '', hours: '', notes: '' }]);
  
  const handleRemoveSubject = (index) => {
    const values = [...subjects];
    values.splice(index, 1);
    setSubjects(values);
  };

  const clearForm = () => {
    setDate(new Date().toISOString().split('T')[0]);
    setSubjects([initialSubject]);
    setOverallNote('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filledSubjects = subjects.filter(sub => sub.name.trim() !== '' && sub.hours.toString().trim() !== '');
    if (filledSubjects.length === 0) {
      return alert('Please add at least one subject with a name and hours.');
    }
    const logData = { date, subjects: filledSubjects, overallNote };
    try {
      if (isEditing) {
        await api.put(`/logs/${editingLog._id}`, logData);
        alert('Log updated successfully!');
        onLogUpdated();
      } else {
        await api.post('/logs', logData);
        alert('Log saved successfully!');
        onLogAdded();
      }
      clearForm();
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
      alert('Operation failed. Check console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Study Log' : 'Add a New Study Log'}</h3>
      
      {/* THIS SECTION WAS LIKELY MISSING */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Overall Note</label>
          <input type="text" placeholder="e.g., Productive day" value={overallNote} onChange={(e) => setOverallNote(e.target.value)} className="w-full p-2 border rounded" />
        </div>
      </div>

      {/* THIS SECTION WAS LIKELY MISSING */}
      <div className="mt-6">
        <h4 className="text-xl font-semibold mb-2">Subjects Studied</h4>
        {subjects.map((subject, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 mb-3 border rounded items-center">
            <input type="text" name="name" placeholder="Subject (e.g., DSA)" value={subject.name} onChange={(e) => handleSubjectChange(index, e)} className="p-2 border rounded" required />
            <input type="number" name="hours" placeholder="Hours" min="0" step="0.5" value={subject.hours} onChange={(e) => handleSubjectChange(index, e)} className="p-2 border rounded" required />
            <input type="text" name="notes" placeholder="Topics covered" value={subject.notes} onChange={(e) => handleSubjectChange(index, e)} className="p-2 border rounded col-span-2 md:col-span-1" />
            {subjects.length > 1 && <button type="button" onClick={() => handleRemoveSubject(index)} className="bg-red-500 text-white p-2 rounded h-10">Remove</button>}
          </div>
        ))}
        <button type="button" onClick={handleAddSubject} className="bg-gray-200 text-gray-700 px-4 py-2 rounded mr-4">Add Subject</button>
      </div>

      <div className="flex mt-6">
        <button type="submit" className="flex-grow bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">
          {isEditing ? 'Update Log' : 'Save Log'}
        </button>
        {isEditing && (
          <button type="button" onClick={onLogUpdated} className="ml-4 bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600">
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
};

export default LogForm;