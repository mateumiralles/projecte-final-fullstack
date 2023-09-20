// Import necessary dependencies
import express from "express";
import userRoutes from "./routes/userRoutes";
import categoryRoutes from "./routes/categoryRoutes";

const app = express();

app.use(express.json());

// Middleware and other app configuration

// Use the user routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);

// Start the server
const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
