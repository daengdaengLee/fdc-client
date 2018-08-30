import axios from 'axios';

const BASE_URL = '';

export const getTables = page => axios.get(`${BASE_URL}/tables/${page}`);
