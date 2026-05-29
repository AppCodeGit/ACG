import { Server as SocketServer } from "socket.io";
import { Server as HTTPServer } from "http";

let io: SocketServer;

export const initSocket = (server: HTTPServer) => {
  console.log("Initializing Socket.io...");
  
  io = new SocketServer(server, {
    cors: {
      origin: ["http://localhost:3000", "http://localhost:5000"],
      credentials: true,
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
    },
    transports: ['websocket', 'polling'],
    allowEIO3: true,
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  io.engine.on("connection_error", (err) => {
    console.log("Connection error:", err);
  });

  io.on("connection", (socket) => {
    console.log("✅ Admin connected:", socket.id);

    socket.on("join-admin", (adminId: number) => {
      socket.join(`admin-${adminId}`);
      console.log(`✅ Admin ${adminId} joined their room`);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Admin disconnected:", socket.id, "Reason:", reason);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  } 
  return io;
};