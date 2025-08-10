import React, { useState } from 'react';
import api from '../utils/api';
import { Plus, Trash2, Edit, Save } from 'lucide-react';

const ChecklistCard = ({ checklist, onUpdate, onDelete }) => {
  const [newItemTitle, setNewItemTitle] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Function to handle adding a new item
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;
    
    const newItem = { title: newItemTitle.trim(), done: false, notes: '' };
    const updatedItems = [...checklist.items, newItem];
    
    try {
      await api.put(`/checklists/${checklist._id}`, { items: updatedItems });
      setNewItemTitle('');
      onUpdate();
    } catch (err) {
      alert('Failed to add new item.');
    }
  };
  
  // Function to handle toggling done/undone
  const handleToggle = async (itemIndex) => {
    const updatedItems = JSON.parse(JSON.stringify(checklist.items));
    updatedItems[itemIndex].done = !updatedItems[itemIndex].done;
    try {
      await api.put(`/checklists/${checklist._id}`, { items: updatedItems });
      onUpdate();
    } catch (err) {
      alert('Failed to update task status.');
    }
  };

  // Function to handle saving an edited item
  const handleSaveEdit = async (itemIndex) => {
    const updatedItems = JSON.parse(JSON.stringify(checklist.items));
    updatedItems[itemIndex].title = editingText;
    try {
        await api.put(`/checklists/${checklist._id}`, { items: updatedItems });
        setEditingIndex(null);
        setEditingText('');
        onUpdate();
    } catch (err) {
        alert('Failed to save changes.');
    }
  };
  
  const completedCount = checklist.items.filter(item => item.done).length;
  const totalCount = checklist.items.length;

  return (
    <div className="card bg-base-100 shadow-xl border border-white/10">
        <div className="card-body">
            <div className="flex justify-between items-center">
                <h2 className="card-title text-2xl">{checklist.company}</h2>
                <button onClick={() => onDelete(checklist._id)} className="btn btn-ghost btn-sm btn-square">
                    <Trash2 size={18} className="text-red-500" />
                </button>
            </div>
            <p className="text-sm opacity-70 -mt-2">{completedCount} of {totalCount} tasks completed</p>
            
            <div className="space-y-2 mt-4">
                {checklist.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 group">
                        <input
                            type="checkbox"
                            checked={item.done}
                            onChange={() => handleToggle(index)}
                            className="checkbox checkbox-primary"
                        />
                        {editingIndex === index ? (
                            <input 
                                type="text"
                                value={editingText}
                                onChange={(e) => setEditingText(e.target.value)}
                                className="input input-bordered input-sm flex-grow"
                            />
                        ) : (
                            <span className={`flex-grow ${item.done ? 'line-through opacity-50' : ''}`}>
                                {item.title}
                            </span>
                        )}

                        {editingIndex === index ? (
                             <button onClick={() => handleSaveEdit(index)} className="btn btn-ghost btn-xs btn-square"><Save size={16} /></button>
                        ) : (
                            <button onClick={() => { setEditingIndex(index); setEditingText(item.title); }} className="btn btn-ghost btn-xs btn-square opacity-0 group-hover:opacity-100"><Edit size={16} /></button>
                        )}
                    </div>
                ))}
            </div>

            {/* Add New Item Form */}
            <form onSubmit={handleAddItem} className="form-control mt-4">
                <div className="join">
                    <input 
                        type="text"
                        placeholder="Add new task..."
                        value={newItemTitle}
                        onChange={(e) => setNewItemTitle(e.target.value)}
                        className="input input-bordered join-item w-full"
                    />
                    <button type="submit" className="btn btn-primary join-item"><Plus size={16}/></button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default ChecklistCard;