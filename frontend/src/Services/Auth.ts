import { Result } from './CommonTypes';

export type RegisterRequest = {
  name: string;
  phoneNumber: string;
  password: string;
  email: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

type LoginBackendResponse = {
  token: string;
  userId: string;
};
type LoginResponse = Result<string>;
type RegisterResponse = Result<undefined>;

export const login = async ({ email, password }: LoginRequest): Promise<LoginResponse> => {
  const body = {
    email,
    password,
  };

  const response = await fetch('api/auth/login', {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (response.ok) {
    const jwt = (await response.json()) as LoginBackendResponse;
    return { value: jwt.token, ok: true };
  }

  return { ok: false, error: 'Wrong email or password' };
};

export const register = async ({
  email,
  password,
  name,
  phoneNumber,
}: RegisterRequest): Promise<RegisterResponse> => {
  const body = {
    email,
    password,
    name,
    phoneNumber,
  };

  const response = await fetch('api/users', {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (response.ok) {
    return { ok: true, value: undefined };
  }

  return {
    ok: false,
    // TODO: probably get an actual error message from the backend
    error: 'You have already created an account with this email, please try logging in',
  };
};
