import axios, { AxiosResponse } from "axios";

interface LawgResponse<T extends unknown> {
  success: boolean;
  error?: {
    code: string;
    message: string;
  };
  data: T;
}

// Omit method so we can add strict typing
interface Options extends Record<string, unknown> {
  ua?: string | undefined;
  token?: string;
}

export default function restClient(
  token: string,
  baseUrl: string,
  defaultUa?: string
) {
  async function request<T = unknown>(
    method: "get" | "post" | "patch" | "delete",
    url: `/${string}`,
    body?: unknown,
    options?: Options
  ): Promise<{
    success: boolean;
    data?: T;
    error?: {
      code: string;
      message: string;
    };
  }> {
    try {
      return await axios<any, AxiosResponse<LawgResponse<T>>>({
        url: `${baseUrl}${url}`,
        method: method,
        headers: {
          ...options,
          "Content-Type": "application/json",
          "User-Agent": defaultUa ?? options?.ua,
          Authorization: token ?? options?.token,
        },
        data: body,
      })
        .then((response) => {
          return {
            success: true,
            data: response.data.data,
          };
        })
        .catch((error) => {
          return {
            success: false,
            error: {
              code:
                error?.response?.data?.error?.code ?? "internal_scoped_error",
              message:
                error.response?.data?.error?.message ??
                "An internal error occurred",
            },
          };
        });
    } catch (err) {
      return {
        success: false,
        error: {
          code: "internal_scoped_error",
          message: "An internal error occurred",
        },
      };
    }
  }

  return request;
}
