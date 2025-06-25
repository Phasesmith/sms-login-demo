import axios from 'axios';

const BASE_URL = '/api';

export const sendCode = (phoneOrEmail) => {
  return axios.post(`${BASE_URL}/send-code`, { target: phoneOrEmail });
};

export const loginWithPhone = (phone, code) => {
  return axios.post(`${BASE_URL}/login/phone`, { phone, code });
};

export const loginWithEmail = (email, code) => {
  return axios.post(`${BASE_URL}/login/email`, { email, code });
};

export const loginWithUsername = (username, password) => {
  return axios.post(`${BASE_URL}/login/username`, { username, password });
};