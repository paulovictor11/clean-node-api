module.exports = {
  collectCoverageFrom: ['**/src/**/*.js'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: '@shelf/jest-mongodb',
  watchPathIgnorePatterns: ['globalConfig']
  /* testing */
}
