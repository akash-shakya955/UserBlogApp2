import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import '../App.css';

const EditUser = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${id}`)
      .then(res => setFormData(res.data))
      .catch(err => console.error('Error fetching user:', err));
  }, [id]);

  const schema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      const data = new FormData();
      for (let key in formData) {
        data.append(key, formData[key]);
      }
      if (file) data.append('profileImage', file);
      await axios.put(`http://localhost:5000/api/users/${id}`, data);
      navigate('/usertable');
    } catch (err) {
      if (err.name === 'ValidationError') {
        const validationErrors = {};
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        console.error('Error updating user:', err);
      }
    }
  };

  return (
    <div className="container">
      <h1>Edit User</h1>
      <Link to="/usertable"><button className="danger">Cancel</button></Link>
      <form onSubmit={handleSubmit}>
        <h2>Basic Information</h2>
        <input name="firstName" value={formData.firstName || ''} onChange={handleChange} />
        {errors.firstName && <p className="error">{errors.firstName}</p>}
        <input name="lastName" value={formData.lastName || ''} onChange={handleChange} />
        {errors.lastName && <p className="error">{errors.lastName}</p>}
        <input name="email" type="email" value={formData.email || ''} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}
        <input name="phone" value={formData.phone || ''} onChange={handleChange} />
        <input name="dob" type="date" value={formData.dob ? formData.dob.split('T')[0] : ''} onChange={handleChange} />
        <input name="age" type="number" value={formData.age || ''} onChange={handleChange} />
        <select name="gender" value={formData.gender || ''} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input name="city" value={formData.city || ''} onChange={handleChange} />
        <input name="university" value={formData.university || ''} onChange={handleChange} />
        <input type="file" name="profileImage" onChange={handleFileChange} />

        <h2>Physical Attributes</h2>
        <select name="bloodGroup" value={formData.bloodGroup || ''} onChange={handleChange}>
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
        <input name="height" type="number" value={formData.height || ''} onChange={handleChange} />
        <input name="weight" type="number" value={formData.weight || ''} onChange={handleChange} />
        <input name="eyeColor" value={formData.eyeColor || ''} onChange={handleChange} />
        <input name="hairColor" value={formData.hairColor || ''} onChange={handleChange} />
        <input name="hairType" value={formData.hairType || ''} onChange={handleChange} />

        <h2>Address Information</h2>
        <input name="addressStreet" value={formData.addressStreet || ''} onChange={handleChange} />
        <input name="addressCity" value={formData.addressCity || ''} onChange={handleChange} />
        <input name="addressState" value={formData.addressState || ''} onChange={handleChange} />
        <input name="addressPostal" value={formData.addressPostal || ''} onChange={handleChange} />
        <input name="addressCountry" value={formData.addressCountry || ''} onChange={handleChange} />

        <h2>Company Information</h2>
        <input name="companyDepartment" value={formData.companyDepartment || ''} onChange={handleChange} />
        <input name="companyName" value={formData.companyName || ''} onChange={handleChange} />
        <input name="companyJobTitle" value={formData.companyJobTitle || ''} onChange={handleChange} />
        <input name="companyAddress" value={formData.companyAddress || ''} onChange={handleChange} />
        <input name="companyCity" value={formData.companyCity || ''} onChange={handleChange} />
        <input name="companyState" value={formData.companyState || ''} onChange={handleChange} />
        <input name="companyCountry" value={formData.companyCountry || ''} onChange={handleChange} />

        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;