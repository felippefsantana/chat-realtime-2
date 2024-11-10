import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config/env";

export function generateAccessToken(payload: JwtPayload) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
}
