import {
  date,
  integer,
  pgEnum,
  serial,
  snakeCase,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("user_role", [
  "MODERATOR",
  "SHEIKH",
]);

export const khutbah = snakeCase.table("khutbah", {
  id: serial().primaryKey(),
  date: date().notNull(),
  mosqueId: integer().notNull(),
  sheikhId: text().notNull(),
});

export const mosque = snakeCase.table("mosque", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  address: varchar({ length: 255 }).notNull(),
  location: varchar({ length: 255 }).notNull(),
});
