import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';
const TaskForm = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    work_type: '',
    priority: 'low',
    status: 'todo',
    assigned_to: '',
    project_id: '',
    due_date: '',
    estimated_hours: '',
    story_points: ''
  });

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const token = sessionStorage.getItem('token')
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchData = async () => {
      const projRes = await axios.get('http://127.0.0.1:5000/api/projects/', { headers: { Authorization: `Bearer ${token}` } });
      setProjects(projRes.data);
      const usersRes = await axios.get('http://127.0.0.1:5000/api/users/', { headers: { Authorization: `Bearer ${token}` } });
      setUsers(usersRes.data);
    };
    fetchData();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('http://127.0.0.1:5000/api/tasks/new', form, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .catch(err => {
      toast.error("Something went wrong");
    });
    toast.success("Created!")
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-slate-600 rounded shadow-md max-w-xl mx-auto">
        <h2>Create Task</h2>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="w-full border border-gray-300 rounded p-2" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border border-gray-300 rounded p-2" />
      <input name="work_type" value={form.work_type} onChange={handleChange} placeholder="Work Type" required className="w-full border border-gray-300 rounded p-2" />
      <select name="priority" value={form.priority} onChange={handleChange} className="w-full border border-gray-300 rounded p-2">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select name="status" value={form.status} onChange={handleChange} className="w-full border border-gray-300 rounded p-2">
        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="in_review">In Review</option>
        <option value="done">Done</option>
      </select>
      <select name="assigned_to" value={form.assigned_to} onChange={handleChange} className="w-full border border-gray-300 rounded p-2">
        <option value=''>Unassigned</option>
        {users.map(user => <option key={user.id} value={user.id}>{user.username}</option>)}
      </select>
      <select name="project_id" value={form.project_id} onChange={handleChange} required className="w-full border border-gray-300 rounded p-2">
        <option value=''>Select Project</option>
        {projects.map(p => <option key={p.id} value={p.id}>{p.project_name}</option>)}
      </select>
      <input name="due_date" type="date" value={form.due_date} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" />
      <input name="estimated_hours" type="number" value={form.estimated_hours} onChange={handleChange} placeholder="Estimated Hours" className="w-full border border-gray-300 rounded p-2" />
      <input name="story_points" type="number" value={form.story_points} onChange={handleChange} placeholder="Story Points" className="w-full border border-gray-300 rounded p-2" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Create Task</button>
    </form>
  );
};

export default TaskForm;