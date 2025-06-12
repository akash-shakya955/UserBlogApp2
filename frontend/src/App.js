import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UserTable from './components/UserTable';
import AddUser from './components/AddUser';
import ViewUser from './components/ViewUser';
import EditUser from './components/EditUser';
import BlogTable from './components/BlogTable';
import AddBlog from './components/AddBlog';
import ViewBlog from './components/ViewBlog';
import EditBlog from './components/EditBlog';
import TagManager from './components/TagManager';
import AddTag from './components/AddTag';
import EditTag from './components/EditTag';
import CategoryManager from './components/CategoryManager';
import AddCategory from './components/AddCategory';
import EditCategory from './components/EditCategory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usertable" element={<UserTable />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/view-user/:id" element={<ViewUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/blogtable" element={<BlogTable />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/view-blog/:id" element={<ViewBlog />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
        <Route path="/tagmanager" element={<TagManager />} />
        <Route path="/add-tag" element={<AddTag />} />
        <Route path="/edit-tag/:id" element={<EditTag />} />
        <Route path="/category" element={<CategoryManager />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/edit-category/:id" element={<EditCategory />} />
      </Routes>
    </Router>
  );
}

export default App;