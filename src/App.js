import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

const App = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user');
      console.log('Fetched users:', response.data); // Debugging step
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container mt-4">
          <h1>User Management</h1>
          <Routes>
            <Route path="/" element={<UserList users={users} fetchUsers={fetchUsers} />} />
            <Route path="/add-user" element={<UserForm fetchUsers={fetchUsers} />} />
            <Route path="/user-list" element={<UserList users={users} fetchUsers={fetchUsers} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
