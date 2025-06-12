import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/categories/${id}`)
      .then(() => setCategories(categories.filter(cat => cat._id !== id)))
      .catch(err => console.error('Error deleting category:', err));
  };

  return (
    <div className="container">
      <Link to="/">HomePage</Link>
      <h1>CategoryManager</h1>
      <Link to="/add-category"><button>+ Add Category</button></Link>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, index) => (
            <tr key={cat._id}>
              <td>{index + 1}</td>
              <td>{cat.name}</td>
              <td className="actions">
                <Link to={`/edit-category/${cat._id}`}>Edit</Link>
                <button className="danger" onClick={() => handleDelete(cat._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryManager;