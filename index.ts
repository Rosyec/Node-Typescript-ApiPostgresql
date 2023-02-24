import express from "express";
import cors from "cors";
import { router } from "./routes/controller";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.set('PORT', PORT);

app.use(express.json());

app.use(cors());

app.use(router);

app.listen( PORT ,() => {
    console.log("Server running on port: ", PORT);
} );