import axios from "axios";
import { CreateLog, UpdateLog } from "../types/log";
import { CreateInsight, UpdateInsight } from "../types/insight";

interface Options {
  ua?: string | undefined;
  method: "get" | "post" | "patch" | "delete";
  token: string;
  data?: CreateLog | UpdateLog | CreateInsight | UpdateInsight;
}
export default async function request(
  url: string,
  options: Options
): Promise<void> {
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
