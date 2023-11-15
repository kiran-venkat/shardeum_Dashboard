import React from "react";
import { useLocation } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { DataCard } from "./Components/DataCard/DataCard";
import { IconButton, Switch } from "@mui/material";
import axios from "axios";



function CourseDetailsPage() {
  const location = useLocation();
  const { state } = location;

  if (!state || !state.course || !state.userData) {
    return <div>Error: Invalid state</div>;
  }

  const { course, userData } = state;

  // Define columns for the DataGrid
  const columns = [
    { field: "username", headerName: "Username", flex: 0.2 },
    { field: "email", headerName: "Email", flex: 0.2 },
    { field: "walletAddress", headerName: "Wallet Address", flex: 0.2 },
    { field: "designation", headerName: "Designation", flex: 0.2 },
    { field: "portfolio", headerName: "Portfolio", flex: 0.2 },
    {
      field: "blockStatus",
      headerName: "Block/Unblock",
      flex: 0.2,
      renderCell: (params) => (
        <IconButton onClick={() => handleBlockToggle(params.row.id, params.row.blockStatus)}>
          <Switch checked={params.row.blockStatus} />
        </IconButton>
      ),
    },
  ];

  const handleBlockToggle = async (userId, blockStatus) => {
    try {
      await axios.post(`http://localhost:8080/api/auth/toggleBlock?userId=${userId}`);
    } catch (error) {
      console.error("Error toggling block status:", error);
    }
  };
  return (
    <div style={{ textAlign: "center" }}>
      {/* Course Details Title */}
      <div style={{ marginTop: "30px", marginBottom: "20px" }}>
        <h2>Course Details</h2>
      </div>

      {/* Course Details Section */}
      <div
        key={course._id}
        style={{
          margin: "10px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <img
          src={course.banner}
          alt={course.title}
          style={{
            width: "75%",
            height: "75%",
            borderRadius: "12px", // You can adjust the border-radius as needed
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", // Optional: Add a subtle box shadow
            objectFit: "cover", // Ensure the image covers the entire container
            marginBottom: "30px",
          }}
        />

        <DataCard title="Title" data={course.title} />
        <DataCard title="Description" data={course.description} />
        <DataCard title="Users Enrolled" data={course.usersEnrolled.length} />
        <DataCard title="Level" data={course.level} />
        <DataCard title="Duration" data={course.duration} />
      </div>

      {/* User Details Title */}
      <div style={{ marginTop: "30px", marginBottom: "20px" }}>
        <h2>User Details</h2>
      </div>

      {/* User Details Section */}
      <div style={{ height: "400px", width: "100%" }} className="tablediv">
        <DataGrid
          sx={{
            backgroundColor: "white",
            boxShadow: 2,
            border: 0,
            borderColor: 'primary.light',
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
          }}
          rows={userData}
          columns={columns}
          pageSize={5}
          rowHeight={80}
          rowsPerPageOptions={[5]}
          hideFooter={true}
          getRowId={(row) => row.id}
          onRowClick={(row) => {
            console.log(row);
          }}
        />
      </div>
    </div>
  );
}

export default CourseDetailsPage;
