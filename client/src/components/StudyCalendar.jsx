import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default styling

const StudyCalendar = ({ logs }) => {
  // Create a Set of unique dates where the user has logged study hours
  const studyDates = new Set(logs.map(log => log.date));

  // This function adds a custom class to the dates that are in our set
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      if (studyDates.has(dateString)) {
        return 'study-day'; // CSS class for highlighted days
      }
    }
    return null;
  };

  return (
    <div className="card bg-base-100 shadow-xl border border-white/10">
      <div className="card-body">
        <h2 className="card-title mb-4">Monthly Activity</h2>
        <Calendar
          tileClassName={tileClassName}
          className="bg-transparent border-0"
        />
      </div>
    </div>
  );
};

export default StudyCalendar;