import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import apiRoutes from "./routes/api";
// import { createClickerScoreController } from "./routes/api/scores/clicker/controller";

// Extend Express Request interface to include prisma
declare global {
  namespace Express {
    interface Request {
      prisma: PrismaClient;
    }
  }
}

dotenv.config();

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3001;
const router = express.Router();

app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

// app.use("/api/scores/clicker", createClickerScoreController(prisma));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/users", async (_req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(port, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`Server is running at http://localhost:${port}`);
  }
});

export default app;
