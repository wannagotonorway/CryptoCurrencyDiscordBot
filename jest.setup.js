// Jest setup file
process.env.NODE_ENV = 'test';

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock environment variables
process.env.DISCORD_TOKEN = 'test-token';
process.env.COIN_ID = 'bitcoin';
process.env.PREFERRED_CURRENCY = 'usd';
process.env.CURRENCY_SYMBOL = '$';
process.env.UPDATE_FREQUENCY = '1';

// Global test timeout
jest.setTimeout(10000);
