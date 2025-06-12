import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../App.css';

const EditBlog = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    company: '',
    tags: [],
    category: ''
  });
  const [authors, setAuthors] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch blog data
    axios.get(`http://localhost:5000/api/blogs/${id}`)
      .then(res => setFormData(res.data))
      .catch(err => console.error('Error fetching blog:', err));

    // Fetch authors (user first names)
    axios.get('http://localhost:5000/api/users/names')
      .then(res => setAuthors(res.data))
      .catch(err => console.error('Error fetching authors:', err));

    // Fetch tags
    axios.get('http://localhost:5000/api/tags')
      .then(res => setTags(res.data))
      .catch(err => console.error('Error fetching tags:', err));

    // Fetch categories
    axios.get('http://localhost:5000/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Error fetching categories:', err));
  }, [id]);

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
      await axios.put(`http://localhost:5000/api/blogs/${id}`, formData);
      navigate('/blogtable');
    } catch (err) {
      console.error('Error updating blog:', err);
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Link to="/blogtable">Back</Link>
        <h1>Edit Blog</h1>
        <div></div> {/* Empty div for spacing */}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            placeholder="Enter title..."
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="Enter description..."
            required
          />
        </div>
        <div className="form-group">
          <label>Author:</label>
          <select
            name="author"
            value={formData.author || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select Author</option>
            {authors.map((author, index) => (
              <option key={index} value={author}>{author}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Company:</label>
          <input
            name="company"
            value={formData.company || ''}
            onChange={handleChange}
            placeholder="Enter company..."
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={formData.category || ''}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Tags:</label>
          <select
            multiple
            name="tags"
            value={formData.tags || []}
            onChange={handleTagChange}
          >
            <option value="" disabled>Select Tags (Hold Ctrl to select multiple)</option>
            {tags.map(tag => (
              <option key={tag._id} value={tag.name}>{tag.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default EditBlog;