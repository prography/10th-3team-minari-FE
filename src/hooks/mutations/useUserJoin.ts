import {useQuery} from '@tanstack/react-query';
import {postUserRegister, UserRegisterRequestType} from '@/apis/user';
import {useState} from 'react';

export const useUserJoin = () => {
  const [body, setBody] = useState<UserRegisterRequestType>({} as UserRegisterRequestType);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const fetchPostUserRegister = async () => {
    setIsSuccess(false);
    setIsError(false);
    let response;
    try {
      response = await postUserRegister(body);
      setIsSuccess(true);
    } catch (error) {
      response = error;
      setIsError(true);
    }
    return response;
  };

  const result = useQuery({
    queryKey: ['user-join'],
    queryFn: () => fetchPostUserRegister(),
    enabled: shouldFetch && body.email !== '',
  });
  const {data} = result;

  return {
    setBody,
    setShouldFetch,
    fetchPostUserRegister,
    data,
    isSuccess,
    isError,
  };
};
