import axios from "axios";
import HTTPResponseError from "../lib/error";
import { CreateLog, UpdateLog } from "../types/log";
import { CreateInsight } from "../types/insight";

export default async function sendAPICall(
  url: string,
  ua: string | undefined,
  method: 'get' | 'post' | 'patch' | 'delete',
  token: string,
  data?: CreateLog | UpdateLog | CreateInsight,
): Promise<void> {
  return await axios({
    url,
    method,
    headers: {
      "Content-Type": "application/json",
      "User-Agent": ua ?? "lawg.js; (+https://github.com/lawgdev/lawg.js)",
      Authorization: token,
    },
    data: {
      ...data,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw new HTTPResponseError(
        response.status,
        response.statusText,
        response.data
      );
    }

    return response.data;
  });
}
