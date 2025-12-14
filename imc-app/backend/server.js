import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import historyRoutes from "./routes/history.js";
import usersRoutes from "./routes/users.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/history", historyRoutes);
app.use("/users", usersRoutes);


app.listen(3001, () => console.log("Backend running on http://localhost:3001"));
