import { db } from "@/db";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";

export const auth = betterAuth({
  baseURL:
    process.env.BETTER_AUTH_URL ?? process.env.VERCEL_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: { enabled: true },
  plugins: [username({ displayUsername: false })],
});
