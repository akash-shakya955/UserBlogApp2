import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const ViewBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blogs/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => console.error('Error fetching blog:', err));
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="container">
      <Link to="/blogtable">Back to BlogTable</Link>
      <h1>View Blog</h1>
      <div className="view-page">
        <p><strong>Title:</strong> {blog.title}</p>
        <p><strong>Description:</strong> {blog.description}</p>
        <p><strong>Author:</strong> {blog.author}</p>
        <p><strong>Company:</strong> {blog.company}</p>
        <p><strong>Tags:</strong> {blog.tags.join(', ')}</p>
        <p><strong>Category:</strong> {blog.category}</p>
        <p><strong>Created Date:</strong> {new Date(blog.createdDate).toLocaleDateString()}</p>
        <p><strong>Updated Date:</strong> {new Date(blog.updatedDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ViewBlog;