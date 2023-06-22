import { LAWG_API_URL } from "../../lib/constants";
import { CreateLog, UpdateLog } from "../../types/log";
import sendAPICall from "../../utils/sendAPICall";

export default class Feed {
  private readonly token: string;
  private readonly project: string;
  private readonly ua: string | undefined;
  private readonly feedName: string;
  private readonly latestLogId: string | null;

  constructor(
    token: string,
    project: string,
    feedName: string,
    ua: string | undefined
  ) {
    this.token = token;
    this.project = project;
    this.ua = ua;
    this.feedName = feedName;
    this.latestLogId = null;
  }

  /**
   * Get all logs of a feed
   * @returns Response Data
   */
  public async logs(): Promise<void> {
    return await sendAPICall(
      `${LAWG_API_URL}/projects/${this.project}/feeds/${this.feedName}/logs`,
      this.ua,
      "get",
      this.token
    );
  }

  /**
   * Create a new log on Lawg
   * @param options
   * @returns Response Data
   */
  public async log(options: CreateLog): Promise<void> {
    return await sendAPICall(
      `${LAWG_API_URL}/projects/${this.project}/feeds/${this.feedName}/logs`,
      this.ua,
      "post",
      this.token,
      options
    );
  }

  /**
   * Edit an existing log on Lawg using an ID param or latest log ID
   * @param id
   * @param options
   * @returns Response Data
   */
  public async editLog(id: string, options: UpdateLog): Promise<void> {
    const determineId = id === "latest" ? this.latestLogId : id;

    if (id === "latest" && this.latestLogId === null) {
      throw new Error("No log ID available for editing. Create a log first.");
    }

    return await sendAPICall(
      `${LAWG_API_URL}/projects/${this.project}/feeds/${this.feedName}/logs/${determineId}`,
      this.ua,
      "patch",
      this.token,
      options
    );
  }

  /**
   * Delete an existing log on Lawg using an ID param or latest log ID
   * @param id
   * @param options
   * @returns Response Data
   */
  public async deleteLog(id: string): Promise<void> {
    const determineId = id === "latest" ? this.latestLogId : id;

    if (id === "latest" && this.latestLogId === null) {
      throw new Error("No log ID available for editing. Create a log first.");
    }

    return await sendAPICall(
      `${LAWG_API_URL}/projects/${this.project}/feeds/${this.feedName}/logs/${determineId}`,
      this.ua,
      "delete",
      this.token
    );
  }
}
