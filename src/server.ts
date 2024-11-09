import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { env } from "./config/env";

import userRoutes from "./http/routes/user-routes";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req: Request, res: Response): Response => {
  return res.json({ message: "Hello World!" });
});

app.use("/api/users", userRoutes);

app.listen(env.APP_PORT, () => {
  console.log(`Server is running on ${env.APP_URL}`);
});
