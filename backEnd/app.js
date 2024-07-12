require("dotenv").config();
const express = require("express");
const cors = require("cors");
const home = require("./Routers/home");
const DbConnection = require("./DbConnection");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const passport = require("./auth/passportConfig");
const session = require("express-session");
const loginRouter = require("./Routers/Login");
const EmployeRouter = require("./Routers/Employe");

// Server start
const app = express();
DbConnection();

// CORS middleware configuration
app.use(
  cors({
    origin: ["http://localhost:3000", "*"], // Replace with your React app's URL
    credentials: true, // Allow credentials (cookies)
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false  ,
    saveUninitialized: true,
    
  })
); 

app.use(passport.initialize());
app.use(fileUpload());
app.use("/Uploads", express.static("./Uploads"));

// Routers
app.use("/", home);
app.use("/auth", loginRouter);
app.use("/employe", EmployeRouter);

// Listen Port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server Start On \n     http://localhost:${PORT}`);
});
