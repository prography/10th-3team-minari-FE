import {fetch} from './instance';
import {UserDomain, UserExperienceLevel} from '@/stores/userStore';
import {getCookie} from '@/utils/cookies';

export const loginKaKao = () => {
  const link = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_KEY}&scope=talk_message,profile_nickname,profile_image&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT}`;
  window.location.href = link;
};

// 카카오 로그인
export const getKakaoProfile = async (code: string) => {
  // const data = {
  //   code,
  //   redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT,
  // };
  const response = await fetch.get<TypeKakaoLoginResponse>(
    `/users/oauth/kakao?code=${code}&redirect-uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT}`,
  );
  if (response?.code === '200') {
    return response;
  } else {
    throw response;
  }
};

// 토큰 재발급
export const postRefreshToken = async () => {
  const token = await getCookie('refreshToken');
  return fetch.post<TypeRefreshTokenResponse>(`/users/token/refresh`, {refreshToken: token});
};

// 회원가입 > 이메일 인증
export const postEmailVerification = async (email: string) => {
  const data = {to: email, redirectUri: process.env.NEXT_PUBLIC_EMAIL_REDIRECT};
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
  const response = await fetch.post<{code: string; result: TypeUserRegisterResponse}>(
    `/users/join`,
    data,
  );
  return response;
};

// 사용자 조희
export const getUsers = async () => {
  const response = await fetch.get<UsersReponse>(`/users/me`);

  return response;
};

// 사용자 로그아웃

// 사용자 탈퇴
export const deleteUser = async () => {
  return await fetch.delete<string>(`/users/me`);
};

export interface UsersReponse {
  id: number;
  email: string;
  socialType: string;
  socialId: string;
  name: string;
  image: string;
  seed: number;
  domain: UserDomain;
  uuid: string;
}

export interface TypeKakaoLoginResponse {
  accessToken: string;
  refreshToken: string;
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
  isSubscribed: boolean | null;
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

export interface TypeRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
