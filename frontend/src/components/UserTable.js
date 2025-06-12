import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:5000/api/users', {
          params: {
            search,
            page,
            limit: itemsPerPage,
          },
        });
        setUsers(response.data.users || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (err) {
        setError('Error fetching users. Please try again.');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [search, page]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      // Refetch users after deletion to ensure consistency
      const response = await axios.get('http://localhost:5000/api/users', {
        params: {
          search,
          page,
          limit: itemsPerPage,
        },
      });
      setUsers(response.data.users || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Error deleting user. Please try again.');
    }
  };

  const handleClearFilters = () => {
    setSearch('');
    setPage(1);
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Link to="/">HomePage</Link>
        <h1>UserTable</h1>
        <Link to="/add-user"><button>+ Add User</button></Link>
      </div>
      <div className="filter-container">
        <div className="filter-group">
          <label>Search User:</label>
          <input
            type="text"
            placeholder="Search user..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="filter-buttons">
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
                <th>Profile</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Age</th>
                <th>City</th>
                <th>University</th>
                <th>Personal Details</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>
                    {user.profileImage ? (
                      <img
                        src={`http://localhost:5000${user.profileImage}`}
                        alt={`${user.firstName} ${user.lastName}`}
                        width="30"
                        height="30"
                        style={{ borderRadius: '50%', marginRight: '10px' }}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.phone}</td>
                  <td>{user.gender}</td>
                  <td>{user.dob ? new Date(user.dob).toLocaleDateString() : ''}</td>
                  <td>{user.age}</td>
                  <td>{user.city}</td>
                  <td>{user.university}</td>
                  <td>{user.bloodGroup}, {user.height}cm, {user.weight}kg</td>
                  <td>{user.addressStreet}, {user.addressCity}</td>
                  <td className="actions">
                    <Link to={`/view-user/${user._id}`}>View</Link>
                    <Link to={`/edit-user/${user._id}`}>Edit</Link>
                    <button className="danger" onClick={() => handleDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
            <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserTable;