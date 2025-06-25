import {useQuery} from '@tanstack/react-query';
import {postEmailCodeVerification} from '@/apis/user';
import {useState} from 'react';

// 인증번호 검증
export const useUserEmailCodeVerification = () => {
  const [code, setCode] = useState('');
  const [isCodeError, setIsCodeError] = useState<boolean>(false);
  const [isCodeSuccess, setIsCodeSuccess] = useState<boolean>(false);
  const [shouldFetchCode, setShouldFetchCode] = useState(false);

  const fetchPostEmailCodeVerification = async () => {
    const response = await postEmailCodeVerification(code);
    if (response?.code === '200') {
      setIsCodeError(false);
      setIsCodeSuccess(true);
    } else {
      setIsCodeError(true);
      setIsCodeSuccess(false);
    }
    return response;
  };

  useQuery({
    queryKey: ['user-email-code-verification'],
    queryFn: fetchPostEmailCodeVerification,
    enabled: shouldFetchCode && code !== '',
  });

  return {
    code,
    setCode,
    isCodeError,
    isCodeSuccess,
    setShouldFetchCode,
  };
};
