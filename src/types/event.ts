import { Id, User } from ".";

type EventTags = Record<string, string | number>;

type EventMetadata = {
  /**
   * The user agent of the event
   *
   * @example
   * Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36
   */
  ua: string;
  /**
   * The tags of the event
   *
   * @example
   * ```json
   * {
   *  "user_id": 1,
   * }
   * ```
   */
  tags: EventTags;
};

type Event = {
  /**
   * The event ID
   *
   * @example
   * event_MjA0MzU5Nzg5NzM2MDM4NDA0
   */
  id: Id<"event">;

  /**
   * The project ID that the event belongs to
   *
   * @example
   * project_MjA0MzU5Nzg5NzM2MDM4NDA0
   */
  project_id: Id<"project">;
  /**
   * The feed ID that the event belongs to
   *
   * @example
   * feed_MjA0MzU5Nzg5NzM2MDM4NDA0
   */
  feed_id: Id<"feed">;
  /**
   * The event title
   *
   * @example
   * My event
   */
  title: string;
  /**
   * The event description
   *
   * @example
   * This is my event
   */
  description: string | null;
  /**
   * The event's emoji
   *
   * @example
   * 🐐
   */
  emoji: string | null;
  /**
   * When the event was deleted. If null, the event is not deleted.
   *
   * @example
   * 2023-08-11 01:15:58.359+00
   */
  deleted_at: string | null;
  /**
   * When the event expires
   *
   * @example
   * 2023-08-11 01:15:58.359+00
   */
  expires_at: string | null;
  /**
   * If the event is pinned or not.
   *
   * @example
   * true
   */
  pinned: boolean;
  /**
   * Metadata attached to the event, which includes the user agent and tags.
   */
  metadata: EventMetadata;
  /**
   * When the event was created
   *
   * @example
   * 2023-08-11 01:15:58.359+00
   */
  created_at: string;
  /**
   * The provider that triggered the event (null by default/if not applicable)
   *
   * @example
   * govee
   */
  provider: string | null;
  /**
   * The event timestamp if it was made in the future
   *
   * @example
   * 2023-08-11 01:15:58.359+00
   */
  timestamp?: string;
  /**
   * Activity of the event, includes event updates, comments, etc
   */
  activity: Activity[];
};

type Comment = ActivityMetadata<"COMMENT_CREATE">;

// These cant be shared with TwigEvents because most Twig Events aren't an activity and vice versa
type ActivityTypes =
  | "COMMENT_CREATE"
  | "PROJECT_ACCEPT_INVITATION"
  | "PROJECT_INVITE_MEMBER"
  | "PROJECT_UPDATE"
  | "PROJECT_REMOVE_MEMBER"
  | "PROJECT_REVOKE_INVITE"
  | "FEED_CREATE"
  | "FEED_DELETE"
  | "FEED_UPDATE"
  | "EVENT_CREATE"
  | "EVENT_DELETE"
  | "EVENT_UPDATE"
  | "LOG_DELETE"
  | "PLUGIN_CREATE"
  | "PLUGIN_DELETE"
  | "PLUGIN_UPDATE"
  | "WEBHOOK_CREATE"
  | "WEBHOOK_DELETE"
  | "WEBHOOK_UPDATE";

type Activity<T extends ActivityTypes = ActivityTypes> = {
  /**
   * The activity id
   *
   * @example
   * activity_MjA0MzU5Nzg5NzM2MDM4NDA0
   */
  id: Id<"activity">;
  /**
   * The project id
   *
   * @example
   * project_MjA0MzU5Nzg5NzM2MDM4NDA0
   */
  project_id: Id<"project">;
  /**
   * The feed id
   *
   * @example
   * feed_MjA0MzU5Nzg5NzM2MDM4NDA0
   */
  feed_id: Id<"feed"> | null;
  /**
   * The event id if applicable
   *
   * @example
   * event_MjA0MzU5Nzg5NzM2MDM4NDA0
   */
  event_id: Id<"event"> | null;
  /**
   * The log id if applicable
   *
   * @example
   * log_MjA0MzU5Nzg5NzM2MDM4NDA0
   */
  log_id: Id<"log"> | null;
  /**
   * The activity type
   *
   * @example
   * COMMENT_CREATE
   */
  type: T;
  /**
   * The user id that invoked the activity
   *
   * @example
   * user_MjA0MzU5Nzg5NzM2MDM4NDA0
   */
  created_by: Id<"user">;
  /**
   * The activity created at timestamp
   *
   * @example
   * 2023-08-11 01:15:58.359+00
   */
  created_at: string;
  /**
   * The user that invoked the activity
   */
  user: User;
  /**
   * The activity metadata if applicable
   */
  metadata: ActivityMetadata<T>;
};

type ActivityMetadata<T extends ActivityTypes = ActivityTypes> =
  T extends "COMMENT_CREATE"
    ? {
        /**
         * The comment id
         *
         * @example
         * comment_MjA0MzU5Nzg5NzM2MDM4NDA0
         */
        id: Id<"comment">;
        /**
         * The id of the attached event/log
         *
         * @example
         * event_MjA0MzU5Nzg5NzM2MDM4NDA0
         */
        object_id: Id<"event"> | Id<"log">;
        /**
         * The message of the comment
         *
         * @example
         * This is my comment
         */
        message: string;
        /**
         * The comment created at timestamp
         *
         * @example
         * 2023-08-11 01:15:58.359+00
         */
        created_at: string;
      }
    : T extends "EVENT_DELETE"
    ? {
        /**
         * The event title
         *
         * @example
         * My event
         */
        title: string;
      }
    : T extends "EVENT_UPDATE"
    ? {
        /**
         * The old activity state
         */
        old: Partial<{
          title: Event["title"];
          description: Event["description"];
          emoji: Event["emoji"];
          tags: EventMetadata["tags"];
          pinned: Event["pinned"];
        }>;
        /**
         * The new activity state
         */
        new: Partial<{
          title: Event["title"];
          description: Event["description"];
          emoji: Event["emoji"];
          tags: EventMetadata["tags"];
          pinned: Event["pinned"];
        }>;
      }
    : null;

export type {
  Event,
  EventMetadata,
  EventTags,
  Activity,
  ActivityTypes,
  ActivityMetadata,
  Comment,
};
