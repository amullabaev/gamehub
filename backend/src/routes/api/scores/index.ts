import express from "express";
import clickerRoutes from "./clicker";
import { getAllScores, getScoreById } from "./controller";
const router = express.Router();

router.use("/clicker", clickerRoutes);

router.get('/', getAllScores)

router.get('/:id', getScoreById)


export default router;
