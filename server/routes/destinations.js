import express from "express";
import { pool } from "../index.js";

const router = express.Router();


router.get("/test", (req, res) => {
    res.json({ message: "Destinations test API is working!" });
});


router.get("/", async (req, res) => {
    try {
        const destinations = await pool.query("SELECT * FROM destinations");
        res.json(destinations.rows);
    } catch (err) {
        console.error("Error fetching destinations:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
});

export default router;
