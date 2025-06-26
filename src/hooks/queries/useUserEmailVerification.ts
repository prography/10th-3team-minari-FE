import {useQuery} from '@tanstack/react-query';
import {postEmailVerification} from '@/apis/user';
import {useState} from 'react';

// 이메일 인증번호 전송
export const useUserEmailVerification = (email: string) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [shouldFetch, setShouldFetch] = useState(false);

  const fetchPostEmailVerification = async () => {
    const response = await postEmailVerification(email);
    if (response?.code === '200') {
      setIsError(false);
    } else {
      setIsError(true);
    }
    return response;
  };

  useQuery({
    queryKey: ['user-email-verification'],
    queryFn: fetchPostEmailVerification,
    enabled: shouldFetch && email !== null && email !== '',
  });

  return {
    isError,
    setShouldFetch,
  };
};
