import React from 'react';

const LogList = ({ logs }) => {
  if (logs.length === 0) {
    return <p className="text-center text-gray-500">No study logs found. Add one to get started!</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
       <h3 className="text-2xl font-bold mb-4">Your Study Logs</h3>
      {logs.map(log => (
        <div key={log._id} className="border-b py-4">
          <p className="text-xl font-semibold text-gray-800">{log.date}</p>
          <p className="text-gray-600 mb-3">{log.overallNote}</p>
          <ul className="list-disc list-inside">
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