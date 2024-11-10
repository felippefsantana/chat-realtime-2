import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/utils/hash-password";
import { Request, Response } from "express";
import { z } from "zod";

export async function createUser(req: Request, res: Response) {
  const createUserSchema = z.object({
    name: z.string().min(2, "Nome obrigatório.").trim(),
    email: z
      .string({ required_error: "O e-mail é obrigatório!" })
      .trim()
      .email("E-mail inválido!"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
  });

  try {
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
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno do servidor.",
      error
    });
  }
};

export async function findUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado."
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno do servidor.",
      error
    });
  }
}

export async function updateUser(req: Request, res: Response) {
  const updateUserSchema = z.object({
    name: z.string().min(2, "Nome obrigatório.").trim(),
    email: z
      .string({ required_error: "O e-mail é obrigatório!" })
      .trim()
      .email("E-mail inválido!"),
  });

  try {
    const { name, email } = updateUserSchema.parse(req.body);
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado."
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        name,
        email
      }
    });

    if (!updatedUser) {
      return res.status(500).json({
        message: "Não foi possível atualizar os dados do usuário."
      });
    }

    return res.status(200).json({
      message: "Usuário atualizado com sucesso.",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno do servidor.",
      error
    });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado."
      });
    }

    await prisma.user.delete({
      where: {
        id: userId
      }
    });

    return res.status(200).json({
      message: "Usuário excluído com sucesso.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno do servidor.",
      error
    });
  }
}