import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

const AddCategory = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/categories', { name });
      navigate('/category');
    } catch (err) {
      console.error('Error adding category:', err);
    }
  };

  return (
    <div className="container">
      <Link to="/category">Back</Link>
      <h1>Add Category</h1>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Category Name" required />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;