import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${id}`)
      .then(res => setUser(res.data))
      .catch(err => console.error('Error fetching user:', err));
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container">
      <Link to="/usertable">Back to UserTable</Link>
      <h1>View User</h1>
      <form>
        <h2>Basic Information</h2>
        <div className="view-field">
          <label>First Name:</label>
          <input value={user.firstName || ''} readOnly />
        </div>
        <div className="view-field">
          <label>Last Name:</label>
          <input value={user.lastName || ''} readOnly />
        </div>
        <div className="view-field">
          <label>Email:</label>
          <input value={user.email || ''} readOnly />
        </div>
        <div className="view-field">
          <label>Phone:</label>
          <input value={user.phone || ''} readOnly />
        </div>
        <div className="view-field">
          <label>DOB:</label>
          <input value={user.dob ? new Date(user.dob).toLocaleDateString() : ''} readOnly />
        </div>
        <div className="view-field">
          <label>Age:</label>
          <input value={user.age || ''} readOnly />
        </div>
        <div className="view-field">
          <label>Gender:</label>
          <input value={user.gender || ''} readOnly />
        </div>
        <div className="view-field">
          <label>City:</label>
          <input value={user.city || ''} readOnly />
        </div>
        <div className="view-field">
          <label>University:</label>
          <input value={user.university || ''} readOnly />
        </div>
        <div className="view-field">
          <label>Profile Image:</label>
          {user.profileImage ? (
            <img src={`http://localhost:5000${user.profileImage}`} alt="Profile" width="100" />
          ) : (
            <input value="No image" readOnly />
          )}
        </div>

        <h2>Physical Attributes</h2>
        <div className="view-field">
          <label>Blood Group:</label>
          <input value={user.bloodGroup || ''} readOnly />
        </div>
        <div className="view-field">
          <label>Height:</label>
          <input value={user.height ? `${user.height} cm` : ''} readOnly />
        </div>
        <div className="view-field">
          <label>Weight:</label>
          <input value={user.weight ? `${user.weight} kg` : ''} readOnly />
        </div>
        <div className="view-field">
          <label>Eye Color:</label>
          <input value={user.eyeColor || ''} readOnly />
        </div>
        <div className="view-field">
          <label>Hair Color:</label>
          <input value={user.hairColor || ''} readOnly />
        </div>
        <div className="view-field">
          <label>Hair Type:</label>
          <input value={user.hairType || ''} readOnly />
        </div>

        <h2>Address Information</h2>
        <div className="view-field">
          <label>Address:</label>
          <input
            value={`${user.addressStreet || ''}, ${user.addressCity || ''}, ${user.addressState || ''}, ${user.addressPostal || ''}, ${user.addressCountry || ''}`}
            readOnly
          />
        </div>

        <h2>Company Information</h2>
        <div className="view-field">
          <label>Company:</label>
          <input
            value={`${user.companyName || ''}, ${user.companyDepartment || ''}, ${user.companyJobTitle || ''}`}
            readOnly
          />
        </div>
        <div className="view-field">
          <label>Company Address:</label>
          <input
            value={`${user.companyAddress || ''}, ${user.companyCity || ''}, ${user.companyState || ''}, ${user.companyCountry || ''}`}
            readOnly
          />
        </div>
      </form>
    </div>
  );
};

export default ViewUser;