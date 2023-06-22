import axios from "axios";
import HTTPResponseError from "../lib/error";
import { CreateInsight } from "../types/insight";
import CreateLog, { UpdateLog } from "../types/log";

export default async function sendAPICall(
  url: string,
  method: 'get' | 'post' | 'patch' | 'delete',
  token: string,
  data?: CreateLog | CreateInsight | UpdateLog
) {
  return await axios({
    url,
    method,
    headers: {
      "Content-Type": "application/json",
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
