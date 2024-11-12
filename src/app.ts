import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./http/routes/auth-routes";
import userRoutes from "./http/routes/user-routes";
import chatRoutes from "./http/routes/chat-routes";
import messageRoutes from "./http/routes/message-routes";

const app = express();

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
app.use("/api/messages", messageRoutes);

export default app;
