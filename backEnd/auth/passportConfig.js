const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Login = require("../Model/Login");
require("dotenv").config();

// ENV file
const SECRET_KEY = process.env.SECRET_KEY;

// userInfo
const sanitizeUser = (user) => {
  return { id: user.id };
};

// get Cookies for request
const cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

// Jwt Secret
const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.SECRET_KEY,
};

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "f_userName",
      passwordField: "f_Pwd",
    },
    async function (username, password, done) {
      try {
        const user = await Login.findOne({ f_userName: username });

        if (!user) {
          return done(null, false, { message: "User does not exist" });
        }

        crypto.pbkdf2(
          password,
          user.salt,
          310000,
          32,
          "sha256",
          async function (err, hashedPassword) {
            if (err) {
              return done(err);
            }
            const userPasswordBuffer = Buffer.from(user.f_Pwd);

            if (!crypto.timingSafeEqual(userPasswordBuffer, hashedPassword)) {
              return done(null, false, { message: "Invalid credentials" });
            }
            const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
            return done(null, { id: user.id, token });
          }
        );
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
  
    try {
      const user = await Login.findOne({ _id: jwt_payload.id });
   
      if (user) {
        return done(null, sanitizeUser(user));
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// this creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, { id: user._id });
  });
});

// this changes session variable req.user when called from authorized request

passport.deserializeUser(function (user, cb) {

  process.nextTick(function () {
    return cb(null, user);
  });
});

module.exports = passport;
