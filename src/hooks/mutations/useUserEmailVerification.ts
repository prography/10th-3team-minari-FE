import {useQuery} from '@tanstack/react-query';
import {postEmailVerification} from '@/apis/user';

interface UseUserEmailVerificationProps {
  email: string;
}

// 이메일 인증번호 전송
export const useUserEmailVerification = ({email}: UseUserEmailVerificationProps) => {
  const fetchEmailVerification = async () => {
    const response = await postEmailVerification(email);
    return response;
  };

  const {data, isFetching, isLoading, refetch, isError} = useQuery({
    queryKey: ['user-email-verification'],
    queryFn: fetchEmailVerification,
    enabled: false,
  });

  return {
    data,
    isError,
    isFetching,
    isLoading,
    refetch,
    fetchEmailVerification,
  };
};
