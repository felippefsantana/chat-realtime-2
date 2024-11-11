import jwt from "jsonwebtoken";
import { env } from "../config/env";

type DataStoredInToken = {
  id: string;
  email: string;
};

export function verifyAccessToken(token: string): DataStoredInToken {
  return jwt.verify(token, env.JWT_SECRET) as DataStoredInToken;
}