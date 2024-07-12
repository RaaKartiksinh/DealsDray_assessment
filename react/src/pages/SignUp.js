import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import apiHelper from "../common/ApiHelper";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import validate from "../common/Validation";

export default function SignUp() {
  const [loginData, setLoginData] = useState({});
  const [error, setErrors] = useState({});
  const navigate = useNavigate();

  let cookies = Cookies.get("user");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));

    // Validate input
    if (Object.keys(error).length !== 0) {
      const validationErrors = validate(
        { ...loginData, [name]: value },
        "login"
      );
      setErrors(validationErrors);
      return;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const validationErrors = validate(loginData, "login");
      if (Object.keys(validationErrors).length !== 0) {
        setErrors(validationErrors);
        return;
      }

      const result = await apiHelper.adminCreate(loginData);
      if (result && result.data) {
       
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {cookies && <Navigate to="/" replace={true} />}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box
          component="form"
          method="POST"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="f_userName"
            label="User Name"
            name="f_userName"
            autoFocus
            onChange={handleChange}
            error={!!error.f_userName}
            helperText={error.f_userName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="f_Pwd"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            error={!!error.f_Pwd}
            helperText={error.f_Pwd}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
