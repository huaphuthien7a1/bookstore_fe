import { ORDERS } from '../../constants/queryKeyName';
import { useQuery } from 'react-query';
import { getOrderOfClient } from '@/apis/order.api';

const useGetListOrder = (current_page: number, per_page = 10) => {
  const getListQuery: any = useQuery(
    ORDERS,
    () => getOrderOfClient(current_page, per_page),
    {
      refetchOnMount: true,
      keepPreviousData: true,
      retry: 3,
      retryDelay: 3000,
    }
  );

  return getListQuery;
};

export default useGetListOrder;
