const Login = require("../Model/Login");
const crypto = require("crypto");

class LoginController {
  async createUser(req, res) {
    try {
      const { f_userName, f_Pwd } = req.body;

      // Check for missing dependencies
      if (!f_userName || !f_Pwd) {
        return res.status(400).send({ message: "Missing dependency" });
      }

      // Password hashed
      const salt = crypto.randomBytes(16);
      const hashedPassword = await new Promise((resolve, reject) => {
        crypto.pbkdf2(f_Pwd, salt, 310000, 32, "sha256", (err, hashed) => {
          if (err) reject(err);
          resolve(hashed);
        });
      });

      // Save User
      const result = await Login.create({
        ...req.body,
        f_Pwd: hashedPassword,
        salt,
      });

      return res.status(201).send({
        message: "User created successfully",
        user: result,
      });
    } catch (error) {
      // Handle validation errors
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err) => err.message);
        return res.status(400).send({ message: "Validation Error", errors });
      }

      // Handle duplicate key error
      if (error.code === 11000 && error.keyPattern && error.keyValue) {
        return res
          .status(400)
          .send({ message: "User already exists", errors: error.keyValue });
      }

      // Internal server error
      console.error("Internal Server Error:", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }

  async loginUser(req, res) {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ error: "Unauthorized: Invalid credentials" });
      }

      const user = req.user;
      const token = req.user.token;
      res.cookie("user", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: false,
      });
      // res.render("login");

      return res
        .status(201)
        .json({ id: user.id, role: user.role, token: token });
    } catch (error) {
      console.error("Error setting cookie:", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }

  async checkAuth(req, res) {
    if (req.user) {
      res.json({ status: "success", user: req.user });
    } else {
      res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
  }
}

const loginController = new LoginController();
module.exports = loginController;
