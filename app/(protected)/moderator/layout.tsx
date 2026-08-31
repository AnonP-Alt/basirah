import { db } from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { type PropsWithChildren } from "react";

export default async function Layout({
  children,
}: PropsWithChildren) {
  const authSession = await auth.api.getSession({
    headers: await headers(),
  });

  const user = await db.query.user.findFirst({
    where: { id: authSession?.user.id },
  });

  if (user?.role === "SHEIKH") redirect("/user/dashboard");

  return children;
}
