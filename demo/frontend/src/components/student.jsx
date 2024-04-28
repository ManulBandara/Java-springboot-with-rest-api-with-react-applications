import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8089/api/v1/student";

function Student() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/getall`);
      setStudents(response.data);

      const pushupData = response.data.map((student) => ({
        date: student.studentname,
        pushups: student.noofpushups,
      }));

      const randistanceData = response.data.map((student) => ({
        date: student.studentname, 
        randis: student.randistance,
      }));

      const weightLiftedData = response.data.map((student) => ({
        date: student.studentname, 
        weigtlift: student.weightlifted,
      }));

      renderPushupChart(pushupData);
      renderRandistanceChart(randistanceData);
      renderWeightLiftedChart(weightLiftedData);
    } catch (error) {
      setError("Error fetching details");
    }
  };

  const handleNavigateToAddStudent = () => {
    navigate("/post");
  };

  const handleEditStudent = (studentId) => {
    navigate(`/editpost/${studentId}`);
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.delete(`${API_URL}/delete/${studentId}`);
      alert("Successfully Deleted");
      fetchStudents(); // Refetch data after deletion
    } catch (error) {
      setError("Error deleting student details");
    }
  };

  const renderPushupChart = (data) => {
    const ctx = document.getElementById("pushupChart");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((entry) => entry.date),
        datasets: [
          {
            label: "No Of Pushups",
            data: data.map((entry) => entry.pushups),
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            title: {
              display: true,
              text: "No Of Pushups",
            },
          },
        },
      },
    });
  };
  const renderRandistanceChart = (data) => {
    const ctx = document.getElementById("randistancechart");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((entry) => entry.date),
        datasets: [
          {
            label: "Ran Distance",
            data: data.map((entry) => entry.randis),
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            title: {
              display: true,
              text: "No Of Pushups",
            },
          },
        },
      },
    });
  };
  const renderWeightLiftedChart = (data) => {
    const ctx = document.getElementById("weightliftedchart");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((entry) => entry.date),
        datasets: [
          {
            label: "Weight Lifted",
            data: data.map((entry) => entry.weigtlift),
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            title: {
              display: true,
              text: "Weight",
            },
          },
        },
      },
    });
  };

  return (
    <center>
      <div>
        <br />
        <h1>Users List</h1>
        <br />
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <div style={{ width: "600px", marginRight: "20px" }}>
            <canvas id="pushupChart" width={600} height={300}></canvas>
          </div>
          <div style={{ width: "600px" }}>
            <canvas id="randistancechart" width={600} height={300}></canvas>
          </div>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <div style={{ width: "600px", marginRight: "20px" }}>
            <canvas id="weightliftedchart" width={600} height={300}></canvas>
          </div>
        </div>
        <br />
        <br />
        <br />
        <button
          className="btn btn-primary mt-4"
          onClick={handleNavigateToAddStudent}
        >
          Create
        </button>
        <div>
          <table className="table table-striped mt-4">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
                <th scope="col">No Of Pushups</th>
                <th scope="col">Ran Distance</th>
                <th scope="col">Weight Lifted</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.studentname}</td>
                  <td>{student.studentaddress}</td>
                  <td>{student.status}</td>
                  <td>{student.noofpushups}</td>
                  <td>{student.randistance} Km</td>
                  <td>{student.weightlifted} Kg</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success mr-2"
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
        <br />
        <br />
        <br />
      </div>
    </center>
  );
}

export default Student;
