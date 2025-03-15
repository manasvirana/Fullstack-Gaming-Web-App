import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
import destinationsRoutes from "./routes/destinations.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is missing in .env file!");
    process.exit(1);
}

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 30000
});

app.locals.pool = pool;

pool.connect()
    .then(client => {
        console.log("✅ Database connected successfully");
        client.release();
    })
    .catch(err => {
        console.error("❌ Database connection error:", err);
    });

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:5173", "https://fullstack-gaming-web-app.vercel.app"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);

app.use((req, res, next) => {
    if (req.url.includes("%0A")) {
        req.url = req.url.replace(/%0A/g, "");
    }
    console.log(`➡️ Request: ${req.method} ${req.url}`);
    next();
});

app.get("/api/test", (req, res) => {
    res.status(200).json({ message: "✅ API is working!" });
});

app.get("/api", (req, res) => {
    res.status(200).json({ message: "✅ API root working!" });
});

app.get("/api/destinations", async (req, res) => {
    try {
        console.log("🔥 Fetching destinations...");
        const destinations = await pool.query("SELECT * FROM destinations");
        res.json(destinations.rows);
    } catch (err) {
        console.error("❌ Error fetching destinations:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
});

app.use("/api/destinations", destinationsRoutes);

app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
});

app.use((req, res) => {
    res.status(404).json({ error: "❌ Route not found" });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`🔗 Test API: http://localhost:${PORT}/api/test`);
    console.log(`🌍 Destinations API: http://localhost:${PORT}/api/destinations`);
});

export { pool };
