import { z } from "zod";

const projectNamespaceSchema = z
  .string()
  .min(1)
  .max(32)
  .regex(/^[a-z0-9_-]+$/);
const projectNameSchema = z.string().min(1).max(32);

export { projectNamespaceSchema, projectNameSchema };
