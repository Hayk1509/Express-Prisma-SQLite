import * as dotenv from "dotenv";

import express, { Request, Response } from "express";

import { authorRouter } from "./author/author.router";
import cors from "cors";

dotenv.config();

if(!process.env.PORT){
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();
app.use(cors());

app.use(express.json());

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
app.use("/api/authors",authorRouter)