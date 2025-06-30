import {redirect} from 'next/navigation';
import {ErrorMessage} from './type';
import {getCookie} from '@/utils/cookies';

// import {redirect} from 'next/navigation';

export type ApiResponse<T> = {
  code: string;
  result: T | null;
};

export type ErrorResponse = {
  code: string;
  result: string | null;
};

type Options = Omit<RequestInit, 'body'>;

type QueryParams<T = unknown> = {
  [K in keyof T]?: string | number | boolean | null | undefined;
};

type RequestOptions = Options & {
  queryParams?: QueryParams;
};

type CreateOptions = {
  baseURL: string;
} & Options;

class APIClient {
  private baseURL: string;
  private options: Options;

  constructor(options?: CreateOptions) {
    const {baseURL, ...rest} = options || {};
    this.baseURL = baseURL || '';
    this.options = rest;
  }

  public create(options?: CreateOptions) {
    return new APIClient(options);
  }

  public get<T>(url: string, options?: RequestOptions) {
    return this.request<T>(url, {
      method: 'GET',
      ...this.options,
      ...options,
    });
  }

  public post<T, D = unknown>(url: string, data?: D, options?: RequestOptions) {
    return this.request<T>(url, {
      method: 'POST',
      ...this.options,
      ...options,
      body: data instanceof FormData ? data : data ? JSON.stringify(data) : undefined,
    });
  }

  public patch<T, D = unknown>(url: string, data?: D, options?: RequestOptions) {
    return this.request<T>(url, {
      method: 'PATCH',
      ...this.options,
      ...options,
      body: data instanceof FormData ? data : data ? JSON.stringify(data) : undefined,
    });
  }

  public put<T, D = unknown>(url: string, data?: D, options?: RequestOptions) {
    return this.request<T>(url, {
      method: 'PUT',
      ...this.options,
      ...options,
      body: data instanceof FormData ? data : data ? JSON.stringify(data) : undefined,
    });
  }

  public delete<T>(url: string, options?: RequestOptions) {
    return this.request<T>(url, {
      method: 'DELETE',
      ...this.options,
      ...options,
    });
  }

  private constructURL(url: string, queryParams?: RequestOptions) {
    // baseURL과 url을 안전하게 붙이기 위해 슬래시 처리
    const trimmedBase = this.baseURL.replace(/\/+$/, '');
    const trimmedUrl = url.replace(/^\/+/, '');
    const fullUrl = new URL(`${trimmedBase}/${trimmedUrl}`);

    if (queryParams) {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(queryParams)) {
        if (value != null) {
          searchParams.append(key, String(value));
        }
      }
      fullUrl.search = searchParams.toString();
    }

    return fullUrl.href;
  }

  private buildHeaders(overrides?: HeadersInit, skipContentType = false): HeadersInit {
    const headers = {
      ...(this.options.headers || {}),
      ...(overrides || {}),
    } as Record<string, string>;

    if (skipContentType) {
      delete headers['Content-Type'];
    }

    return headers;
  }

  private async request<T>(
    url: string,
    options: RequestInit & {queryParams?: QueryParams},
  ): Promise<ApiResponse<T> | null> {
    const fullUrl = this.constructURL(url, options.queryParams);

    const isFormData = options.body instanceof FormData;
    const accessToken = await getCookie('accessToken');

    const headers = new Headers(this.buildHeaders(options.headers, isFormData));

    if (accessToken) {
      headers.set('Authorization', `${accessToken}`);
    }

    options.headers = headers;

    try {
      const response = await fetch(fullUrl, options);

      if (response.status === 204) {
        return null;
      }

      const responseData = await response.json();

      if (!response.ok) {
        throw responseData as ErrorResponse;
      }

      return responseData as ApiResponse<T>;
    } catch (error: unknown) {
      let errorCode = 'UNKNOWN';
      let errorMessage = null;

      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        typeof (error as ErrorResponse).code === 'string'
      ) {
        errorCode = (error as ErrorResponse).code;
        errorMessage = (error as ErrorResponse).result;
      }

      const message =
        errorCode in ErrorMessage
          ? ErrorMessage[errorCode as keyof typeof ErrorMessage]
          : errorMessage != null
            ? errorMessage
            : '알 수 없는 오류';

      const jwtErrorPrefix = /^JWT\d{3}$/;

      if (jwtErrorPrefix.test(errorCode)) {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('tokenExpired', {detail: message}));
        } else {
          redirect('/401');
        }
        throw new Error(message);
      }

      console.error(
        `======================`,
        `\n[APIClient] Error occurred (${errorCode}):`,
        `\n[API Method]: ${options.method}`,
        `\n[API Url]: ${fullUrl}`,
        `\n[Error Message]: ${message}`,
        `\n======================\n`,
      );

      throw new Error(message);
    }
  }
}

export const apiClient = new APIClient();
