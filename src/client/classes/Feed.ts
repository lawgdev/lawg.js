import { LAWG_API_URL } from "../../lib/constants";
import CreateLog from "../../types/log";
import sendAPICall from "../../utils/sendAPICall";

export default class Feed {
  private readonly token: string;
  private readonly project: string;
  private readonly feedName: string;

  constructor(token: string, project: string, feedName: string) {
    this.token = token;
    this.project = project;
    this.feedName = feedName;
  }

  /**
   * Create a new log on Lawg
   * @param options
   * @returns true if successful
   */
  public async log(options: CreateLog): Promise<boolean> {
    await sendAPICall(
      `${LAWG_API_URL}/projects/${this.project}/feeds/${this.feedName}/logs`,
      this.token,
      options
    );

    return true;
  }
}
