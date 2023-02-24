"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const controller_1 = require("./routes/controller");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.set('PORT', PORT);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(controller_1.router);
app.listen(PORT, () => {
    console.log("Server running on port: ", PORT);
});
