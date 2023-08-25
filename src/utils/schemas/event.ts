import { z } from "zod";
import { emojiSchema } from ".";

const eventTitleSchema = z.string().min(1).max(32);
const eventDescriptionSchema = z.string().min(1).max(4096);

const createEventSchema = z.object({
  title: eventTitleSchema,
  description: eventDescriptionSchema.or(z.null()).optional(),
  emoji: emojiSchema.or(z.null()).optional(),
  tags: z
    .record(z.string().min(1).max(36), z.string().min(1).max(36).or(z.number()))
    .optional()
    .default({}),
  timestamp: z.string().datetime().optional().or(z.null()),
  notify: z.boolean().default(true).or(z.array(z.string())).optional(),
  expiration: z.string().datetime().optional().or(z.null()),
  triggers: z.array(z.string()).optional(),
});

const patchEventSchema = z.object({
  title: eventTitleSchema.optional(),
  description: eventDescriptionSchema.or(z.null()).optional(),
  emoji: emojiSchema.or(z.null()).optional(),
  tags: z
    .record(z.string().min(1).max(36), z.string().min(1).max(36).or(z.number()))
    .optional(),
  timestamp: z.string().datetime().optional().or(z.null()),
  pinned: z.boolean().optional(),
});

export {
  eventTitleSchema,
  createEventSchema,
  patchEventSchema,
  eventDescriptionSchema,
};
