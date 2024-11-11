import { prisma } from "@/lib/prisma";
import { Request, Response } from "express";
import { z, ZodError } from "zod";
import bcrypt from "bcrypt";
import { generateAccessToken } from "@/helpers/generate-token";

export async function login(req: Request, res: Response) {
  const authSchema = z.object({
    email: z
      .string()
      .min(1, "Preencha o email.")
      .email("Formato de email inválido.")
      .trim(),
    password: z.string().min(1, "Preencha a senha."),
  });

  try {
    const { email, password } = authSchema.parse(req.body);
    const user = await prisma.user.findUnique({
      where: {
        email
      },
      omit: {
        password: false,
      }
    });

    if (!user) {
      return res.status(400).json({
        message: "Email ou senha incorretos."
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Email ou senha incorretos."
      });
    }

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
    });

    return res.status(200).json({
      message: "Autenticado com sucesso.",
      access_token: accessToken,
      user,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Dados inválidos",
        error,
      });
    }

    return res.status(500).json({
      message: "Erro interno do servidor.",
      error
    });
  }
}

export function logout() {}
