import httpRequest from '../services/httpRequest';

export const getOrderOfClient = async (current_page: number, per_page = 10) => {
  return httpRequest.get(`/orders?per_page=${per_page}&page=${current_page}`);
};
