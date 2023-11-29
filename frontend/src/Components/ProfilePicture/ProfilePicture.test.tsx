import { ProfilePicture } from './ProfilePicture';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Vitest Snapshot testing suite', () => {
  it('Matches DOM Snapshot', () => {
    const tree = render(<ProfilePicture name={'john'} size="Small" />);
    expect(tree).toMatchSnapshot();
  });

  it('should contain initial', () => {
    const tree = render(<ProfilePicture name={'john'} size="Small" />);
    expect(tree.getByText('J')).toBeInTheDocument();
  });
});
