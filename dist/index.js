"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const socketio = __importStar(require("socket.io"));
const cors_1 = __importDefault(require("cors"));
const controller_1 = require("./routes/controller");
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const server = http.createServer(app);
const io = new socketio.Server(server, { cors: { origin: "*" } });
io.on("connection", (socket) => {
    socket.on("hello", () => {
        socket.emit("basicEmit", 5, "Rosyec", Buffer.from([3]));
    });
    socket.on("sendMessage", (message) => {
        socket.emit("message", message);
    });
});
dotenv_1.default.config();
const PORT = process.env.PORT;
app.set("PORT", PORT);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(controller_1.router);
server.listen(PORT, () => {
    console.log("Server running on port: ", PORT);
});
