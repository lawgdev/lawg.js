import { z } from "zod";

const createLogSchema = z.object({
  message: z.string(),
  level: z.literal("info").or(z.literal("warn")).or(z.literal("error")),
});

export { createLogSchema };
