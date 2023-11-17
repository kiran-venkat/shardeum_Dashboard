import { useLocation } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { DataCard } from "./Components/DataCard/DataCard";
import { IconButton, Switch } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";

function CourseDetailsPage() {
  const location = useLocation();
  const { state } = location;

  const { course, userData } = state;

  const [userDetails, setUserDetails] = useState(userData);

  const [blockStatuses, setBlockStatuses] = useState(() => {
    const storedBlockStatuses = JSON.parse(
      localStorage.getItem("blockStatuses")
    );
    return storedBlockStatuses || {};
  });

  const handleBlockToggle = async (userId, blockStatus) => {
    try {
      const response = await axios.post(
        `https://shardeum-backend.onrender.com/api/auth/toggleBlock?userId=${userId}`
      );

      // Update the local state based on the API response
      setBlockStatuses((prevBlockStatuses) => ({
        ...prevBlockStatuses,
        [userId]: response.data.isBlocked ? "on" : "off",
      }));

      // Save the updated block statuses in local storage
      localStorage.setItem(
        "blockStatuses",
        JSON.stringify({
          ...blockStatuses,
          [userId]: response.data.isBlocked ? "on" : "off",
        })
      );
    } catch (error) {
      console.error("Error toggling block status:", error);
    }
  };

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
        <IconButton
          onClick={() =>
            handleBlockToggle(params.row.id, params.row.blockStatus)
          }
        >
          <Switch
            checked={blockStatuses[params.row.id] === "on"}
            onChange={() =>
              handleBlockToggle(params.row.id, params.row.blockStatus)
            }
          />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    setUserDetails(userData); // Update local state when userData changes
  }, [userData]);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ marginTop: "30px", marginBottom: "20px" }}>
        <h2>Course Details</h2>
      </div>

      <div
        key={course._id}
        style={{
          margin: "10px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={course.banner}
          alt={course.title}
          style={{
            width: "40%",
            height: "40%",
            borderRadius: "12px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            objectFit: "cover",
            marginBottom: "30px",
          }}
        />

        <div  style={{
          margin: "10px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}>

        <DataCard title="Title" data={course.title} />
        <DataCard title="Description" data={course.description} />
        <DataCard title="Users Enrolled" data={course.usersEnrolled.length} />
        <DataCard title="Level" data={course.level} />
        <DataCard title="Duration" data={course.duration} />
        </div>
      </div>

      <div style={{ marginTop: "30px", marginBottom: "20px" }}>
        <h2>User Details</h2>
      </div>

      <div style={{ height: "400px", width: "100%" }} className="tablediv">
        <DataGrid
          sx={{
            backgroundColor: "white",
            boxShadow: 2,
            border: 0,
            borderColor: "primary.light",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
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
