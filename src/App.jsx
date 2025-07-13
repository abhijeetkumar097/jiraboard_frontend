import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Dashboard from './Dashboard';
import TaskBoard from './TaskBoard';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import ProjectForm from './ProjectForm';
import TeamForm from './TeamForm';
import TaskDetails from './TaskDetails';
import NavbarOUt from './NavbarOut';
import About from './About';
import UserOverview from './UserOverview';

function App() {
  const [open, setOpen] = useState(true);
  const [auth, setAuth] = useState(false);
  return (
    <>
    
    
      {auth ? <Navbar  open={open} setOpen={setOpen} /> : <NavbarOUt />}
      <div className={`transition-all duration-300 ${auth ? (open ? "ml-64" : "ml-10") : ""}`}>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<About />} />
          <Route path='/login' element={<Login setAuth={setAuth} />} />
          <Route path='/signup' element={<Signup />} />

          {/* Protected Routes */}
          <Route path='/dashboard' element={auth ? <Dashboard /> : <Navigate to='/' />} />
          <Route path='/taskboard' element={auth ? <TaskBoard /> : <Navigate to='/' />} />
          <Route path='/taskform' element={auth ? <TaskForm /> : <Navigate to='/' />} />
          <Route path='/tasklist' element={auth ? <TaskList /> : <Navigate to='/' />} />
          <Route path='/projectform' element={auth ? <ProjectForm /> : <Navigate to='/' />} />
          <Route path='/teamform' element={auth ? <TeamForm /> : <Navigate to='/' />} />
          <Route path='/task/:taskId' element={auth ? <TaskDetails /> : <Navigate to='/' />} />
          <Route path='/overview' element={auth ? <UserOverview /> : <Navigate to='/' />} />
        </Routes>
      </div>

    </>

  );
}

export default App;
