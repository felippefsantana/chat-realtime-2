import { createServer } from "node:http";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import { env } from "./config/env";

import authRoutes from "./http/routes/auth-routes";
import userRoutes from "./http/routes/user-routes";
import chatRoutes from "./http/routes/chat-routes";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req: Request, res: Response): Response => {
  return res.json({ message: "Hello World!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(env.APP_PORT, () => {
  console.log(`Server is running on ${env.APP_URL}`);
});
