import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.listen(port, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`Server is running at http://localhost:${port}`);
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

const prisma = new PrismaClient();

app.get("/api/users", async (_req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});