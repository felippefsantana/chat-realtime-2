import { prisma } from "@/lib/prisma";
import { Message } from "@prisma/client";
import { Job } from "bullmq";
import { getSocketIO } from "@/lib/socket";

export default {
  key: "SaveMessage",
  handle: async ({ data }: Job<Message>) => {
    const io = getSocketIO();

    const message = await prisma.message.create({
      data: {
        userId: data.userId,
        chatId: data.chatId,
        content: data.content,
      }
    });

    io.emit("receiveMessage", message);
    // io.to(chatId).emit("receiveMessage", message);

    return data;
  }
}
