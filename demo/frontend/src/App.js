import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddPost from './components/add.jsx'; // Import your Student component
import UpdatePost from './components/update.jsx'; // Import your Student component
import Student from './components/student.jsx'; // Import your About component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Student />} /> {/* Home route */}
        <Route path="/post" element={<AddPost />} /> {/* Add Student route */}
        <Route path="/editpost/:studentId" element={<UpdatePost />} /> {/* Corrected route for editing students */}
        {/* Add more routes for other pages here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
