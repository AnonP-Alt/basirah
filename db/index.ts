import { appRelations, authRelations } from "./relations";
import { drizzle } from "drizzle-orm/neon-http";

export const db = drizzle(process.env.DATABASE_URL!, {
  relations: { ...appRelations, ...authRelations },
});
