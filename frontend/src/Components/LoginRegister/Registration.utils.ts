import { Dispatch } from 'react';
import { LoginRequest, RegisterRequest, login, register } from '../../Services/Auth';
import { AuthAction } from '../../Contexts/Auth/reducer';

export async function handleRegister(
  request: RegisterRequest,
  dispatch: Dispatch<AuthAction>,
  navigate: (route: string) => void,
) {
  const response = await register(request);

  if (!response.ok) {
    return response.error;
  }

  // Register successful, let's login
  await handleLogin(request, dispatch, navigate);
}

export async function handleLogin(
  request: LoginRequest,
  dispatch: Dispatch<AuthAction>,
  navigate: (route: string) => void,
) {
  const loginResponse = await login(request);

  if (!loginResponse.ok) {
    return loginResponse.error;
  }

  dispatch({
    type: 'USER_LOGGED_IN',
    payload: loginResponse.value,
  });

  navigate('/user');
}
