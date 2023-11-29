import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthDispatchContext, JwtToken, useJwt } from '../../Contexts/Auth';
import jwt_decode from 'jwt-decode';

const AuthVerify = () => {
  const jwt = useJwt();
  const location = useLocation();
  const dispatch = useContext(AuthDispatchContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      const { exp } = jwt_decode<JwtToken>(jwt);

      if (exp * 1000 < Date.now()) {
        dispatch({
          type: 'USER_LOGGED_OUT',
        });
        navigate('/');
        alert('Your session has expired, please log in again');
      }
    }
  }, [dispatch, jwt, location, navigate]);

  return <></>;
};

export { AuthVerify };
