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
      branches: 70,
      functions: 65,
      lines: 70,
      statements: 70,
    },
  },
};
