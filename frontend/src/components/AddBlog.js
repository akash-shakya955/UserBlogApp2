import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

const AddBlog = () => {
  const [formData, setFormData] = useState({ title: '', description: '', author: '', company: '', tags: [], category: '' });
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/tags').then(res => setTags(res.data));
    axios.get('http://localhost:5000/api/categories').then(res => setCategories(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagChange = (e) => {
    const selectedTags = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, tags: selectedTags });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/blogs', formData);
      navigate('/blogtable');
    } catch (err) {
      console.error('Error adding blog:', err);
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Link to="/blogtable">Back</Link>
        <h1>Create Blog</h1>
        <div></div> {/* Empty div for spacing */}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input name="title" placeholder="Enter title..." onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" placeholder="Enter description..." onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input name="author" placeholder="Enter author..." onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Company:</label>
          <input name="company" placeholder="Enter company..." onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select name="category" onChange={handleChange} value={formData.category}>
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Tags:</label>
          <select multiple name="tags" onChange={handleTagChange} value={formData.tags}>
            <option value="" disabled>Select Tags (Hold Ctrl to select multiple)</option>
            {tags.map(tag => (
              <option key={tag._id} value={tag.name}>{tag.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
};

export default AddBlog;