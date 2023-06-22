import { LAWG_API_URL } from "../lib/constants";
import { CreateInsight } from "../types/insight";
import sendAPICall from "../utils/sendAPICall";
import Feed from "./classes/feed";

export default class Lawg {
  private readonly token: string;
  private readonly project: string;
  private readonly ua?: string;

  constructor({ token, project, ua }: { token: string; project: string; ua?: string; }) {
    this.token = token;
    this.project = project;
    this.ua = ua;
  }

  public feed(feed_name: string): Feed {
    return new Feed(this.token, this.project, feed_name, this.ua);
  }

  /**
   * Create a new insight on Lawg
   * @param options
   * @returns Response Data
   */
  public async insight(options: CreateInsight): Promise<void> {
    return await sendAPICall(
      `${LAWG_API_URL}/projects/${this.project}/insights`,
      this.ua,
      'post',
      this.token,
      options,
    );
  }
}
