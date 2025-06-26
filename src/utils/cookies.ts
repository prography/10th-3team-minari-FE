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
  return JSON.stringify((await cookies()).set(key, value, options));
}

export async function getCookie(key: string) {
  return (await cookies()).get(key)?.value.toString();
}
