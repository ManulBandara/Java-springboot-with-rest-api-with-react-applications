import axios from "axios";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8089/api/v1/student";

function AddPost() {
  const [studentname, setStudentName] = useState("");
  const [studentaddress, setStudentAddress] = useState("");
  const [status, setStatus] = useState("");
  const [noofpushups, setnoofpushups] = useState("");
  const [randistance, setrandistance] = useState("");
  const [weightlifted, setweightlifted] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`${API_URL}/save`, {
        studentname,
        studentaddress,
        status,
        noofpushups,
        randistance,
        weightlifted,
      });
      alert("Student Added Successfully!");
      setStudentName("");
      setStudentAddress("");
      setStatus("");
      setnoofpushups("");
      setrandistance("");
      setweightlifted("");
      navigate("/");
    } catch (error) {
      setError("Error saving details");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Add User Details</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="studentname">Date</label>
              <input
                type="date"
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
              <label htmlFor="status">Status</label>
              <select
                className="form-control"
                id="status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                required
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
                required
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
                required
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
