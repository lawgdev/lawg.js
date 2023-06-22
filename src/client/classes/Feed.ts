import axios from "axios";
import { LAWG_API_URL } from "../../lib/constants";
import HTTPResponseError from "../../lib/error";
import CreateLog from "../../types/create";

export default class Feed {
  private readonly token: string;
  private readonly project: string;
  private readonly feedName: string;

  constructor(token: string, project: string, feedName: string) {
    this.token = token;
    this.project = project;
    this.feedName = feedName;
  }

  public async create(options: CreateLog): Promise<boolean> {
    const { title, description, ...data } = options;

    const response = await axios.post(
      `${LAWG_API_URL}/projects/${this.project}/feeds/${this.feedName}/logs`,
      {
        title,
        description,
        ...data,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: this.token,
        },
      }
    );
    if (response.status !== 200) {
      throw new HTTPResponseError(
        response.status,
        response.statusText,
        response.data
      );
    }
    return true;
  }
}
