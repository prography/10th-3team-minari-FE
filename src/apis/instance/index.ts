import {apiClient} from './APIClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_BASE_URL_ADMIN = process.env.NEXT_PUBLIC_API_URL_ADMIN;

if (!API_BASE_URL) {
  throw new Error('API_BASE_URL is not defined');
}
if (!API_BASE_URL_ADMIN) {
  throw new Error('API_BASE_URL_ADMIN is not defined');
}

export const fetch = apiClient.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    credentials: 'include',
  },
});

export const fetchAdmin = apiClient.create({
  baseURL: API_BASE_URL_ADMIN,
  headers: {
    'Content-Type': 'application/json',
    credentials: 'include',
  },
});
