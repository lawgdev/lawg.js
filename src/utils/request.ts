import axios, { AxiosResponse } from "axios";

interface Options<T> {
  ua?: string | undefined;
  method: "get" | "post" | "patch" | "delete";
  token: string;
  data?: T;
}

const LAWG_API_URL = "http://100.105.87.12:8080/v1";

export default async function request<T>(
  url: string,
  options: Options<T>
): Promise<AxiosResponse<T>> {
  return await axios({
    url: `${LAWG_API_URL}/${url}`,
    method: options.method,
    headers: {
      "Content-Type": "application/json",
      "User-Agent":
        options.ua ?? "lawg.js; (+https://github.com/lawgdev/lawg.js)",
      Authorization: options.token,
    },
    data: {
      ...options.data,
    },
  })
    .then((response) => response.data)
    .catch((error) => error.response.data);
}
