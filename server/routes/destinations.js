import express from "express";


const router = express.Router();


router.get("/test", (req, res) => {
    console.log("GET /api/destinations/test hit successfully!");
    res.json({ message: "Destinations API test endpoint is working!" });
});


router.get("/", async (req, res, next) => {
    try {
        const pool = req.app.locals.pool;
        console.log("Fetching destinations from DB...");
        const result = await pool.query("SELECT * FROM destinations;");
        console.log(`Data fetched: ${result.rows.length} destinations`);
        res.json(result.rows);
    } catch (error) {
        console.error("Database Error:", error);
        next(error);
    }
});

router.get("/questions", async (req, res) => {
    try {
        const { rows } = await req.app.locals.pool.query(
            "SELECT * FROM questions ORDER BY RANDOM() LIMIT 10;"
        );
        res.json(rows);
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



router.get("/:id", async (req, res, next) => {
    try {
        const pool = req.app.locals.pool;
        const { id } = req.params;
        console.log(`Fetching destination with ID: ${id}`);
        const result = await pool.query("SELECT * FROM destinations WHERE id = $1;", [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Destination not found" });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Database Error:", error);
        next(error);
    }
});

export default router;