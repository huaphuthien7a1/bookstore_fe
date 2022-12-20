import { ORDERS } from '../../constants/queryKeyName';
import { useQuery } from 'react-query';
import { getOrderOfClient } from '@/apis/order.api';

const useGetListOrder = () => {
  const getListQuery: any = useQuery(ORDERS, () => getOrderOfClient(), {
    refetchOnMount: true,
    keepPreviousData: true,
    retry: 3,
    retryDelay: 3000,
  });

  return getListQuery;
};

export default useGetListOrder;
