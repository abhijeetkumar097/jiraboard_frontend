import React, { useEffect, useState } from 'react';
import axios from 'axios';

function KanbanBoard() {
  const [project, setProject] = useState(null);
  const [stats, setStats] = useState({});
  const [taskBoard, setTaskBoard] = useState({
    todo: [],
    in_progress: [],
    in_review: [],
    done: []
  });

  const pid = sessionStorage.getItem('p_id');

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/api/projects/${pid}/board`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        })
        .catch(err => console.log(err.message))
        ;

        setProject(res.data.project);
        setStats(res.data.stats);
        setTaskBoard(res.data.task_board);
      } catch (err) {
        console.error('Error fetching Kanban board:', err);
      }
    };

    if (pid) fetchBoardData();
  }, [pid]);

  const renderColumn = (status, tasks) => (
    <div className="w-full md:w-1/4 p-2">
      <div className="bg-gray-100 rounded-lg shadow">
        <div className="bg-gray-800 text-white text-center py-2 rounded-t">{status.replace('_', ' ').toUpperCase()}</div>
        <div className="p-2 space-y-2">
          {tasks.map(task => (
            <div key={task.id} className="p-2 bg-white rounded shadow">
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-xs text-gray-500">Due: {task.due_date || 'N/A'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      {project && (
        <>
          <h2 className="text-2xl font-bold mb-4">{project.project_name} - Kanban Board</h2>
          <div className="mb-4 text-sm text-gray-400">Key: {project.project_key} | Status: {project.status}</div>
        </>
      )}

      <div className="flex flex-wrap gap-4">
        {renderColumn('todo', taskBoard.todo)}
        {renderColumn('in_progress', taskBoard.in_progress)}
        {renderColumn('in_review', taskBoard.in_review)}
        {renderColumn('done', taskBoard.done)}
      </div>
    </div>
  );
}

export default KanbanBoard;
