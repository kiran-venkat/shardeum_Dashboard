import React, { useEffect, useState } from "react";
import { DataCard } from "./Components/DataCard/DataCard";
import { DataGrid } from "@mui/x-data-grid";
import BeatLoader from "react-spinners/BeatLoader";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PieChart } from '@mui/x-charts/PieChart';


function App() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();
  const [pagedata, setPageData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: "username", headerName: "Username", flex: 0.2 },
    { field: "email", headerName: "Email", flex: 0.2 },
    { field: "walletAddress", headerName: "Wallet Address", flex: 0.2 },
    { field: "designation", headerName: "Designation", flex: 0.2 },
    { field: "portfolio", headerName: "Portfolio", flex: 0.2 },
  ];

  useEffect(() => {
    getCourseData();
  }, []);

  const getCourseData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/course/allCourses"
      );
      const result = await response.json();
      setCourses(result.courses);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching course data:", error);
      setLoading(false);
    }
  };

  // ...

  const handleCourseClick = async (course) => {
    setSelectedCourse(course);
    const usersEnrolled = course.usersEnrolled || [];
    const userData = await Promise.all(
      usersEnrolled.map(async (userId) => {
        const userResponse = await fetch(
          `http://localhost:8080/api/auth/user?userId=${userId}`
        );
        const userResult = await userResponse.json();
        return {
          id: userId,
          ...userResult,
        };
      })
    );

    // Navigate to a new page with course and user details
    navigate(`/course-details/${course._id}`, {
      state: { course, userData },
    });
  };

  // ...

  const pieChartData = courses.map((course, index) => ({
    id: index,
    value: course.usersEnrolled.length,
    label: course.title,
  }));

  const labelRenderer = ({ datum }) => {
    return (
      <text x={datum.x + datum.width} y={datum.y + datum.height / 2} textAnchor="start">
        {datum.label}
      </text>
    );
  };

  return (
<div className="Dashboard" style={{ textAlign: "center" }}>
{/* <PieChart
      series={[{ data: pieChartData }]}
      width={400}
      height={200}
      labelRenderer={labelRenderer}
    /> */}
  <div
    className="Dashboard-grid"
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around", // Adjust as needed
    }}
  >
    <div key="total-courses" style={{ margin: "10px" }}>
      <DataCard
        title="Total Number of Courses"
        data={courses.length}
        onClick={() => {/* Handle click if needed */}}
      />
    </div>

    {courses.map((course) => (
      <div key={course._id} style={{ margin: "10px" }}>
        <DataCard
          title={course.title}
          data={course.description}
          onClick={() => handleCourseClick(course)}
		  
        />
      </div>
    ))}
  </div>

</div>


  );
}

export default App;
