import React from 'react';

// Using a Class Component is more stable for this library's ref handling
export class PrintableLogListClass extends React.PureComponent {
  render() {
    const { logs, user } = this.props;
    
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">PrepStack - Study Log Report</h1>
        <p className="text-lg mb-6">User: {user?.name}</p>
        
        {(!logs || logs.length === 0) ? (
          <p>No study logs available to print.</p>
        ) : (
          <div className="space-y-6">
            {logs.map(log => (
              <div key={log._id} className="p-4 border border-gray-300 rounded-lg break-inside-avoid">
                <h2 className="text-xl font-semibold">{log.date}</h2>
                {log.overallNote && <p className="text-gray-600 mt-1">Note: {log.overallNote}</p>}
                
                <table className="w-full mt-3 text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 font-semibold">Subject</th>
                      <th className="p-2 font-semibold">Hours</th>
                      <th className="p-2 font-semibold">Topics Covered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {log.subjects.map((subject, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="p-2">{subject.name}</td>
                        <td className="p-2">{subject.hours}</td>
                        <td className="p-2">{subject.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default PrintableLogListClass;