import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const LogList = ({ logs, onDelete, onEdit }) => {
  if (!logs || logs.length === 0) {
    return (
      <div className="card bg-base-100 shadow-xl text-center">
        <div className="card-body">
          <h3 className="card-title text-2xl">Your Study Logs</h3>
          <p>No study logs found. Add one to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title text-2xl">Your Study Logs</h3>
        <div className="space-y-4">
          {logs.map(log => (
            <div key={log._id} className="p-4 rounded-lg border border-base-300">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-semibold">{log.date}</p>
                  <p className="text-base-content/70 text-sm">{log.overallNote}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => onEdit(log)} className="btn btn-ghost btn-sm btn-square"><Edit size={16} /></button>
                  <button onClick={() => onDelete(log._id)} className="btn btn-ghost btn-sm btn-square"><Trash2 size={16} className="text-error" /></button>
                </div>
              </div>
              <ul className="list-disc list-inside mt-2 ml-4 space-y-1 text-sm">
                {log.subjects.map((subject, index) => (
                  <li key={index}>
                    <span className="font-semibold">{subject.name}</span> ({subject.hours} hrs) - {subject.notes}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogList;