import axios from 'axios';
import { useState, useEffect } from "react";
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams
import AddPost from './add';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8089/api/v1/student';

function UpdatePost() {
  const [studentname, setStudentName] = useState('');
  const [studentaddress, setStudentAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Create a useNavigate instance
  const { studentId } = useParams(); // Get student ID from URL parameter

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`${API_URL}/search/${studentId}`);
        setStudentName(response.data.studentname);
        setStudentAddress(response.data.studentaddress);
        setMobile(response.data.mobile);
      } catch (error) {
        setError('Error fetching details');
      }
    };

    fetchStudent();
  }, [studentId]); // Run effect only when studentId changes

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`${API_URL}/edit/${studentId}`, {
        studentname,
        studentaddress,
        mobile,
      });
      alert('Successfully Updated!');
      navigate('/'); // Redirect to the student list page after successful update
    } catch (error) {
      setError('Error updating details');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Update Workout Details</h1> {/* Corrected title */}
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
              <label for="studentaddress">Caption</label> {/* Corrected label name */}
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
              Update
            </button>
          </form>
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default UpdatePost;
