import axios from 'axios';
import { useState } from "react";
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8089/api/v1/student';

function AddPost() {
  const [studentname, setStudentName] = useState('');
  const [studentaddress, setStudentAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Create a useNavigate instance

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`${API_URL}/save`, {
        studentname,
        studentaddress,
        mobile,
      });
      alert('Student Added Successfully!');
      setStudentName('');
      setStudentAddress('');
      setMobile('');
      navigate('/'); // Redirect to the home page after successful submission
    } catch (error) {
      setError('Error saving details');
    }
  };

  return (
    <div className="container">  {/* Wrap the content in a container */}
      <div className="row justify-content-center"> {/* Center the form horizontally */}
        <div className="col-md-6">  {/* Define form width (optional) */}
          <h1>Add Workout Details</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="studentname">Name</label>
              <input
                type="text"
                className="form-control"
                id="studentname"
                value={studentname}
                onChange={(event) => setStudentName(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label for="studentaddress">Caption</label>
              <input
                type="text"
                className="form-control"
                id="studentaddress"
                value={studentaddress}
                onChange={(event) => setStudentAddress(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label for="mobile">Mobile</label>
              <input
                type="text"
                className="form-control"
                id="mobile"
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Add Workout
            </button>
          </form>
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default AddPost;
