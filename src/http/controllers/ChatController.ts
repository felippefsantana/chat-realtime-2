import { prisma } from "@/lib/prisma";
import { Request, Response } from "express";
import { z, ZodError } from "zod";

export async function createChat(req: Request, res: Response) {
  const createChatSchema = z.object({
    name: z.string().trim(),
    slug: z.string(),
    members: z.array(z.string()).min(1).max(50),
  });

  try {
    const { name, slug, members } = createChatSchema.parse(req.body);
    const { id } = req.user;

    const newChat = await prisma.chat.create({
      data: {
        name,
        slug,
        isGroup: members.length >= 2,
        members: {
          createMany: {
            data: [
              { userId: id },
              ...members.map(userId => ({ userId }))
            ]
          }
        }
      }
    });

    return res.status(201).json({
      mesage: "Chat criado com sucesso.",
      chat: newChat,
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

export async function findChat(req: Request, res: Response) {
  try {
    const { chatId } = req.params;
    const { id: userId } = req.user;

    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        members: {
          some: {
            userId
          }
        }
      },
      include: {
        members: {
          include: {
            user: true
          }
        }
      }
    });

    if (!chat) {
      return res.status(404).json({
        message: "Chat não encontrado."
      });
    }

    const result = {
      ...chat,
      members: chat.members.map((chatMembersRelation) => {
        const { user, joinedAt } = chatMembersRelation;

        return {
          ...user,
          joinedAt
        }
      }),
    }

    return res.status(200).json({
      chat: result
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno do servidor.",
      error
    });
  }
}

export async function findUserChats(req: Request, res: Response) {
  try {
    const { id: userId } = req.user;

    const chats = await prisma.chat.findMany({
      where: {
        members: {
          some: {
            userId
          }
        }
      },
    });

    return res.status(200).json({
      chats
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno do servidor.",
      error
    });
  }
}
