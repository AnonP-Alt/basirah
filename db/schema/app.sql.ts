import {
  date,
  integer,
  pgEnum,
  serial,
  snakeCase,
  text,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("user_role", [
  "MODERATOR",
  "SHEIKH",
]);

export const khutbah = snakeCase.table(
  "khutbah",
  {
    id: serial().primaryKey(),
    date: date().notNull(),
    mosqueId: integer().notNull(),
    sheikhId: text().notNull(),
  },
  (table) => [
    unique("khutbah_date_mosqueId_unique").on(
      table.date,
      table.mosqueId
    ),
  ]
);

export const mosque = snakeCase.table(
  "mosque",
  {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    address: varchar({ length: 255 }).notNull(),
    location: varchar({ length: 255 }).notNull(),
  },
  (table) => [
    unique("mosque_name_location_unique").on(
      table.location,
      table.name
    ),
  ]
);
