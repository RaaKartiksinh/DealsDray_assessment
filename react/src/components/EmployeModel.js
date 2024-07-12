import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  FormControl,
  MenuItem,
  FormLabel,
} from "@mui/material";
import apiHelper from "../common/ApiHelper";
import validate from "../common/Validation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EmployeModel({
  openEmployeModel,
  setOpenEmployeModel,
  getEmployeeList,
  editData,
}) {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    f_Image: "",
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_gender: "",
    f_Course: [],
  });

  const handleClose = () => {
    setErrors({});
    setFormData({
      f_Image: "",
      f_Name: "",
      f_Email: "",
      f_Mobile: "",
      f_Designation: "",
      f_gender: "",
      f_Course: [],
    });
    setOpenEmployeModel(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0], // Store the first selected file
      }));
    } else if (type === "checkbox") {
      setFormData((prevState) => {
        const updatedCourses = prevState.f_Course
          ? [...prevState.f_Course]
          : [];
        if (checked) {
          updatedCourses.push(value);
        } else {
          const index = updatedCourses.indexOf(value);
          if (index > -1) {
            updatedCourses.splice(index, 1);
          }
        }
        return { ...prevState, f_Course: updatedCourses };
      });
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    if (Object.keys(errors).length !== 0) {
      // Validate input
      const validationErrors = validate(
        {
          ...formData,
          [name]:
            type === "checkbox"
              ? checked
                ? [...(formData.f_Course || []), value]
                : (formData.f_Course || []).filter((course) => course !== value)
              : value,
        },
        "Employe"
      );

      setErrors(validationErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate form data (excluding the file for now)
      const validationErrors = validate(formData, "Employe");
      if (Object.keys(validationErrors).length !== 0) {
        setErrors(validationErrors);
        return;
      }

      // Create a new FormData object
      const formDataToSend = new FormData();

      // Append all fields to the FormData object
      for (const key in formData) {
        if (key === "f_Course") {
          formData[key].forEach((course) => formDataToSend.append(key, course));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }

      let result;
      if (formData && formData._id) {
        // Update employee data
        result = await apiHelper.updateEmployeeList(
          formData._id,
          formDataToSend
        );
      } else {
        // Create new employee
        result = await apiHelper.createEmploye(formDataToSend);
      }

      if (result && result.data) {
        setFormData({
          f_Image: "",
          f_Name: "",
          f_Email: "",
          f_Mobile: "",
          f_Designation: "",
          f_gender: "",
          f_Course: [],
        });

        getEmployeeList();
        handleClose();
      } else {
        console.error("Failed to create/update employee:", result);
        // Handle error case, e.g., show a notification to the user
      }
    } catch (error) {
      console.error("Error creating/updating employee:", error);
      // Handle error case, e.g., show a notification to the user
    }
  };
  useEffect(() => {
    setFormData((prev) => ({ ...prev, ...editData }));
  }, [editData]);

  return (
    <Modal
      open={openEmployeModel}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ overflow: "auto" }}
    >
      <Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          name="f_Name"
          label="Name"
          value={formData.f_Name}
          onChange={handleChange}
          error={!!errors.f_Name}
          helperText={errors.f_Name}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="f_Email"
          label="Email"
          value={formData.f_Email}
          onChange={handleChange}
          error={!!errors.f_Email}
          helperText={errors.f_Email}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="f_Mobile"
          label="Mobile No"
          value={formData.f_Mobile}
          onChange={handleChange}
          error={!!errors.f_Mobile}
          helperText={errors.f_Mobile}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="f_Designation"
          label="Designation"
          value={formData.f_Designation}
          onChange={handleChange}
          error={!!errors.f_Designation}
          helperText={errors.f_Designation}
          fullWidth
          required
          margin="normal"
          select
        >
          {["HR", "Manager", "Sales"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            name="f_gender"
            value={formData.f_gender}
            onChange={handleChange}
            row
          >
            {["Male", "Female"].map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
          {errors.f_gender && (
            <Typography variant="body2" color="error">
              {errors.f_gender}
            </Typography>
          )}
        </FormControl>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Course</FormLabel>
          <FormGroup row>
            {["MCA", "BCA", "BSC"].map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={formData.f_Course?.includes(option)}
                    onChange={handleChange}
                    name="f_Course"
                    value={option}
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>
          {errors.f_Course && (
            <Typography variant="body2" color="error">
              {errors.f_Course}
            </Typography>
          )}
        </FormControl>

        {/* Display uploaded image */}
        {formData.f_Image && (
          <Box mt={2}>
            <Typography variant="body1">Uploaded Image:</Typography>
            <img
              src={
                formData && formData._id
                  ? formData.f_Image
                  : URL.createObjectURL(formData.f_Image)
              }
              alt="Uploaded"
              style={{ maxWidth: "100%", marginTop: "8px" }}
            />
          </Box>
        )}

        <TextField
          name="f_Image"
          label="Image Upload"
          onChange={handleChange}
          error={!!errors.f_Image}
          helperText={errors.f_Image}
          fullWidth
          required
          margin="normal"
          type="file"
          inputProps={{ accept: "image/jpeg, image/png" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
}
