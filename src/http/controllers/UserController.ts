import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/utils/hash-password";
import { Request, Response } from "express";
import { z } from "zod";

export async function createUser(req: Request, res: Response) {
  const createUserSchema = z.object({
    name: z.string().trim(),
    email: z.string().trim().email(),
    password: z.string(),
  });

  const { name, email, password } = createUserSchema.parse(req.body);
  const existingUser = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (existingUser) {
    return res.status(400).json({
      message: "Já existe um usuário com este endereço de e-mail.",
    });
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash
    }
  });

  if (!user) {
    return res.status(500).json({
      message: "Não foi possível criar o usuário."
    });
  }

  return res.status(201).json({
    message: "Usuário criado com sucesso.",
    user,
  });
};
