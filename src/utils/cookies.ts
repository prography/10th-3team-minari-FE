'use server';
import {cookies} from 'next/headers';

type CookieOptions = {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'lax' | 'strict' | 'none';
  path?: string;
  maxAge?: number;
};
export async function setCookie(
  key: string,
  value: string,
  options?: CookieOptions,
): Promise<string> {
  return JSON.stringify(
    (await cookies()).set({
      name: key,
      value,
      httpOnly: options?.httpOnly ?? true,
      secure: options?.secure ?? true,
      sameSite: options?.sameSite ?? 'lax',
      path: options?.path ?? '/',
      maxAge: options?.maxAge ?? 60 * 60 * 24 * 1, // 기본 1일
    }),
  );
}

export async function getCookie(key: string) {
  return (await cookies()).get(key)?.value.toString();
}

export async function deleteCookie(key: string) {
  (await cookies()).delete(key);
}
