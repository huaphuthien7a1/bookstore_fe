import createSearchParams from '@/common/createSearchParams';
import httpRequest from '../services/httpRequest';

export const getAllGenre = async (
  current_page: number,
  per_page = 10,
  searchFields = [],
  value = ''
) => {
  return httpRequest.get(
    `/admin/genres?per_page=${per_page}&page=${current_page}${createSearchParams(
      searchFields,
      value
    )}`
  );
};
export const getAllGenreClient = async () => {
  return httpRequest.get('/genres?per_page=100');
};
export const editGenre = async (
  id: string | number | undefined,
  data: { [key: string]: any }
) => {
  return httpRequest.put(`/admin/genres/${id}`, data);
};
export const deleteGenre = async (id: string | number | undefined) => {
  return httpRequest.delete(`/admin/genres/${id}`);
};
export const createGenre = async (data: { [key: string]: any }) => {
  return httpRequest.post('/admin/genres', data);
};
