import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./database/db.js";
import userRouter from "./routes/user.route.js";
import standupRouter from "./routes/standup.route.js";
import reviewRouter from "./routes/review.route.js";
import quickLinkRouter from "./routes/quickLink.route.js";
import { User } from "./models/user.model.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

app.use(cors(corsOptions));

const io = new Server(server, { cors: corsOptions });
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("user:connected", async (userId) => {
    await User.findByIdAndUpdate(userId, {
      lastActive: Date.now(),
      isActive: true,
      socketId: socket.id,
    });
  });

  socket.on("user:logout", async (userId) => {
    console.log(`User logged out manually: ${userId}`);
    try {
      await User.findByIdAndUpdate(userId, { isActive: false });
      socket.disconnect(true);
    } catch (err) {
      console.error("Logout error:", err);
    }
  });

  socket.on("disconnect", async () => {
    console.log("User disconnected:", socket.id);
    await User.findOneAndUpdate({ socketId: socket.id }, { isActive: false });
    io.emit("user-left", socket.id);
  });
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/standup", standupRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/link", quickLinkRouter);

app.get("/", (req, res) => res.send("API is running..."));

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
