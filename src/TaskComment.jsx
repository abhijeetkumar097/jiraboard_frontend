import React, { useState } from 'react';
import axios from 'axios';

const TaskComment = ({ taskId }) => {
  const [comment, setComment] = useState('');
  const token = sessionStorage.getItem('token');

  const submitComment = async () => {
    if (!comment.trim()) return;
    try {
      await axios.post(`http://127.0.0.1:5000/api/tasks/${taskId}/comment`, {
        content: comment
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComment('');
      alert("Comment added!");
    } catch (err) {
      console.error("Comment error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="mt-4">
      <textarea
        className="w-full border rounded p-2"
        rows="3"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={submitComment}
        className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        Add Comment
      </button>
    </div>
  );
};

export default TaskComment;
