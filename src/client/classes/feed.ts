import { AxiosResponse } from "axios";
import { LAWG_API_URL } from "../../lib/constants";
import { CreateLog, UpdateLog } from "../../types/log";
import request from "../../utils/request";

export default class Feed {
  private readonly token: string;
  private readonly project: string;
  private readonly ua: string | undefined;
  private readonly feedName: string;

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
  }

  /**
   * Get all logs of a feed
   * @returns Response Data
   */
  public async fetchLogs(): Promise<AxiosResponse> {
    return await request(
      `${LAWG_API_URL}/projects/${this.project}/feeds/${this.feedName}/logs`,
      {
        method: "get",
        token: this.token,
      }
    );
  }

  /**
   * Create a new log
   * @param options
   * @returns Response Data
   */
  public async log(options: CreateLog): Promise<AxiosResponse> {
    return await request(
      `${LAWG_API_URL}/projects/${this.project}/feeds/${this.feedName}/logs`,
      {
        ua: options.metadata?.ua ?? this.ua,
        method: "post",
        token: this.token,
        data: options,
      }
    );
  }

  /**
   * Get an existing log
   * @param options
   * @returns Response Data
   */
  public async fetchLog(options: { id: string }): Promise<AxiosResponse> {
    return await request(
      `${LAWG_API_URL}/projects/${this.project}/feeds/${this.feedName}/logs/${options.id}`,
      {
        method: "get",
        token: this.token,
      }
    );
  }

  /**
   * Edit an existing log using an ID param or latest log ID
   * @param id
   * @param options
   * @returns Response Data
   */
  public async editLog(options: UpdateLog): Promise<AxiosResponse> {
    const { id, ...data } = options;

    return await request(
      `${LAWG_API_URL}/projects/${this.project}/feeds/${this.feedName}/logs/${id}`,
      {
        method: "patch",
        token: this.token,
        data,
      }
    );
  }

  /**
   * Delete an existing log using an ID param or latest log ID
   * @param id
   * @param options
   * @returns Response Data
   */
  public async deleteLog(options: { id: string }): Promise<AxiosResponse> {
    return await request(
      `${LAWG_API_URL}/projects/${this.project}/feeds/${this.feedName}/logs/${options.id}`,
      {
        method: "delete",
        token: this.token,
      }
    );
  }
}
