export const getRandomString = (length: number = 32): string => {
  if (length < 6 || length > 64) {
    throw new Error('길이는 6자에서 64자 사이여야 합니다.');
  }

  const CHAR_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  return Array.from(randomValues, (value) => CHAR_SET[value % CHAR_SET.length]).join('');
};
