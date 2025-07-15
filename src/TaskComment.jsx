import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';

const TaskComment = ({ taskId, projectId }) => {
  const [comment, setComment] = useState('');
  const token = sessionStorage.getItem('token');
  const [comments, setComments] = useState([]);
  const [reload, setreload] = useState(false);

  const submitComment = async () => {
    setreload(!reload)
    if (!comment.trim()) return;
    try {
      await axios.post(`http://127.0.0.1:5000/api/tasks/${taskId}/comment`, {
        content: comment
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComment('');
      toast.success("Comment added!");
    } catch (err) {
      toast.error("Something went wrong!")
      console.error("Comment error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/tasks/${taskId}/comments`, {
      headers: { Authorization : `Bearer ${token}`}
    })
    .then(res => setComments(res.data))
    .catch(err => {
      console.log(err.response?.data || err.message)
    })
  }, [reload])

  return (
    <div className="mt-6 space-y-4">
      <div className='p-5 max-h-80 mb-5 overflow-x-auto'>
        {comments.map((com) => (
          <div
            key={com.id}
            className="bg-gray-800 text-white p-3 m-2 rounded shadow border border-gray-700"
          >
            <p className="text-sm text-gray-400">{com.posted_at.split('.')[0]}</p>
            <p className="font-medium text-blue-400">{com.posted_by.name} ({com.posted_by.email})</p>
            <p className="mt-1">{com.content}</p>
          </div>
        ))}
      </div>

  <div className="mt-6">
    <textarea
      className="w-full bg-gray-900 text-white border border-gray-700 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows="3"
      placeholder="Write a comment..."
      value={comment}
      onChange={(e) => setComment(e.target.value)}
    />
    <button
      onClick={submitComment}
      className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Add Comment
    </button>
  </div>
</div>

  );
};

export default TaskComment;
