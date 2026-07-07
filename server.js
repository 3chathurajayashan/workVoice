import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app.js";
import connectDB from "./Configs/db.js";

import { Server } from "socket.io";
import { initSocket } from "./Configs/socket.js";

const PORT = process.env.PORT || 5002;

// 1. create server
const server = http.createServer(app);

// 2. create io
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// 3. init socket system (PASS io)
initSocket(io);

// optional global access
global.io = io;

const startServer = async () => {
  try {
    await connectDB();

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();