import type { PrismaClient } from "@prisma/client/extension";

// export const createClickerScoreController = (prisma: PrismaClient) => {
export default {
  getAllScores: async (req, res) => {
    try {
      const scores = await req.prisma.clickerScore.findMany({
        orderBy: { timestamp: "desc" },
      });
      res.json({ scores });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getScoresById: async (req, res) => {
    try {
      const { id } = req.params;
      const scores = await req.prisma.clickerScore.findUnique({
        where: {
          id: id
        }
      });
      res.json({ scores });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  saveScore: async (req, res) => {
    const { score } = req.body;

    if (typeof score !== "number") {
      return res.status(400).json({ error: "Invalid request body" });
    }

    try {
      const prisma: PrismaClient = req.prisma;
      const newClickerScore = await prisma.clickerScore.create({
        data: {
          score,
          timestamp: new Date(),
        },
      });
      res.status(201).json(newClickerScore);
    } catch (error) {
      console.error("Error saving clicker score:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  deleteScore: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID parameter is required" });
    }

    try {
      const prisma: PrismaClient = req.prisma;
      const deletedScore = await prisma.clickerScore.delete({
        where: { id: parseInt(id, 10) },
      });

      res.json(deletedScore);
    } catch (error) {
      console.error("Error deleting clicker score:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
// };

// export default createClickerScoreController;
