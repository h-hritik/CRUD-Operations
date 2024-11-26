import axios from 'axios';
import React, { useState } from 'react';

const UserForm = ({ fetchUsers }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [gender, setGender] = useState('');

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setGender((prev) => (prev === value ? '' : value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !image || !gender) {
      alert('All fields are required');
      return;
    }

    try {
      const newUser = { name, image, gender };
      console.log('Submitting user:', newUser); // Debugging step
      await axios.post('http://localhost:8000/user', newUser);
      fetchUsers();
      setName('');
      setImage('');
      setGender('');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          className="form-control"
          id="image"
          placeholder="Enter image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Gender</label>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="male"
            value="male"
            checked={gender === 'male'}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="male">Male</label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="female"
            value="female"
            checked={gender === 'female'}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="female">Female</label>
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-3">Submit</button>
    </form>
  );
};

export default UserForm;
