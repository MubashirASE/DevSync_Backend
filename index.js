import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRouter from "./routes/user.route.js"
import standupRouter from "./routes/standup.route.js"
import reviewRouter from "./routes/review.route.js"

dotenv.config();

connectDB();

const app = express();
app.use(express.json());


app.use(cors({
  origin: "http://localhost:5173",
  methods:["GET","POST","PUT","DELETE","PATCH"],
  credentials: true
}));


app.use("/api/v1/user",userRouter);
app.use("/api/v1/standup",standupRouter);
app.use("/api/v1/review",reviewRouter);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
