import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';
const TeamForm = () => {
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/users/', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUsers(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('http://127.0.0.1:5000/api/teams/', {
      team_name: teamName,
      description,
      member_ids: selectedUsers
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    toast.success("Created!")
    setTeamName('');
    setDescription('');
    setSelectedUsers([]);
  };

  return (
    <div className="max-w-xl mx-auto p-6 border border-gray-500 rounded shadow-md mt-10">
      <h2 className="text-2xl mb-6">Create Team</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium">Team Name</label>
          <input
            type="text"
            value={teamName}
            onChange={e => setTeamName(e.target.value)}
            placeholder="Enter team name"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Enter description"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Select Members</label>
          <select
            multiple
            value={selectedUsers}
            onChange={e => setSelectedUsers([...e.target.selectedOptions].map(o => parseInt(o.value)))}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
          >
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.username} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="inline-block w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Create Team
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamForm;
