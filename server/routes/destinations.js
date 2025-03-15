import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await req.app.locals.pool.query("SELECT * FROM destinations;");
        if (result.rows.length === 0) {
            return res.status(200).json({ message: "No destinations found" });
        }
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Database error", details: error.message });
    }
});


export default router;
