import axios from 'axios';

/**
 * Vite exposes certain constants under the special import.meta.env object. 
 * These constants are defined as global variables during dev and 
 * statically replaced at build time to make tree-shaking effective.
 */
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getHealth = async () => {
  return api.get('/health');
};
