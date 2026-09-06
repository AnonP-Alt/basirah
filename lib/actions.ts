"use server";

import { db } from "@/db";
import { mosque } from "@/db/schema/app.sql";
import { user } from "@/db/schema/auth.sql";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

async function successState(actions: () => void) {
  try {
    actions();
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function addMosque(
  data: typeof mosque.$inferInsert
) {
  return await successState(async () => {
    await db.insert(mosque).values(data);
    revalidatePath("/moderator/mosques");
  });
}

export async function deleteMosque(id: number) {
  return await successState(async () => {
    await db.delete(mosque).where(eq(mosque.id, id));
    revalidatePath("/moderator/mosques");
  });
}

export async function deleteSheikh(id: string) {
  return await successState(async () => {
    await db.delete(user).where(eq(user.id, id));
    revalidatePath("/moderator/sheikhs");
  });
}

export async function editMosque(
  data: Partial<typeof mosque.$inferInsert>
) {
  return await successState(async () => {
    await db
      .update(mosque)
      .set(data)
      .where(eq(mosque.id, data.id!));
    revalidatePath("/moderator/mosques");
  });
}

export async function editSheikh(
  data: Partial<typeof user.$inferInsert>
) {
  return await successState(async () => {
    await db
      .update(user)
      .set(data)
      .where(eq(user.id, data.id!));
    revalidatePath("/moderator/sheikhs");
  });
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
