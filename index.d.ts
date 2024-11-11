import { Express } from "express-serve-static-core";
import { Teacher, User } from "@prisma/client";

declare module "express-serve-static-core" {
  interface Request {
    user: Omit<User, "password">;
  }
}
