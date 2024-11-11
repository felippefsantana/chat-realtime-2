import { createServer } from "node:http";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { env } from "./config/env";

import authRoutes from "./http/routes/auth-routes";
import userRoutes from "./http/routes/user-routes";
import chatRoutes from "./http/routes/chat-routes";
import messageRoutes from "./http/routes/message-routes";
import { initSocket } from "./lib/socket";

const app = express();
const server = createServer(app);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// app.use(cors());

app.get("/", (req: Request, res: Response): Response => {
  return res.json({ message: "Hello World!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

initSocket(server);

server.listen(env.APP_PORT, () => {
  console.log(`Server is running on ${env.APP_URL}`);
});
