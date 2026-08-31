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

  if (!authSession?.session) return redirect("/auth/login");

  return children;
}
