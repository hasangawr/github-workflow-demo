const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to GitHub Workflow Demo - test123!",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API endpoint for demo
app.get("/api/demo", (req, res) => {
  res.json({
    message: "This is a demo API endpoint",
    success: true,
    data: {
      features: [
        "CI/CD",
        "GitHub Actions",
        "Automated Testing",
        "EC2 Deployment",
      ],
      stage: process.env.STAGE || "development",
    },
  });
});

// Simple calculator endpoint for testing
app.post("/api/calculate", (req, res) => {
  const { operation, a, b } = req.body;

  if (!operation || typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({
      error: "Invalid input. Please provide operation and two numbers.",
    });
  }

  let result;
  switch (operation) {
    case "add":
      result = a + b;
      break;
    case "subtract":
      result = a - b;
      break;
    case "multiply":
      result = a * b;
      break;
    case "divide":
      result = b !== 0 ? a / b : "Cannot divide by zero";
      break;
    default:
      return res.status(400).json({
        error: "Unsupported operation. Use: add, subtract, multiply, divide",
      });
  }

  res.json({
    operation,
    a,
    b,
    result,
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    path: req.originalUrl,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API demo: http://localhost:${PORT}/api/demo`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
  });
});

module.exports = app;
