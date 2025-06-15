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

app.post("/api/score/save/clicker", async (req, res) => {
  const { score, timestamp } = req.body;

  if (typeof score !== "number" || typeof timestamp !== "string") {
    return res.status(400).json({ error: "Invalid request body" });
  }

  try {
    const newClickerScore = await prisma.clickerScore.create({
      data: {
        score,
        timestamp: new Date(timestamp),
      },
    });
    res.status(201).json(newClickerScore);
  } catch (error) {
    console.error("Error saving clicker score:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/score/clicker", async (_req, res) => {
  try {
    const scores = await prisma.clickerScore.findMany({
      orderBy: {
        timestamp: "desc",
      },
    });
    res.json(scores);
  } catch (error) {
    console.error("Error fetching clicker scores:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.get("/api/score/clicker/:id", async (req, res) => {
//   const { id } = req.params;

//   if (!id) {
//     return res.status(400).json({ error: "ID parameter is required" });
//   }

//   try {
//     const score = await prisma.clickerScore.findUnique({
//       where: { id: parseInt(id, 10) },
//     });

//     if (!score) {
//       return res.status(404).json({ error: "Score not found" });
//     }

//     res.json(score);
//   } catch (error) {
//     console.error("Error fetching clicker score:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app.delete("/api/score/clicker/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID parameter is required" });
  }

  try {
    const deletedScore = await prisma.clickerScore.delete({
      where: { id: parseInt(id, 10) },
    });

    res.json(deletedScore);
  } catch (error) {
    console.error("Error deleting clicker score:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});