import { prisma } from "@/lib/prisma";
import { io } from "@/server";
import { Request, Response } from "express";
import { z, ZodError } from "zod";

export async function createMessage(req: Request, res: Response) {
  const createMessageSchema = z.object({
    content: z.string().min(1).trim(),
    chatId: z.string().min(1).trim(),
  });

  try {
    const { content, chatId } = createMessageSchema.parse(req.body);
    const { id } = req.user;

    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      }
    });

    if (!chat) {
      return res.status(404).json({
        message: "Chat não encontrado."
      });
    }

    const message = await prisma.message.create({
      data: {
        userId: id,
        chatId,
        content,
      }
    });

    if (!message) {
      return res.status(500).json({
        mesage: "Não foi possível criar a mensagem.",
      });
    }

    io.emit("receiveMessage", message);
    // io.to(chatId).emit("receiveMessage", message);

    return res.status(201).json({
      message: "Mensagem criada com sucesso.",
      data: message
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Dados inválidos.",
        error,
      });
    }

    return res.status(500).json({
      message: "Erro interno do servidor.",
      error
    });
  }
}