import { Id } from ".";
import { Comment } from "./event";

type Log = {
  id: Id<"log">;
  project_id: Id<"project">;
  feed_id: Id<"feed">;
  message: string;
  level: LogLevel;
  comments: Comment[];
  pinned: boolean;
};

enum LogLevel {
  INFO,
  WARN,
  ERROR,
}

export { LogLevel };
export type { Log };
