import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
import destinationsRoutes from "./routes/destinations.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.DATABASE_URL) {
    console.error(" DATABASE_URL is missing in .env file!");
    process.exit(1);
}

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    max: 5,  // Limit connections
    idleTimeoutMillis: 30000, // Close idle connections after 30s
    connectionTimeoutMillis: 5000 // Fail fast if no connection
});


app.locals.pool = pool;

pool.connect()
    .then(client => {
        console.log("Database connected successfully");
        client.release();
    })
    .catch(err => {
        console.error("Database connection error:", err);
        process.exit(1);
    });

// Middleware
app.use(express.json());

app.use(
    cors({
        origin: [
            "http://localhost:5173", 
            "https://fullstack-gaming-web-app.vercel.app"
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);

// Debugging Middleware
app.use((req, res, next) => {
    if (req.url.includes("%0A")) {
        req.url = req.url.replace(/%0A/g, "");
    }
    console.log(`➡️ ${req.method} ${req.url}`);
    next();
});

// Test API Routes
app.get("/api/test", (req, res) => {
    res.status(200).json({ message: "API is working!" });
});

app.get("/api", (req, res) => {
    res.status(200).json({ message: "API root working!" });
});
// ✅ Root Route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running!" });
});

// Destinations Route
app.use("/api/destinations", destinationsRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
});
app.use(cors()); 


// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`🔗 Test API: http://localhost:${PORT}/api/test`);
    console.log(`🌍 Destinations API: http://localhost:${PORT}/api/destinations`);
});

export { pool };
