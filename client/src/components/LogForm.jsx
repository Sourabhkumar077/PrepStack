import React, { useState } from 'react';
// We will create the 'api' utility in the next step
// import api from '../utils/api';

const LogForm = ({ onLogAdded }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [subjects, setSubjects] = useState([{ name: '', hours: '', notes: '' }]);
  const [overallNote, setOverallNote] = useState('');

  const handleSubjectChange = (index, event) => {
    const values = [...subjects];
    values[index][event.target.name] = event.target.value;
    setSubjects(values);
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { name: '', hours: '', notes: '' }]);
  };

  const handleRemoveSubject = (index) => {
    const values = [...subjects];
    values.splice(index, 1);
    setSubjects(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // We will add the API call logic here
    alert('Submitting form...');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-2xl font-bold mb-4">Add a New Study Log</h3>
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

      <div className="mt-6">
        <h4 className="text-xl font-semibold mb-2">Subjects Studied</h4>
        {subjects.map((subject, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 mb-3 border rounded">
            <input type="text" name="name" placeholder="Subject (e.g., DSA)" value={subject.name} onChange={(e) => handleSubjectChange(index, e)} className="p-2 border rounded" required />
            <input type="number" name="hours" placeholder="Hours" value={subject.hours} onChange={(e) => handleSubjectChange(index, e)} className="p-2 border rounded" required />
            <input type="text" name="notes" placeholder="Topics covered" value={subject.notes} onChange={(e) => handleSubjectChange(index, e)} className="p-2 border rounded col-span-1 md:col-span-2" />
            {subjects.length > 1 && <button type="button" onClick={() => handleRemoveSubject(index)} className="bg-red-500 text-white p-2 rounded">Remove</button>}
          </div>
        ))}
        <button type="button" onClick={handleAddSubject} className="bg-gray-200 text-gray-700 px-4 py-2 rounded mr-4">Add Subject</button>
      </div>

      <button type="submit" className="w-full mt-6 bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">Save Log</button>
    </form>
  );
};

export default LogForm;