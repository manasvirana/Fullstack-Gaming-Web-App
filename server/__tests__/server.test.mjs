import request from "supertest";
import { app } from "../index.js";  // Import your Express app

// API Health Check
describe("🔍 API Health Check", () => {
    test("GET / should return 'Server is running!'", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message", "Server is running!");
    });

    test("GET /api/test should return API is working", async () => {
        const res = await request(app).get("/api/test");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message", "API is working!");
    });

    test("GET /api/nonexistent should return 404", async () => {
        const res = await request(app).get("/api/nonexistent");
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty("error", "Route not found");
    });
});

// Destinations API
describe("🌍 Destinations API", () => {
    test("GET /api/destinations should return a list of destinations", async () => {
        const res = await request(app).get("/api/destinations");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("POST /api/destinations should add a new destination", async () => {
        const newDestination = {
            name: "Paris",
            country: "France",
            clue: "The city of love and lights!"
        };

        const res = await request(app)
            .post("/api/destinations")
            .send(newDestination)
            .set("Accept", "application/json");

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("message", "Destination added successfully");
    });

    test("POST /api/destinations should fail for missing data", async () => {
        const res = await request(app).post("/api/destinations").send({});
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("error", "Missing required fields");
    });
});

// Error Handling
describe("❌ Error Handling", () => {
    test("GET /api/fail should return a 500 error", async () => {
        const res = await request(app).get("/api/fail");
        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty("error", "Internal Server Error");
    });
});
