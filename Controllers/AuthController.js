const User = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    console.log("signup request receieved")
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    console.log("user cretared", user)
    const token = createSecretToken(user._id);


    res.cookie("token", token, {
      withCredentials: true,
      // httpOnly: false,
    httpOnly: true,
      sameSite: "none",
      secure: true,
    });


    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};


module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: 'All fields are required' })
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: 'Incorrect password or email' })
    }
    const auth = await bcrypt.compare(password, user.password)
    if (!auth) {
      return res.json({ message: 'Incorrect password or email' })
    }
    const token = createSecretToken(user._id);



  

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });





    res.status(201).json({ message: "User logged in successfully", success: true });
    next()
  } catch (error) {
    console.error(error);
  }
}



// const User = require("../model/user");
// const bcrypt = require("bcryptjs");
// const { createSecretToken } = require("../utils/SecretToken");

// // SIGNUP
// module.exports.Signup = async (req, res) => {
//   const { name, email, password } = req.body;

//   const userExists = await User.findOne({ email });
//   if (userExists) return res.json({ success: false, message: "User exists" });

//   const hashed = await bcrypt.hash(password, 10);

//   const user = await User.create({
//     name,
//     email,
//     password: hashed,
//   });

//   const token = createSecretToken(user._id);

//   res.cookie("token", token, {
//     httpOnly: true,
//     sameSite: "lax",
//   });

//   res.json({ success: true, message: "Signup success" });
// };

// // LOGIN
// module.exports.Login = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) return res.json({ success: false });

//   const match = await bcrypt.compare(password, user.password);
//   if (!match) return res.json({ success: false });

//   const token = createSecretToken(user._id);

//   res.cookie("token", token, {
//     httpOnly: true,
//     sameSite: "lax",
//   });

//   res.json({ success: true });
// };

// // LOGOUT
// module.exports.Logout = async (req, res) => {
//   res.cookie("token", "", { expires: new Date(0) });
//   res.json({ success: true });
// };







// // authMidleware

// const jwt = require("jsonwebtoken");
// const User = require("../model/user");

// module.exports.userVerification = async (req, res) => {
//   try {
//     const token = req.cookies.token;

//     // ❌ no token
//     if (!token) {
//       return res.json({ status: false });
//     }

//     // verify token
//     jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
//       if (err) {
//         return res.json({ status: false });
//       }

//       // find user from token id
//       const user = await User.findById(data.id);

//       if (user) {
//         return res.json({
//           status: true,
//           user: user.name,
//         });
//       }

//       return res.json({ status: false });
//     });
//   } catch (err) {
//     return res.json({ status: false });
//   }
// };