import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/UserRoutes.js";

// Load environment variables from .env file
dotenv.config();
const env = process.env;

const app = express();
app.use(express.json());

const port = env.PORT;

await connectDB();

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
