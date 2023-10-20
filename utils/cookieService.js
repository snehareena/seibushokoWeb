import Cookies from 'js-cookie';

const TOKEN_COOKIE = 'access_token';

export const setToken = (token) => {
  // const expirationTime = 1/1440;
  Cookies.set(TOKEN_COOKIE, token, {expires: 540/1440, secure: true});
};

export const getToken = () => {
  return Cookies.get(TOKEN_COOKIE);
};

export const clearToken = () => {
  Cookies.remove(TOKEN_COOKIE);
};