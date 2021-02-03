module.exports = {
  verbose: true,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', 'configs'],
  rootDir: 'src',
  testMatch: [
    '<rootDir>/tests/**/*.{js,jsx,ts,tsx}',
  ],
  // reporters: ['jest-stare'],
  testTimeout: 10000,
  testResultsProcessor: '../node_modules/jest-stare',
};