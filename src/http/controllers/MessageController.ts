import { prisma } from "@/lib/prisma";
import { Request, Response } from "express";
import { z, ZodError } from "zod";
import queue from "@/lib/queue";

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

    queue.add("SaveMessage", "save new message", {
      userId: id,
      chatId,
      content,
    });

    return res.status(202).json({
      message: "Mensagem enfileirada com sucesso."
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

export async function findMessages(req: Request, res: Response) {
  try {
    const { chatId } = req.params;
    const messages = await prisma.message.findMany({
      where: {
        chatId
      },
      take: 50,
      orderBy: {
        createdAt: "desc"
      }
    });

    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno do servidor.",
      error
    });
  }
}
