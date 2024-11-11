import { Message } from "@prisma/client"
import { Job } from "bullmq"

export default {
  key: "SaveMessage",
  handle: async ({ data }: Job<Message>) => {
    // lógica para salvar a message no banco

    // emitir evento para o client
    return data;
  }
}
