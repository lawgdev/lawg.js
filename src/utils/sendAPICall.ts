import axios from "axios";
import HTTPResponseError from "../lib/error";
import { CreateInsight } from "../types/insight";
import CreateLog from "../types/log";

export default async function sendAPICall(
  url: string,
  token: string,
  data: CreateLog | CreateInsight
) {
  return await axios({
    url,
    method: "post",
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
  });
}
