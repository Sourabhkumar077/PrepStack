import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Plus, Trash2 } from 'lucide-react';

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
          alert('Operation failed. Check console for details.');
        }
    };

    return (
        <div className="card bg-base-100 shadow-xl">
          <form onSubmit={handleSubmit} className="card-body">
            <h3 className="card-title text-2xl">{isEditing ? 'Edit Study Log' : 'Add a New Study Log'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Date</span></label> <br />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Overall Note</span></label>
                <input type="text" placeholder="e.g., A productive day" value={overallNote} onChange={(e) => setOverallNote(e.target.value)} className="input input-bordered" />
              </div>
            </div>

            <div className="mt-4">
              <label className="label"><span className="label-text font-semibold">Subjects Studied</span></label>
              <div className="space-y-3">
                {subjects.map((subject, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-3 items-center">
                    <input type="text" name="name" placeholder="Subject (e.g., DSA)" value={subject.name} onChange={(e) => handleSubjectChange(index, e)} className="input input-bordered md:col-span-2" required />
                    <input type="number" name="hours" placeholder="Hours" min="0" step="0.5" value={subject.hours} onChange={(e) => handleSubjectChange(index, e)} className="input input-bordered" required />
                    <input type="text" name="notes" placeholder="Topics covered" value={subject.notes} onChange={(e) => handleSubjectChange(index, e)} className="input input-bordered md:col-span-2" />
                    {subjects.length > 1 && <button type="button" onClick={() => handleRemoveSubject(index)} className="btn btn-ghost btn-square"><Trash2 size={18} className="text-error" /></button>}
                  </div>
                ))}
              </div>
              <button type="button" onClick={handleAddSubject} className="btn btn-ghost btn-sm mt-4">
                <Plus size={16} /> Add Subject
              </button>
            </div>

            <div className="card-actions mt-4">
              <button type="submit" className="btn btn-primary flex-grow">
                {isEditing ? 'Update Log' : 'Save Log'}
              </button>
              {isEditing && (
                <button type="button" onClick={onLogUpdated} className="btn btn-ghost">
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>
    );
};

export default LogForm;