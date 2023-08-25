import restClient from "../utils/request";
import Feed from "./feed";

interface LawgOptions {
  token: string;
  project: string;
  ua?: string;
  apiBase?: string;
}

export default class Lawg {
  public readonly rest: ReturnType<typeof restClient>;
  public readonly ua: string;
  public readonly project: string;

  constructor({ token, project, ua, apiBase }: LawgOptions) {
    this.ua = ua ?? "lawg.js; (+https://github.com/lawgdev/lawg.js)";
    this.rest = restClient(
      token,
      apiBase ?? "https://api.lawg.dev/v1",
      this.ua
    );
    this.project = project;
  }

  public feed(feedName: string): Feed {
    return new Feed(this, feedName);
  }
}
