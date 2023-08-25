import { Id } from ".";

export enum FeedType {
  EVENT,
  APPLICATION,
  INSIGHT,
}

type Feed = {
  id: Id<"feed">;
  project_id: Id<"project">;
  name: string;
  description: string | null;
  emoji: string | null;
  type: FeedType;
  order: number;
  onboarding: boolean;
};

export type { Feed };
