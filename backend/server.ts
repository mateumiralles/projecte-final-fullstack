// Import necessary dependencies
import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import paymentMethodRoutes from "./routes/paymentMethodRoutes";
import productRoutes from "./routes/productRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/paymentMethods", paymentMethodRoutes);
app.use("/api/products", productRoutes);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
