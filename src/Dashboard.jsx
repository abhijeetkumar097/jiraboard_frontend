import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ token }) => {
  const [data, setData] = useState({ projects: [], tasks: [], activities: [] });
  const token1 = sessionStorage.getItem('token')
  useEffect(() => {
    
    axios.get('http://127.0.0.1:5000/api/dashboard', {
      headers: { Authorization: `Bearer ${token1}` }
    }).then(res => setData(res.data))
    .catch(err => {
    console.error("Dashboard error:", err.response?.data || err.message);
  });
  }, []);

  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate('/taskboard', { state: { p_id: id } });
  };

  const handleClickTask = (id) => {
    navigate(`/task/${id}`)
  }
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>

      <div className="bg-slate-600 shadow p-4 rounded mb-6">
        <h2 className="text-xl font-bold mb-2">My Projects</h2>
        {data.projects.length ? (
          <ul className="list-disc list-inside space-y-1">
            {data.projects.slice(0, 5).map(p => (
              <li key={p.id} onClick={() => handleClick(p.id)} className="cursor-pointer hover:text-blue-500">{p.project_name}</li>
            ))}
          </ul>
        ) : <p>No projects yet.</p>}
      </div>

      <div className="bg-gray-900 shadow p-4 rounded">
        <h2 className="text-xl font-bold mb-2">My Tasks</h2>
        {data.tasks.length ? (
          <ul className="list-disc list-inside space-y-1">
            {data.tasks.slice(0, 10).map(t => (
              <li key={t.id} onClick={() => handleClickTask(t.id)} className='cursor-pointer hover:text-blue-500'>{t.title}</li>
            ))}
          </ul>
        ) : <p>No tasks assigned to you.</p>}
      </div>
    </div>
  );
};

export default Dashboard;
