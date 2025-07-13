import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserOverview = () => {
  const token = sessionStorage.getItem('token');
  const [data, setData] = useState({ projects: [], teams: [] });

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/users/me/overview', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setData(res.data))
      .catch(err => console.error('Overview fetch error:', err.response?.data || err.message));
  }, [token]);

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">My Projects</h2>
      <ul className="mb-6 space-y-2">
        {data.projects.map(p => (
          <li key={p.id} className="bg-gray-800 p-3 rounded">{p.project_name}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mb-4">My Teams</h2>
      {data.teams.map(team => (
        <div key={team.team_id} className="mb-6 p-4 bg-gray-700 rounded">
          <h3 className="text-xl font-semibold">{team.team_name}</h3>
          <p className="text-sm text-gray-300">{team.description}</p>
          <ul className="mt-2 pl-4 list-disc">
            {team.members.map(member => (
              <li key={member.id}>{member.username} ({member.email})</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default UserOverview;
