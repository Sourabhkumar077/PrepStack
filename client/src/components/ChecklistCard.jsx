import React from 'react';
import api from '../utils/api';

const ChecklistCard = ({ checklist, onUpdate }) => {
  const handleToggle = async (itemIndex) => {
    const updatedItems = JSON.parse(JSON.stringify(checklist.items));
    updatedItems[itemIndex].done = !updatedItems[itemIndex].done;
    try {
      await api.put(`/checklists/${checklist._id}`, { items: updatedItems });
      onUpdate();
    } catch (err) {
      console.error('Failed to update checklist', err);
      alert('Failed to update task status.');
    }
  };

  const completedCount = checklist.items.filter(item => item.done).length;
  const totalCount = checklist.items.length;

  return (
    <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
            <h2 className="card-title">{checklist.company}</h2>
            <p className="text-sm opacity-70">{completedCount} of {totalCount} tasks completed</p>
            <div className="space-y-2 mt-4">
                {checklist.items.map((item, index) => (
                    <div key={index} className="form-control">
                        <label className="label cursor-pointer justify-start gap-4">
                            <input
                                type="checkbox"
                                checked={item.done}
                                onChange={() => handleToggle(index)}
                                className="checkbox checkbox-primary"
                            />
                            <span className={`label-text ${item.done ? 'line-through opacity-50' : ''}`}>
                                {item.title}
                            </span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default ChecklistCard;