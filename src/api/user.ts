export const loginKaKao = () => {
  const link = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_KEY}&scope=talk_message,profile_nickname,profile_image&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT}`;
  window.location.href = link;
};

export const getKakaoProfile = async (code: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/oauth/kakao?code=${code}&redirect-uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};
