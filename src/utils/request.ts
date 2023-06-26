import axios, { AxiosResponse } from "axios";
import { CreateLog, UpdateLog } from "../types/log";
import { CreateInsight } from "../types/insight";

interface Options {
  ua?: string | undefined;
  method: "get" | "post" | "patch" | "delete";
  token: string;
  data?: CreateLog | UpdateLog | CreateInsight | { value: { set?: string | number, increment?: number} };
}
export default async function request(
  url: string,
  options: Options
): Promise<AxiosResponse> {
  return await axios({
    url,
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