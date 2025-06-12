import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const BlogTable = () => {
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

  const fetchTagsAndCategories = async () => {
    try {
      const tagsResponse = await axios.get('http://localhost:5000/api/tags');
      setTags(tagsResponse.data);
      const categoriesResponse = await axios.get('http://localhost:5000/api/categories');
      setCategories(categoriesResponse.data);
    } catch (err) {
      console.error('Error fetching tags/categories:', err);
    }
  };

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/blogs', {
        params: {
          title: search,
          tag: selectedTag,
          category: selectedCategory,
          page,
          limit: itemsPerPage
        }
      });
      setBlogs(response.data.blogs);
      setTotalPages(response.data.totalPages);
      await fetchTagsAndCategories();
    } catch (err) {
      setError('Error fetching blogs. Please try again.');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  }, [search, selectedTag, selectedCategory, page]);

  useEffect(() => {
    fetchTagsAndCategories();
    fetchBlogs();
  }, [fetchBlogs]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/blogs/${id}`)
      .then(() => {
        fetchBlogs(); // Refresh blogs after deletion
      })
      .catch(err => console.error('Error deleting blog:', err));
  };

  const handleFilter = () => {
    setPage(1); // Reset to first page on filter
    fetchBlogs();
  };

  const handleClearFilters = () => {
    setSearch('');
    setSelectedTag('');
    setSelectedCategory('');
    setPage(1);
    fetchBlogs();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchBlogs();
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Link to="/">HomePage</Link>
        <h1>BlogTable</h1>
        <Link to="/add-blog"><button>+ Add Blog</button></Link>
      </div>

      <div className="filter-container">
        <div className="filter-group">
          <label>Search Title:</label>
          <input
            type="text"
            placeholder="Enter title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>Tag:</label>
          <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
            <option value="">All Tags</option>
            {tags.map(tag => (
              <option key={tag._id} value={tag.name}>{tag.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Category:</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-buttons">
          <button onClick={handleFilter} disabled={loading}>
            {loading ? 'Filtering...' : 'Filter'}
          </button>
          <button onClick={handleClearFilters} className="clear-button" disabled={loading}>
            Clear Filters
          </button>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Company</th>
                <th>Tags</th>
                <th>Category</th>
                <th>Created Date</th>
                <th>Updated Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(blog => (
                <tr key={blog._id}>
                  <td>{blog.title}</td>
                  <td>{blog.description}</td>
                  <td>{blog.company}</td>
                  <td>{blog.tags.join(', ')}</td>
                  <td>{blog.category}</td>
                  <td>{new Date(blog.createdDate).toLocaleDateString()}</td>
                  <td>{new Date(blog.updatedDate).toLocaleDateString()}</td>
                  <td className="actions">
                    <Link to={`/view-blog/${blog._id}`}>View</Link>
                    <Link to={`/edit-blog/${blog._id}`}>Edit</Link>
                    <button className="danger" onClick={() => handleDelete(blog._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>Previous</button>
            <button disabled={page >= totalPages} onClick={() => handlePageChange(page + 1)}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogTable;