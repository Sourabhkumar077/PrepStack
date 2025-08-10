import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StudyChart = ({ logs }) => {
  // Process the log data to get hours per subject
  const subjectHours = logs.reduce((acc, log) => {
    log.subjects.forEach(subject => {
      acc[subject.name] = (acc[subject.name] || 0) + subject.hours;
    });
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(subjectHours),
    datasets: [
      {
        label: 'Hours Studied',
        data: Object.values(subjectHours),
        backgroundColor: 'rgba(6, 182, 212, 0.6)',
        borderColor: 'rgba(6, 182, 212, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Total Hours by Subject',
        color: '#e5e7eb',
        font: {
          size: 18,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9ca3af',
        },
      },
    },
  };

  return (
    <div className="card bg-base-100 shadow-xl border border-white/10">
      <div className="card-body">
        <div style={{ height: '300px' }}>
          <Bar options={chartOptions} data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default StudyChart;