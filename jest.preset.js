const nxPreset = require('@nx/jest/preset').default;

const testTimeout = process.env.CI ? 40000 : 5000;

module.exports = {
  ...nxPreset,
  testTimeout,
  reporters: [
    '@matteoh2o1999/github-actions-jest-reporter',
  ],
};
