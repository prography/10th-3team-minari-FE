import {useQuery} from '@tanstack/react-query';
import {deleteUser} from '@/apis/user';
import {useState} from 'react';

export const useUserDelete = () => {
  const [shouldFetchDelete, setShouldFetchDelete] = useState<boolean>(false);

  const result = useQuery({
    queryKey: ['user-delete'],
    queryFn: () => deleteUser(),
    enabled: shouldFetchDelete,
  });

  return {
    setShouldFetchDelete,
    result,
  };
};
