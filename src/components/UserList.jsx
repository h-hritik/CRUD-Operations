import axios from 'axios';
import React, { useState } from 'react';

const UserList = ({ users, fetchUsers }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editGender, setEditGender] = useState('');

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/user/${id}`);
      fetchUsers(); // Refresh the list after deleting a user
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditImage(user.image);
    setEditGender(user.gender);
  };

  const handleUpdate = async () => {
    try {
      const updatedUser = { name: editName, image: editImage, gender: editGender };
      await axios.put(`http://localhost:8000/user/${editingUser._id}`, updatedUser);
      setEditingUser(null);
      fetchUsers(); // Refresh the list after updating a user
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              {user.name}
              <button className="my-2 mx-2 btn btn-secondary" onClick={() => handleEdit(user)}>Update</button>
              <button className="my-2 mx-2 btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      {editingUser && (
        <div className="mt-4">
          <h3>Edit User</h3>
          <form className="p-4 border rounded bg-light">
            <div className="form-group">
              <label htmlFor="editName">Name</label>
              <input
                type="text"
                className="form-control"
                id="editName"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="editImage">Image URL</label>
              <input
                type="text"
                className="form-control"
                id="editImage"
                value={editImage}
                onChange={(e) => setEditImage(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="editMale"
                  value="male"
                  checked={editGender === 'male'}
                  onChange={() => setEditGender('male')}
                />
                <label className="form-check-label" htmlFor="editMale">Male</label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="editFemale"
                  value="female"
                  checked={editGender === 'female'}
                  onChange={() => setEditGender('female')}
                />
                <label className="form-check-label" htmlFor="editFemale">Female</label>
              </div>
            </div>
            <button type="button" className="btn btn-primary mt-3" onClick={handleUpdate}>Save</button>
            <button type="button" className="btn btn-secondary mt-3" onClick={() => setEditingUser(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserList;
