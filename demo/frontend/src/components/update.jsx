import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate and useParams
import AddPost from "./add";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8089/api/v1/student";

function UpdatePost() {
  const [studentname, setStudentName] = useState("");
  const [studentaddress, setStudentAddress] = useState("");
  const [status, setStatus] = useState("");
  const [noofpushups, setnoofpushups] = useState("");
  const [randistance, setrandistance] = useState("");
  const [weightlifted, setweightlifted] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Create a useNavigate instance
  const { studentId } = useParams(); // Get student ID from URL parameter

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`${API_URL}/search/${studentId}`);
        setStudentName(response.data.studentname);
        setStudentAddress(response.data.studentaddress);
        setStatus(response.data.status);
        setnoofpushups(response.data.noofpushups);
        setrandistance(response.data.randistance);
        setweightlifted(response.data.weightlifted);
      } catch (error) {
        setError("Error fetching details");
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
        status,
        noofpushups,
        randistance,
        weightlifted,
      });
      alert("Successfully Updated!");
      navigate("/"); // Redirect to the student list page after successful update
    } catch (error) {
      setError("Error updating details");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Update User Details</h1> {/* Corrected title */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="studentname">Date</label>
              <input
                type="date"
                className="form-control"
                id="studentname"
                value={studentname}
                onChange={(event) => setStudentName(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="studentaddress">Caption</label>{" "}
              {/* Corrected label name */}
              <input
                type="text"
                className="form-control"
                id="studentaddress"
                value={studentaddress}
                onChange={(event) => setStudentAddress(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="status">Status</label>
              <select
                className="form-control"
                id="status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Healthy">Healthy</option>
                <option value="Unwell">Unwell</option>
                <option value="Recovering">Recovering</option>
                <option value="Unknown">Unknown</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="form-group">
              <label for="noofpushups">No Of Pushups</label>
              <input
                type="number"
                className="form-control"
                id="noofpushups"
                value={noofpushups}
                onChange={(event) => setnoofpushups(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="randistance">Ran Distance</label>
              <input
                type="number"
                className="form-control"
                id="randistance"
                value={randistance}
                onChange={(event) => setrandistance(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="weightlifted">Weight Lifted</label>
              <input
                type="number"
                className="form-control"
                id="weightlifted"
                value={weightlifted}
                onChange={(event) => setweightlifted(event.target.value)}
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
