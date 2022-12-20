import createSearchParams from '@/common/createSearchParams';
import httpRequest from '../services/httpRequest';

export const getAllBook = async (
  current_page: number,
  per_page = 10,
  searchFields = [],
  value = ''
) => {
  return httpRequest.get(
    `/admin/books?per_page=${per_page}&page=${current_page}${createSearchParams(
      searchFields,
      value
    )}`
  );
};
export const getAllBookClient = async () => {
  return httpRequest.get('/books?per_page=100');
};
export const filterBook = async ({
  genres = '',
  publishers = '',
  price = '',
  order_by = '',
  page = 1,
}: any) => {
  let params = '';
  if (genres) {
    if (params) params = params + '&genre=' + genres;
    else params = params + 'genre=' + genres;
  }
  if (publishers) {
    if (params) params = params + '&publisher=' + publishers;
    else params = params + 'publisher=' + publishers;
  }
  if (price) {
    if (params) params = params + '&price=' + price;
    else params = params + 'price=' + price;
  }
  if (order_by) {
    if (params) params = params + '&order_by=' + order_by;
    else params = params + 'order_by=' + order_by;
  }
  if (params) params = '?' + params + '&per_page=10&page=' + page;
  else params = '?per_page=10';
  return httpRequest.get(`/books${params}&page=` + page);
};
export const getBookDetailById = async (
  id: string | number | null | undefined
) => {
  return httpRequest.get(`books/${id}`);
};
export const editBook = async (
  id: string | number | undefined,
  data: FormData | any
) => {
  return httpRequest.post(`/admin/books/${id}`, data, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};
export const deleteBook = async (id: string | number | undefined) => {
  return httpRequest.delete(`/admin/books/${id}`);
};
export const createBook = async (data: FormData | any) => {
  return httpRequest.post('/admin/books', data, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};

export const getTopSelling = async () => {
  return httpRequest.get(`/books?per_page=5&page=1&order_by=top_selling`);
};

export const getRelateBook = async (genres = '') => {
  return httpRequest.get(`/books?per_page=10&page=1=&genre=${genres}`);
};

export const getListBookByGenre = async (genresid: any, slideToShow = 5) => {
  return httpRequest.get(
    `/books?per_page=${slideToShow}&page=1=&genre=${genresid}`
  );
};
