// Import necessary dependencies
import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import paymentMethodRoutes from "./routes/paymentMethodRoutes";
import productRoutes from "./routes/productRoutes";
import productSummaryRoutes from "./routes/productSummaryRoutes";
import paymentRoutes from "./routes/paymentRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/paymentMethods", paymentMethodRoutes);
app.use("/api/products", productRoutes);
app.use("/api/productSummaries", productSummaryRoutes);
app.use("/api/payments", paymentRoutes);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
