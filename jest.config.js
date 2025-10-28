module.exports = {
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  testMatch: ["**/*.test.js"],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  collectCoverageFrom: ["app.js", "!node_modules/**", "!coverage/**"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
