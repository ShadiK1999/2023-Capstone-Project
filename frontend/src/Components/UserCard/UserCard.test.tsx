// eslint-disable-next-line import/named
import { render } from '@testing-library/react';
import { UserCard } from './UserCard';
import { describe, it, expect } from 'vitest';

describe('User Cards', () => {
  it('matches DOM Snapshot', () => {
    const tree = render(
      <UserCard name={'John Doe'} email={'jdoe@email.com'} phone={'0412345678'} />,
    );
    expect(tree).toMatchSnapshot();
  });

  it('Holds user info ', () => {
    const tree = render(
      <UserCard name={'John Doe'} email={'jdoe@email.com'} phone={'0412345678'} />,
    );
    expect(tree.getByText('John Doe')).toBeInTheDocument();
  });
});
