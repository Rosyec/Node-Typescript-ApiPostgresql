import express from "express";
import * as http from "http";
import * as socketio from "socket.io";
import cors from "cors";
import { router } from "./routes/controller";
import dotenv from "dotenv";

const app = express();

const server = http.createServer(app);

const io = new socketio.Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("hello", () => {
    socket.emit("basicEmit", 5, "Rosyec", Buffer.from([3]));
  });
  socket.on("sendMessage", (message) => {
    socket.emit("message", message);
  });
});

dotenv.config();

const PORT = process.env.PORT;

app.set("PORT", PORT);

app.use(express.json());

app.use(cors());

app.use(router);

server.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
});

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  message: (message: string) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
  sendMessage: (message: string) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}
