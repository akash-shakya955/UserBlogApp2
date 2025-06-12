import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import '../App.css';

const AddUser = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', dob: '', age: '', gender: '', city: '',
    university: '', bloodGroup: '', height: '', weight: '', eyeColor: '', hairColor: '', hairType: '',
    addressStreet: '', addressCity: '', addressState: '', addressPostal: '', addressCountry: '',
    companyName: '', companyDepartment: '', companyJobTitle: '', companyAddress: '',
    companyCity: '', companyState: '', companyCountry: '', password: ''
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
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
      await axios.post('http://localhost:5000/api/users', data);
      navigate('/usertable');
    } catch (err) {
      if (err.name === 'ValidationError') {
        const validationErrors = {};
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        console.error('Error adding user:', err);
      }
    }
  };

  return (
    <div className="container">
      <h1>Add New User</h1>
      <Link to="/usertable"><button className="danger">Cancel</button></Link>
      <form onSubmit={handleSubmit}>
        <h2>Basic Information</h2>
        <input name="firstName" placeholder="First Name" onChange={handleChange} />
        {errors.firstName && <p className="error">{errors.firstName}</p>}
        <input name="lastName" placeholder="Last Name" onChange={handleChange} />
        {errors.lastName && <p className="error">{errors.lastName}</p>}
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <input name="dob" type="date" placeholder="Date of Birth" onChange={handleChange} />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} />
        <select name="gender" onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input name="city" placeholder="City" onChange={handleChange} />
        <input name="university" placeholder="University" onChange={handleChange} />
        <input type="file" name="profileImage" onChange={handleFileChange} />

        <h2>Physical Attributes</h2>
        <select name="bloodGroup" onChange={handleChange}>
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
        <input name="height" type="number" placeholder="Height (cm)" onChange={handleChange} />
        <input name="weight" type="number" placeholder="Weight (kg)" onChange={handleChange} />
        <input name="eyeColor" placeholder="Eye Color" onChange={handleChange} />
        <input name="hairColor" placeholder="Hair Color" onChange={handleChange} />
        <input name="hairType" placeholder="Hair Type" onChange={handleChange} />

        <h2>Address Information</h2>
        <input name="addressStreet" placeholder="Street Address" onChange={handleChange} />
        <input name="addressCity" placeholder="City" onChange={handleChange} />
        <input name="addressState" placeholder="State" onChange={handleChange} />
        <input name="addressPostal" placeholder="Postal Code" onChange={handleChange} />
        <input name="addressCountry" placeholder="Country" onChange={handleChange} />

        <h2>Company Information</h2>
        <input name="companyDepartment" placeholder="Department" onChange={handleChange} />
        <input name="companyName" placeholder="Company Name" onChange={handleChange} />
        <input name="companyJobTitle" placeholder="Job Title" onChange={handleChange} />
        <input name="companyAddress" placeholder="Company Address" onChange={handleChange} />
        <input name="companyCity" placeholder="Company City" onChange={handleChange} />
        <input name="companyState" placeholder="Company State" onChange={handleChange} />
        <input name="companyCountry" placeholder="Company Country" onChange={handleChange} />

        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        {errors.password && <p className="error">{errors.password}</p>}
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default AddUser;