import React from 'react';
import api from '../utils/api';

const ChecklistCard = ({ checklist, onUpdate }) => {
  const handleToggle = async (itemIndex) => {
    // Create a deep copy of the items array to avoid direct mutation
    const updatedItems = JSON.parse(JSON.stringify(checklist.items));
    updatedItems[itemIndex].done = !updatedItems[itemIndex].done;

    try {
      await api.put(`/checklists/${checklist._id}`, { items: updatedItems });
      onUpdate(); // Refresh the checklists on the parent page
    } catch (err) {
      console.error('Failed to update checklist', err);
      alert('Failed to update task status.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="text-xl font-bold text-gray-800 mb-4">{checklist.company}</h4>
      <div className="space-y-3">
        {checklist.items.map((item, index) => (
          <div key={index} className="flex items-center">
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => handleToggle(index)}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label className={`ml-3 text-gray-700 ${item.done ? 'line-through text-gray-500' : ''}`}>
              {item.title}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChecklistCard;