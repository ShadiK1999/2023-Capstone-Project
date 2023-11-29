import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RegistrationPanel, errorMessages } from './RegistrationPanel';
import { MemoryRouter } from 'react-router-dom';

describe('Matches DOM Snapshot', () => {
  const {
    name,
    phoneNumber,
    email,
    emailValid,
    password,
    confirmPassword,
    terms,
    passwordsDontMatch,
  } = errorMessages;

  it('Matches DOM Snapshot', () => {
    const tree = render(
      <MemoryRouter>
        <RegistrationPanel onClose={() => void 0} />
      </MemoryRouter>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('Does not allow empty field values', async () => {
    const { getByText, findByText } = render(
      <MemoryRouter>
        <RegistrationPanel onClose={() => void 0} />
      </MemoryRouter>,
    );
    fireEvent.click(getByText('Submit'));
    expect(await findByText(name)).toBeInTheDocument();
    expect(await findByText(phoneNumber)).toBeInTheDocument();
    expect(await findByText(email)).toBeInTheDocument();
    expect(await findByText(password)).toBeInTheDocument();
    expect(await findByText(confirmPassword)).toBeInTheDocument();
    expect(await findByText(terms)).toBeInTheDocument();
  });

  it('Does not allow invalid email format', async () => {
    const { getByText, findByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <RegistrationPanel onClose={() => void 0} />
      </MemoryRouter>,
    );
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test' } });
    fireEvent.click(getByText('Submit'));
    expect(await findByText(emailValid)).toBeInTheDocument();
  });

  it('Does not allow mismatched passwords', async () => {
    const { getByText, findByText, getByPlaceholderText, getByRole, queryByText } = render(
      <MemoryRouter>
        <RegistrationPanel onClose={() => void 0} />
      </MemoryRouter>,
    );
    fireEvent.change(getByPlaceholderText('Full name'), { target: { value: 'John' } });
    fireEvent.change(getByPlaceholderText('Phone number'), { target: { value: '0427410907' } });
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@email.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: '123456' } });
    fireEvent.change(getByPlaceholderText('Confirm Password'), { target: { value: '1234567' } });
    fireEvent.click(getByRole('checkbox'));

    fireEvent.click(getByText('Submit'));
    expect(await findByText(passwordsDontMatch)).toBeInTheDocument();
    expect(queryByText(name)).not.toBeInTheDocument();
    expect(queryByText(phoneNumber)).not.toBeInTheDocument();
    expect(queryByText(email)).not.toBeInTheDocument();
    expect(queryByText(password)).not.toBeInTheDocument();
    expect(queryByText(terms)).not.toBeInTheDocument();
  });
});
