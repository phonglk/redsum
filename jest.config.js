module.exports = {
  roots: ['<rootDir>/test'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testRegex: 'spec\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary'],
  collectCoverageFrom: ['lib/**']
}
