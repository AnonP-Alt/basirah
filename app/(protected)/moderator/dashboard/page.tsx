import { db } from "@/db";
import { mosque } from "@/db/schema/app.sql";

export default async function Page() {
  const sheikhs = await db.query.user.findMany({
    where: { role: "SHEIKH" },
  });

  const mosques = await db.query.mosque.findMany();

  return null;
}
