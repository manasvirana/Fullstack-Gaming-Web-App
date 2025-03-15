import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
import destinationsRoutes from "./routes/destinations.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure DATABASE_URL is loaded
if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is missing in .env file!");
    process.exit(1); // Stop the server if DB URL is missing
}

// Create a database pool to be used in routes
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes("localhost") 
        ? false  // If localhost, don't use SSL
        : { rejectUnauthorized: false },  // If using Railway, use SSL
});


// Make pool available to other modules
app.locals.pool = pool;

// Middleware
app.use(express.json()); // For parsing JSON request bodies
app.use(
    cors({
        origin: "http://localhost:5173", // Frontend URL
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

// URL cleaning middleware to handle newline characters
app.use((req, res, next) => {
    if (req.url.includes('%0A')) {
        req.url = req.url.replace(/%0A/g, '');
    }
    next();
});

// Logging middleware - place BEFORE routes
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// Test API route - explicitly defined BEFORE other routes
app.get("/api/test", (req, res) => {
    console.log("Main test API route hit!");
    res.status(200).json({ message: "Main API test endpoint is working!" });
});

// Base API route
app.get("/api", (req, res) => {
    res.status(200).json({ message: "API is working!" });
});

// Routes
app.use("/api/destinations", destinationsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
});

// Handle 404 routes - must be AFTER all other routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Test API available at http://localhost:${PORT}/api/test`);
    console.log(`Destinations test API available at http://localhost:${PORT}/api/destinations/test`);
});

export { pool };