import { beforeEach, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { initialize, mockInstances } from '@anshulsanghi/googlemaps-vitest-mocks';

beforeAll(() => {
  initialize();
});
beforeEach(() => {
  mockInstances.clearAll();
});

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
