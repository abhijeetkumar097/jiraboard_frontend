import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProjectForm = () => {
  const token = sessionStorage.getItem('token');
  const [form, setForm] = useState({
    project_name: '',
    project_key: '',
    description: '',
    project_link: '',
    status: 'active',
    teams: []
  });
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/teams/', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setTeams(res.data))
    .catch(err => {
      console.error("Team fetch error:", err.response?.data || err.message);
    });
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleTeamSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(opt => parseInt(opt.value));
    setForm({ ...form, teams: selectedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://127.0.0.1:5000/api/projects/new', form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    navigate('/projects');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border border-gray-600 shadow rounded max-w-2xl mx-auto">
      <div className='text-xl mb-3'>Create Project</div>
      <input name="project_name" value={form.project_name} onChange={handleChange} placeholder="Project Name" required className="w-full border p-2 rounded" />
      <input name="project_key" value={form.project_key} onChange={handleChange} placeholder="Project Key" required className="w-full border p-2 rounded" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" />
      <input name="project_link" value={form.project_link} onChange={handleChange} placeholder="Project Link" className="w-full border p-2 rounded" />
      <select name="status" value={form.status} onChange={handleChange} className="w-full border p-2 rounded">
        <option value="active">Active</option>
        <option value="on_hold">On Hold</option>
        <option value="completed">Completed</option>
      </select>
      <select value={form.teams} onChange={handleTeamSelect} className="w-full border p-2 rounded h-40" multiple>
        {teams.map((team) => (
          <option key={team.team_id} value={team.team_id}>{team.team_name}</option>
        ))}
      </select>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Create Project</button>
    </form>
  );
};

export default ProjectForm;
