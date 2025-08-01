import React from 'react';

// This component receives three props:
// 1. logs: The array of study logs to display.
// 2. onDelete: The function to call when a delete button is clicked.
// 3. onEdit: The function to call when an edit button is clicked.
const LogList = ({ logs, onDelete, onEdit }) => {
  if (!logs || logs.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h3 className="text-2xl font-bold mb-4">Your Study Logs</h3>
        <p className="text-gray-500">No study logs found. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
       <h3 className="text-2xl font-bold mb-4">Your Study Logs</h3>
      {logs.map(log => (
        <div key={log._id} className="border-b last:border-b-0 py-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xl font-semibold text-gray-800">{log.date}</p>
              <p className="text-gray-600 mb-3">{log.overallNote}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button 
                onClick={() => onEdit(log)}
                className="bg-yellow-500 text-white text-sm px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button 
                onClick={() => onDelete(log._id)} 
                className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
          <ul className="list-disc list-inside mt-2 space-y-1">
            {log.subjects.map((subject, index) => (
              <li key={index} className="text-gray-700">
                <span className="font-semibold">{subject.name}</span> ({subject.hours} hrs) - {subject.notes}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default LogList;