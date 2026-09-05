"use server";

import { db } from "@/db";
import { mosque } from "@/db/schema/app.sql";
import { user } from "@/db/schema/auth.sql";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addMosque(
  data: typeof mosque.$inferInsert
) {
  const { address, location, name } = data;
  try {
    await db.insert(mosque).values({ address, location, name });
    revalidatePath("/moderator/mosques");
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function deleteMosque(id: number) {
  await db.delete(mosque).where(eq(mosque.id, id));
  revalidatePath("/moderator/mosques");
}

export async function deleteSheikh(id: string) {
  await db.delete(user).where(eq(user.id, id));
  revalidatePath("/moderator/sheikhs");
}

export async function editMosque(
  data: Partial<typeof mosque.$inferInsert>
) {
  try {
    await db
      .update(mosque)
      .set(data)
      .where(eq(mosque.id, data.id!));
    revalidatePath("/moderator/mosques");
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function editSheikh(
  data: Partial<typeof user.$inferInsert>
) {
  try {
    await db
      .update(user)
      .set(data)
      .where(eq(user.id, data.id!));
    revalidatePath("/moderator/sheikhs");
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function emailTaken(email: string) {
  const user = await db.query.user.findFirst({
    where: { email },
  });

  return user?.email === email;
}

export async function nationalIdTaken(id: string) {
  const user = await db.query.user.findFirst({
    where: { nationalId: id },
  });

  return user?.nationalId === id;
}

export async function sheikhData(id: string) {
  const user = await db.query.user.findFirst({
    where: {
      id,
      role: "SHEIKH",
    },
  });

  if (!user) return { success: false, data: null };
  else return { success: true, data: user };
}
