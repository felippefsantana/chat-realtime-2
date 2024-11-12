import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

let io: SocketIOServer | null = null;

export const initSocket = (server: HttpServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket: Socket) => {
    console.log("Usuário conectado.");

    // Evento para o usuário se juntar a uma sala específica de chat
    socket.on("joinRoom", (chatId) => {
      socket.join(chatId);
      console.log(`Usuário ${socket.id} entrou no chat ${chatId}`);
    });

    // Evento para o usuário sair da sala
    socket.on("leaveRoom", (chatId) => {
      socket.leave(chatId);
      console.log(`Usuário ${socket.id} saiu do chat ${chatId}`);
    });

    socket.on("disconnect", () => {
      console.log("Usuário desconectado.");
    });
  });

  return io;
};

export const getSocketIO = (): SocketIOServer => {
  if (!io) {
    throw new Error("Socket.IO não foi inicializado");
  }
  return io;
};
