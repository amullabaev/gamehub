import { Router } from "express";

const router = Router()

router.get("/", async (req, res) => {
    res.send("Users API is working");
})

export default router;