import createSearchParams from '@/common/createSearchParams';
import httpRequest from '../services/httpRequest';

export const getAllAuthor = async (
  current_page: number,
  per_page = 10,
  searchFields = [],
  value = ''
) => {
  return httpRequest.get(
    `/admin/authors?per_page=${per_page}&page=${current_page}${createSearchParams(
      searchFields,
      value
    )}`
  );
};
export const getAllAuthorClient = async () => {
  return httpRequest.get('/authors?per_page=100');
};
export const editAuthor = async (
  id: string | number | undefined,
  data: { [key: string]: any }
) => {
  return httpRequest.put(`/admin/authors/${id}`, data);
};
export const deleteAuthor = async (id: string | number | undefined) => {
  return httpRequest.delete(`/admin/authors/${id}`);
};
export const createAuthor = async (data: { [key: string]: any }) => {
  return httpRequest.post('/admin/authors', data);
};
