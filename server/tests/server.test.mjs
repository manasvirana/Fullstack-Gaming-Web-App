import request from "supertest";
import app from "../index.js"; // Ensure index.js exports default

test("GET /api should return 200", async () => {
  const response = await request(app).get("/api");
  expect(response.status).toBe(200);
});
