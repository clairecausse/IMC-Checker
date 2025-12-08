import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import historyRoutes from "./routes/history.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/history", historyRoutes);

app.listen(3001, () => console.log("Backend running on http://localhost:3001"));
