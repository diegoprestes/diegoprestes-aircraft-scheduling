import axios from 'axios';

export interface Pagination {
  limit: number;
  offset: number;
  total: number;
}

const api = axios.create({
  baseURL: 'https://infinite-dawn-93085.herokuapp.com'
});

export default api;
