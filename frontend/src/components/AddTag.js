import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

const AddTag = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/tags', { name });
      navigate('/tagmanager');
    } catch (err) {
      console.error('Error adding tag:', err);
    }
  };

  return (
    <div className="container">
      <Link to="/tagmanager">Back</Link>
      <h1>Add Tag</h1>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tag Name" required />
        <button type="submit">Add Tag</button>
      </form>
    </div>
  );
};

export default AddTag;