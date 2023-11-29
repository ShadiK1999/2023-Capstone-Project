import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoginPanel } from './LoginPanel';
import { MemoryRouter } from 'react-router-dom';

describe('Matches DOM Snapshot', () => {
  it('Matches DOM Snapshot', () => {
    const tree = render(
      <MemoryRouter>
        <LoginPanel onClose={() => void 0} />
      </MemoryRouter>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('Does not allow empty field values', async () => {
    const { getByText, findByText } = render(
      <MemoryRouter>
        <LoginPanel onClose={() => void 0} />
      </MemoryRouter>,
    );
    fireEvent.click(getByText('Login'));
    expect(await findByText('Please enter your login email.')).toBeInTheDocument();
    expect(await findByText('Please enter your password.')).toBeInTheDocument();
  });

  it('Does not allow invalid email format', async () => {
    const { getByText, findByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <LoginPanel onClose={() => void 0} />
      </MemoryRouter>,
    );
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test' } });
    fireEvent.click(getByText('Login'));
    expect(await findByText('Must be a valid email.')).toBeInTheDocument();
  });
});
