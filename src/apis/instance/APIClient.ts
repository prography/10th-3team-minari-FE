import {ErrorMessage} from './type';

// import {redirect} from 'next/navigation';

export type ApiResponse<T> = {
  code: string;
  result: T | null;
};

export type ErrorResponse = {
  code: string;
  result: null;
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
    const headers: Record<string, string> = {
      ...(this.options.headers as Record<string, string>),
      ...(options?.headers as Record<string, string>),
    };

    return this.request<T>(url, {
      method: 'GET',
      ...this.options,
      ...options,
      headers,
    });
  }

  public post<T, D = unknown>(url: string, data?: D, options?: RequestOptions) {
    const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;

    const headers = this.buildHeaders(options?.headers, isFormData);

    return this.request<T>(url, {
      method: 'POST',
      ...this.options,
      ...options,
      headers,
      body: isFormData ? data : data ? JSON.stringify(data) : undefined,
    });
  }

  public patch<T, D = unknown>(url: string, data?: D, options?: RequestOptions) {
    const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;

    const headers = this.buildHeaders(options?.headers, isFormData);

    return this.request<T>(url, {
      method: 'PATCH',
      ...this.options,
      ...options,
      headers,
      body: isFormData ? data : data ? JSON.stringify(data) : undefined,
    });
  }

  public put<T, D = unknown>(url: string, data?: D, options?: RequestOptions) {
    const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;

    const headers = this.buildHeaders(options?.headers, isFormData);

    return this.request<T>(url, {
      method: 'PUT',
      ...this.options,
      ...options,
      headers,
      body: isFormData ? data : data ? JSON.stringify(data) : undefined,
    });
  }

  public delete<T>(url: string, options?: RequestOptions) {
    const headers: Record<string, string> = {
      ...(this.options.headers as Record<string, string>),
      ...(options?.headers as Record<string, string>),
    };

    return this.request<T>(url, {
      method: 'DELETE',
      ...this.options,
      ...options,
      headers,
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

    try {
      const response = await fetch(fullUrl, options);

      if (response.status === 204) {
        return null;
      }

      // if (response.status >= 400) {
      //   if (response.status === 401) {
      //     redirect('/login');
      //   }
      //   const error: ErrorResponse = await response.json();
      //   throw error;
      // }

      const responseData = await response.json();

      if (!response.ok) {
        throw responseData as ErrorResponse;
      }

      return responseData as ApiResponse<T>;
    } catch (error: unknown) {
      let errorCode = 'UNKNOWN';

      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        typeof (error as ErrorResponse).code === 'string'
      ) {
        errorCode = (error as ErrorResponse).code;
      }

      const message =
        errorCode in ErrorMessage
          ? ErrorMessage[errorCode as keyof typeof ErrorMessage]
          : '알 수 없는 오류';

      console.error(`[APIClient] Error occurred (${errorCode}):`, `API_Url: ${fullUrl}`, message);

      throw new Error(message);
    }
  }
}

export const apiClient = new APIClient();
