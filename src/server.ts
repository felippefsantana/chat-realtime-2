import { createServer } from "node:http";
import { env } from "./config/env";
import { getSocketIO, initSocket } from "./lib/socket";
import { redis } from "./lib/redis";
import app from "./app";

const server = createServer(app);

initSocket(server);

redis.subscribe("chat_messages", (err, count) => {
  if (err) {
    console.error("Falha ao se inscrever no canal chat_messages", err);
    return;
  }
  console.log(`Inscrito no canal chat_messages (${count} canais ativos)`);
});

redis.on("message", (channel, message) => {
  if (channel === "chat_messages") {
    const parsedMessage = JSON.parse(message);
    const { chatId } = parsedMessage;

    const io = getSocketIO();
    io.to(chatId).emit("receiveMessage", parsedMessage);
  }
});

server.listen(env.APP_PORT, () => {
  console.log(`Server is running on ${env.APP_URL}`);
});
