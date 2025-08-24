import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/UserRoutes.js";
import postRoutes from "./routes/PostRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js"; // Intentional different name to test import

// Load environment variables from .env file
dotenv.config();
const env = process.env;

const app = express();
app.use(express.json());

const port = env.PORT;

await connectDB();

// define static folder
app.use("/public", express.static("public"));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/category", categoryRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
