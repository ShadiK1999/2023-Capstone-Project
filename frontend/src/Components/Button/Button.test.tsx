import { render } from '@testing-library/react';
import { Button } from './Button';
import { describe, it, expect } from 'vitest';

describe('Jest Snapshot testing suite', () => {
  it('Matches DOM Snapshot', () => {
    const tree = render(<Button onClick={() => void 0}>Hello</Button>);
    expect(tree).toMatchSnapshot();
  });
});
