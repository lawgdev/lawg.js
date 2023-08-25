import { z } from "zod";
import { emojiRegex, hexColorRegex } from "../regexes";

const emojiSchema = z.string().regex(emojiRegex);
const hexColorSchema = z.string().regex(hexColorRegex);

const usernameSchema = z.string().min(1).max(32);
const emailSchema = z.string().email();
const passwordSchema = z.string().min(8).max(128);

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Literal = z.infer<typeof literalSchema>;
type Json = Literal | { [key: string]: Json } | Json[];
const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
);

export {
  emojiSchema,
  hexColorSchema,
  usernameSchema,
  emailSchema,
  passwordSchema,
  jsonSchema,
};

export type { Literal, Json };
