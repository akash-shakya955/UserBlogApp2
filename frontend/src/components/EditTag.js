import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../App.css';

const EditTag = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tags/${id}`)
      .then(res => setName(res.data.name))
      .catch(err => console.error('Error fetching tag:', err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/tags/${id}`, { name });
      navigate('/tagmanager');
    } catch (err) {
      console.error('Error updating tag:', err);
    }
  };

  return (
    <div className="container">
      <Link to="/tagmanager">Back</Link>
      <h1>Edit Tag</h1>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tag Name" required />
        <button type="submit">Update Tag</button>
      </form>
    </div>
  );
};

export default EditTag;