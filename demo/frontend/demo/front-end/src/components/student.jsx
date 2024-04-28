import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8089/api/v1/student';

function Student() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleNavigateToAddStudent = () => {
    navigate('/post'); // Corrected route path for adding students
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/getall`);
      setStudents(response.data);
    } catch (error) {
      setError('Error fetching student details. Please check your API endpoint.'); // More informative error message
    }
  };

  const handleEditStudent = (studentId) => {
    navigate(`/editpost/${studentId}`); // Corrected route path for editing students
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.delete(`${API_URL}/delete/${studentId}`);
      alert('Successfully Deleted');
      fetchStudents(); // Refetch data after deletion
    } catch (error) {
      setError('Error deleting student details. Please check your API functionality.'); // More informative error message
    }
  };

  return (
    <div>
      <h1>Workout Details</h1> {/* Corrected title */}
      <button className="btn btn-primary mt-4" onClick={handleNavigateToAddStudent}>
        Add Post
      </button>

      {error && <div className="alert alert-danger">{error}</div>}

      <div style={{ display: 'flex', justifyContent: 'center' }}> {/* Inline styling */}
        <table className="table table-dark table-striped"> {/* Improved table styling */}
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Caption</th>
              <th scope="col">Mobile</th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.studentname}</td>
                <td>{student.studentaddress}</td>
                <td>{student.mobile}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning mr-2"
                    onClick={() => handleEditStudent(student._id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteStudent(student._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student;
