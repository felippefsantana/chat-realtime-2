import { Request, Response } from "express";
import { z } from "zod";

export async function createChat(req: Request, res: Response) {
  const createChatSchema = z.object({
    name: z.string().trim(),
    slug: z.string(),
    members: z.array(z.string()).min(2),
  });
}

export async function findUserChats(req: Request, res: Response) {
  //
}

export async function findChat(req: Request, res: Response) {
  //
}
