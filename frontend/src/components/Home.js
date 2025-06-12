import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Home = () => {
  return (
    <div className="container">
      <h1>Home Dashboard</h1>
      <div>
        <Link to="/usertable"><button>UserTable</button></Link>
        <Link to="/blogtable"><button>BlogTable</button></Link>
        <Link to="/tagmanager"><button>TagManager</button></Link>
        <Link to="/category"><button>Category</button></Link>
      </div>
    </div>
  );
};

export default Home;