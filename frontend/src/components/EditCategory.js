import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../App.css';

const EditCategory = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/categories/${id}`)
      .then(res => setName(res.data.name))
      .catch(err => console.error('Error fetching category:', err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/categories/${id}`, { name });
      navigate('/category');
    } catch (err) {
      console.error('Error updating category:', err);
    }
  };

  return (
    <div className="container">
      <Link to="/category">Back</Link>
      <h1>Edit Category</h1>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Category Name" required />
        <button type="submit">Update Category</button>
      </form>
    </div>
  );
};

export default EditCategory;