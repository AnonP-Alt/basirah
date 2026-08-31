import { db } from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const authSession = await auth.api.getSession({
    headers: await headers(),
  });

  if (!authSession?.session) redirect("/auth/login");

  const user = await db.query.user.findFirst({
    where: { id: authSession.user.id },
  });

  if (user?.role === "MODERATOR")
    redirect("/moderator/dashboard");
  else redirect("/user/dashboard");
}
