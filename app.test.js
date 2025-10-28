const request = require("supertest");
const app = require("./app");

describe("GitHub Workflow Demo App", () => {
  describe("GET /", () => {
    it("should return welcome message", async () => {
      const response = await request(app).get("/");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Welcome to GitHub Workflow Demo - test123!"
      );
      expect(response.body).toHaveProperty("version", "1.0.0");
      expect(response.body).toHaveProperty("timestamp");
    });
  });

  describe("GET /health", () => {
    it("should return health status", async () => {
      const response = await request(app).get("/health");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("status", "healthy");
      expect(response.body).toHaveProperty("uptime");
      expect(response.body).toHaveProperty("timestamp");
    });
  });

  describe("GET /api/demo", () => {
    it("should return demo API response", async () => {
      const response = await request(app).get("/api/demo");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "This is a demo API endpoint"
      );
      expect(response.body).toHaveProperty("success", true);
      expect(response.body.data).toHaveProperty("features");
      expect(Array.isArray(response.body.data.features)).toBe(true);
    });
  });

  describe("POST /api/calculate", () => {
    it("should add two numbers correctly", async () => {
      const response = await request(app)
        .post("/api/calculate")
        .send({ operation: "add", a: 5, b: 3 });

      expect(response.status).toBe(200);
      expect(response.body.result).toBe(8);
      expect(response.body.operation).toBe("add");
    });

    it("should subtract two numbers correctly", async () => {
      const response = await request(app)
        .post("/api/calculate")
        .send({ operation: "subtract", a: 10, b: 4 });

      expect(response.status).toBe(200);
      expect(response.body.result).toBe(6);
    });

    it("should multiply two numbers correctly", async () => {
      const response = await request(app)
        .post("/api/calculate")
        .send({ operation: "multiply", a: 6, b: 7 });

      expect(response.status).toBe(200);
      expect(response.body.result).toBe(42);
    });

    it("should divide two numbers correctly", async () => {
      const response = await request(app)
        .post("/api/calculate")
        .send({ operation: "divide", a: 15, b: 3 });

      expect(response.status).toBe(200);
      expect(response.body.result).toBe(5);
    });

    it("should handle division by zero", async () => {
      const response = await request(app)
        .post("/api/calculate")
        .send({ operation: "divide", a: 10, b: 0 });

      expect(response.status).toBe(200);
      expect(response.body.result).toBe("Cannot divide by zero");
    });

    it("should return error for invalid input", async () => {
      const response = await request(app)
        .post("/api/calculate")
        .send({ operation: "add", a: "invalid", b: 3 });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });

    it("should return error for unsupported operation", async () => {
      const response = await request(app)
        .post("/api/calculate")
        .send({ operation: "power", a: 2, b: 3 });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("404 handling", () => {
    it("should return 404 for unknown endpoints", async () => {
      const response = await request(app).get("/unknown-endpoint");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error", "Endpoint not found");
    });
  });

  describe("Error handling", () => {
    it("should handle server errors gracefully", async () => {
      // This test simulates an error by making a request to an endpoint that throws
      // Note: In a real app, you might need to mock an error condition
      const response = await request(app)
        .post("/api/calculate")
        .send({ operation: "add", a: "not-a-number", b: 3 });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });
});
