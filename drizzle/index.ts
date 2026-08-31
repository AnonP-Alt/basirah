import * as schema from "./schema";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

export const db = drizzle({
  connection: process.env.DATABASE_URL!,
  logger: true,
  relations: schema.authRelations,
});
