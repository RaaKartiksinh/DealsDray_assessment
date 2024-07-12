import React, { useEffect, useState } from "react";
import apiHelper from "../common/ApiHelper";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EmployeModel from "../components/EmployeModel";

export default function EmployeeList() {
  const [employeeList, setEmployeeList] = useState([]);
  console.log(employeeList);
  const [openEmployeModel, setOpenEmployeModel] = useState(false);
  const [editData, setEditData] = useState({});

  // API call
  const getEmployeeList = async () => {
    try {
      let result = await apiHelper.getEmployeeList();
      console.log(result);
      if (result && result.data) {
        setEmployeeList(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployeeList();
  }, []);

  const handleEdit = (data) => {
    // Handle edit action

    console.log("Edit:", data);
    setEditData(data);
    setOpenEmployeModel(true);
  };

  const handleDelete = async (id) => {
    // Handle delete action
    console.log("Delete:", id);
    try {
      const result = await apiHelper.deleteEmployeeList(id);
      if (result && result.data) {
        getEmployeeList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID" },

    {
      field: "f_Image",
      headerName: "Image",
      align: "center",
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Employee"
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "100px",
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      field: "f_Name",
      headerName: "Name",
      align: "center",
      flex: 1,
    },
    {
      field: "f_Email",
      headerName: "Email",
      align: "center",
      flex: 1,
    },
    {
      field: "f_Mobile",
      headerName: "Mobile",
      align: "center",
      flex: 1,
    },
    {
      field: "f_Designation",
      headerName: "Designation",
      align: "center",
      flex: 1,
    },
    {
      field: "f_gender",
      headerName: "Gender",
      align: "center",
      flex: 1,
    },
    {
      field: "f_Course",
      headerName: "Course",
      align: "center",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => handleEdit(params.row)}
            startIcon={<EditIcon />}
            variant="contained"
            color="primary"
            size="small"
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(params.row._id)}
            startIcon={<DeleteIcon />}
            variant="contained"
            color="secondary"
            size="small"
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Box
        className="heading_tag"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          m: 4,
        }}
      >
        <Typography variant="h4">Employee List</Typography>

        <Typography variant="h6">Total Count: {employeeList.length}</Typography>

        <Button
          // startIcon={<Add />}
          onClick={() => setOpenEmployeModel(true)}
          variant="contained"
          color="secondary"
          size="small"
        >
          Create Employee
        </Button>
      </Box>

      <Box sx={{ height: 600, width: "90%", margin: "5px auto" }}>
        <DataGrid
          rows={employeeList}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
          pageSizeOptions={[25, 75, 100]}
          disableRowSelectionOnClick
        />
      </Box>
      <EmployeModel
        openEmployeModel={openEmployeModel}
        setOpenEmployeModel={setOpenEmployeModel}
        getEmployeeList={getEmployeeList}
        editData={editData}
        setEditData={setEditData}
      />
    </div>
  );
}
