module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'tests/coverage',
  coverageReporters: ['text', 'lcov'],
  preset: '@testing-library/react-native',
  setupFilesAfterEnv: ['./src/jestSetupFile.ts'],
  testEnvironment: 'node',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?)/)',
  ],
};
