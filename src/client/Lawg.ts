import axios from "axios";
import CreateLog from "../types/create";
import { LAWG_API_URL } from "../lib/constants";
import HTTPResponseError from "../lib/error";
import Feed from "./classes/Feed";

export default class Lawg {
  private readonly token: string;
  private readonly project: string;

  constructor({ token, project }: { token: string; project: string }) {
    this.token = token;
    this.project = project;
  }

  public feed(feed_name: string): Feed {
    return new Feed(this.token, this.project, feed_name);
  }

   /**
   * Create a new log on Lawg
   * @param options
   * @returns true if successful
   */
  public async create(options: CreateLog): Promise<boolean> {
    const { feed, ...data } = options;

    await axios({
      url: `${LAWG_API_URL}/projects/${this.project}/feeds/${feed}/logs`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token,
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

    return true;
  }
}
