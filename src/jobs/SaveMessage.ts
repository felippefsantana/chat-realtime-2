import { prisma } from "@/lib/prisma";
import { Message } from "@prisma/client";
import { Job } from "bullmq";
import { redis } from "@/lib/redis";

export default {
  key: "SaveMessage",
  handle: async ({ data }: Job<Message>) => {
    const message = await prisma.message.create({
      data: {
        userId: data.userId,
        chatId: data.chatId,
        content: data.content,
      }
    });

    await redis.publish("chat_messages", JSON.stringify(message));
  }
}
