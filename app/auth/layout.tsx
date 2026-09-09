import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: LayoutProps<"/auth">) {
  const authSession = await auth.api.getSession({
    headers: await headers(),
  });

  if (authSession?.session) return redirect("/user/dashboard");

  return children;
}
