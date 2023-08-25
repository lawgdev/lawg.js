type PikaIds =
  | "user"
  | "project"
  | "feed"
  | "event"
  | "lawg"
  | "device"
  | "session"
  | "pm"
  | "log"
  | "comment"
  | "activity"
  | "plugin"
  | "webhook"
  | "group"
  | "insight";

type Id<T extends PikaIds> = `${T}_${string}`;

type User = {
  id: Id<"user">;
  username: string;
  icon: string | null;
  email: string;
};

export type { User, Id, PikaIds };
