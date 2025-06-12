import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const TagManager = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tags')
      .then(res => setTags(res.data))
      .catch(err => console.error('Error fetching tags:', err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/tags/${id}`)
      .then(() => setTags(tags.filter(tag => tag._id !== id)))
      .catch(err => console.error('Error deleting tag:', err));
  };

  return (
    <div className="container">
      <Link to="/">HomePage</Link>
      <h1>TagManager</h1>
      <Link to="/add-tag"><button>+ Add Tag</button></Link>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tag Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag, index) => (
            <tr key={tag._id}>
              <td>{index + 1}</td>
              <td>{tag.name}</td>
              <td className="actions">
                <Link to={`/edit-tag/${tag._id}`}>Edit</Link>
                <button className="danger" onClick={() => handleDelete(tag._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TagManager;