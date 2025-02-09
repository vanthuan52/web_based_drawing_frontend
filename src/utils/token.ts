import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant/string";

export const setToken = (accessToken: string) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
};

export const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const getToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN);
};

export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

export const isTokenExpired = (token: string) => {
  if (!token) return true;

  const payload = token.split(".")[1];
  if (!payload) return true;

  const decodedPayload = JSON.parse(atob(payload));

  // get expiration time
  const exp = decodedPayload.exp;

  // Compare with current time
  return exp * 1000 < Date.now();
};
