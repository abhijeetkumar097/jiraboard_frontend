import { Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar({ open, setOpen, setAuth }) {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded hover:bg-base-300 transition ${
      isActive ? "bg-base-300 font-semibold" : ""
    }`;
    
    const navigate = useNavigate();
    const logout = () => {
      sessionStorage.clear();
      setAuth(false);
      navigate('/');
    }

  return (
    <div className="flex">
      {/* Toggle Button (Always visible) */}
      <button
        className="fixed top-4 left-4 z-50 bg-base-200 text-white rounded-full p-2 shadow"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-base-200 text-base-content transform transition-transform duration-300 z-40 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 pl-14 text-xl font-bold border-b border-base-300">
          Jira
        </div>

        <nav className="flex flex-col gap-1 p-4">
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
          {/* <NavLink to="/tasks" className={linkClass}>
            Tasks
          </NavLink>
          <NavLink to="/settings" className={linkClass}>
            Settings
          </NavLink>
          <NavLink to="/signup" className={linkClass}>
            SignUp
          </NavLink>
          <NavLink to="/login" className={linkClass}>
            Login
          </NavLink> */}
          {/* <NavLink to="/taskboard" className={linkClass}>
            taskboard
          </NavLink> */}
          {/* <NavLink to="/taskform" className={linkClass}>
            TaskForm
          </NavLink> */}
          <NavLink to="/tasklist" className={linkClass}>
            TaskList
          </NavLink>
          <NavLink to="/projectform" className={linkClass}>
            ProjectForm
          </NavLink>
          <NavLink to="/teamform" className={linkClass}>
            TeamForm
          </NavLink>
          <NavLink to="/overview" className={linkClass}>
            Overview
          </NavLink>
          <NavLink to="/logs" className={linkClass}>
            Logs
          </NavLink>
          <div className="ml-4"><button className="text-red-700 text-lg rounded" onClick={() => logout()}>Logout</button></div>
        </nav>
      </div>
    </div>
  );
}
