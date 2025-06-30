import {useQuery} from '@tanstack/react-query';
import {postEmailVerification} from '@/apis/user';
import {useState} from 'react';

// 이메일 인증번호 전송
export const useUserEmailVerification = (email: string) => {
  const [isError, setIsError] = useState<boolean>(false);

  const refetchEmailVerification = async () => {
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
    queryFn: refetchEmailVerification,
    enabled: false,
  });

  return {
    refetchEmailVerification,
    isError,
  };
};
