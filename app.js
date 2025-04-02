const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoute")
const formRoutes = require("./routes/formRoutes")
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin:['https://intake-ten.vercel.app/',"http://localhost:3000"]
}));

connectDB();
app.use("/api/user", userRoutes)
app.use("/api/userForm",formRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
