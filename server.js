import express from "express";
import cors from "cors";
import connection from './config/db.js'
import userModel from "./models/user.js";
import teachModel from "./models/teach.js";
import bcrypt from 'bcrypt'

const app = express();
const port = 3000;

// ✅ Middleware setup
app.use(cors()); // Enables CORS for all routes
app.use(express.json()); // Parses incoming JSON requests

// ✅ Routes
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/login", async (req, res) => {
  console.log("Received data:", req.body);
  // console.log('Login payload:', req.body);
  const {rollNumber, password} = req.body;

  const existingUser = await userModel.findOne({ rollNumber });
  const comparePassword = await bcrypt.compare(password, existingUser.password)

  if(!comparePassword){
    res.status(404).json({message: "Invalid credentials"})
  }
  else{
    res.status(200).json({ message: 'Welcome to Revocharge!!' });
  }

});


app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { rollNumber, Class, email, password, confirmPassword } = req.body
  if (!req.body || !Class || !rollNumber || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Invalid request body' });
  }
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: 'User with this email already exists' })
  }
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  await userModel.create({
    rollNumber,
    Class,
    email,
    password: hashedPassword,
    confirmPassword: hashedPassword,
  })
  return res.status(201).json({ message: "done" })
})


app.post("/teachlogin", async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const { email, password } = req.body;

    // Check if email exists
    const existingUser = await teachModel.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "Email not registered" });
    }

    // Check password
    if (password !== existingUser.password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Success
    return res.status(200).json({
      message: "Welcome to EduNotify!!",
      teacher: existingUser
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



// ✅ Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
