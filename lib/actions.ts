"use server";

import { db } from "@/db";

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
