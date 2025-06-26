import {useQuery} from '@tanstack/react-query';
import {postUserRegister, TypeUserRegisterRequest, TypeUserRegisterResponse} from '@/apis/user';
import {useState} from 'react';
import {ApiResponse} from '@/apis/instance/APIClient';

export const useUserJoin = () => {
  const [data, setData] = useState<TypeUserRegisterRequest>({} as TypeUserRegisterRequest);
  const [result, setResult] = useState<ApiResponse<TypeUserRegisterResponse>>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [shouldFetch, setShouldFetch] = useState(false);

  const fetchPostUserRegister = async () => {
    try {
      const response = await postUserRegister(data);
      console.log('response', response?.code);
      if (response?.code) {
        setResult(response.result as ApiResponse<TypeUserRegisterResponse>);
        setIsSuccess(true);
        setIsError(false);
      }
      return response;
    } catch {
      setShouldFetch(false);
      setIsSuccess(false);
      setIsError(true);
    }
  };

  useQuery({
    queryKey: ['user-join'],
    queryFn: fetchPostUserRegister,
    enabled: shouldFetch && data.email !== '',
  });

  return {
    result,
    setData,
    isSuccess,
    isError,
    setShouldFetch,
  };
};
