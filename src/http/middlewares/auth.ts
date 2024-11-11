import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "@/helpers/verify-token";
import { prisma } from "@/lib/prisma";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader && authHeader.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({
        message: "Não autorizado!",
      });
    }

    const decoded = verifyAccessToken(accessToken);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id
      }
    });

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado!",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido!",
      error
    });
  }
};
