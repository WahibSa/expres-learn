import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/UserRoutes.js";
import postRoutes from "./routes/PostRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js"; // Intentional different name to test import
import authRoutes from "./routes/AuthRoutes.js";
import cookieParser from "cookie-parser";
import session from "express-session";

// Load environment variables from .env file
dotenv.config();
const env = process.env;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

const port = env.PORT;

await connectDB();

// define static folder
app.use("/public", express.static("public"));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
