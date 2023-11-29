import { describe, expect, it } from 'vitest';
import { chunks } from './chunks';

describe('chunks', () => {
  it('should split into chunks', () => {
    const input = [1, 2, 3, 4, 5, 6, 7];

    const chunk = [...chunks(input, 2)];

    expect(chunk).toStrictEqual([[1, 2], [3, 4], [5, 6], [7]]);
  });

  it('should not split into chunks', () => {
    const input = [1, 2, 3, 4, 5, 6, 7];

    const chunk = [...chunks(input, 8)];

    expect(chunk).toStrictEqual([[1, 2, 3, 4, 5, 6, 7]]);
  });
});
