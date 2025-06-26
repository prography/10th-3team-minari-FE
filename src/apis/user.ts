import {fetch} from './instance';
import {UserDomain, UserExperienceLevel} from '@/stores/userStore';

export const loginKaKao = () => {
  const link = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_KEY}&scope=talk_message,profile_nickname,profile_image&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT}`;
  window.location.href = link;
};

// 카카오 로그인
export const getKakaoProfile = async (code: string) => {
  const data = {
    code,
    redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT,
  };
  const response = await fetch.post<TypeKakaoLoginResponse>(`/users/oauth/kakao`, data);
  if (response?.code === '200') {
    return response;
  } else {
    throw response;
  }
};

// 회원가입 > 이메일 인증
export const postEmailVerification = async (email: string) => {
  const data = {to: email, redirectUri: process.env.NEXT_PUBLIC_EMAIL_REDIRECT + `?email=${email}`};
  try {
    const response = await fetch.post<string>(`/users/mail-verification`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

// 회원가입 > 인증번호 검증
export const postEmailCodeVerification = async (code: string) => {
  return await fetch.post<string>('/users/mail-verification/verify', {authCode: code});
};

// 회원가입 > 사용자 등록
export const postUserRegister = async (data: TypeUserRegisterRequest) => {
  try {
    const response = await fetch.post<{code: string; result: TypeUserRegisterResponse}>(
      `/users/join`,
      data,
    );
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

export interface TypeKakaoLoginResponse {
  accessToken: string;
  id: number;
  email: string;
  socialType: string;
  socialId: string;
  name: string;
  image: string;
  registered: boolean;
}
export interface TypeUserRegisterRequest {
  email: string | null;
  userId: string;
  isSubscribed: boolean;
  emailSendTime?: string;
  studyExperienceLevel: UserExperienceLevel;
  workExperienceLevel: UserExperienceLevel;
  domain: UserDomain;
}
export interface TypeUserRegisterResponse extends TypeUserRegisterRequest {
  id: number;
  socialId: number;
  name: string;
  image: string;
  isRegistered: boolean;
}
