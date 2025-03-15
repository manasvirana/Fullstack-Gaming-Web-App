// Example (adapt to your actual database logic)
import express from "express";
import { pool } from "../index.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM destinations"); // Adjust query
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching destinations:", err);
        res.status(500).json({ error: "Failed to fetch destinations" });
    }
});

export default router;