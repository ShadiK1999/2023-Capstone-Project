import { render } from '@testing-library/react';
import { IconButton } from './IconButton';
import { describe, it, expect } from 'vitest';

describe('Vitest Snapshot testing suite', () => {
  it('Matches DOM Snapshot', () => {
    const tree = render(<IconButton onClick={() => void 0}>Hello</IconButton>);
    expect(tree).toMatchSnapshot();
  });
});
