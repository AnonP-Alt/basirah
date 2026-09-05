import { db } from "@/db";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { betterAuth } from "better-auth";
import { type DBFieldAttribute } from "better-auth/db";
import { username } from "better-auth/plugins";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const userAdditionalFields: Record<
  string,
  DBFieldAttribute
> = {
  address: {
    input: true,
    required: true,
    returned: false,
    type: "string",
  },
  nationalId: {
    input: true,
    required: true,
    returned: false,
    type: "string",
    unique: true,
    validator: {
      input: z.string().regex(/^\d{14}$/),
    },
  },
  role: {
    defaultValue: "SHEIKH",
    input: false,
    required: false,
    returned: true,
    type: "string",
    validator: {
      input: z.enum(["MODERATOR", "SHEIKH"]),
    },
  },
  username: {
    input: true,
    required: true,
    returned: true,
    type: "string",
    validator: {
      input: z.string().regex(/^01[0125]\d{8}$/),
    },
  },
};

export const auth = betterAuth({
  baseURL:
    process.env.BETTER_AUTH_URL ??
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: { enabled: true },
  plugins: [username({ displayUsername: false })],
  user: {
    additionalFields: userAdditionalFields,
  },
});
