import { Button } from "$/ui/button";
import { LogOutButton } from "@/components/auth/logout-button";
import Link from "next/link";

export default async function Layout({
  children,
}: LayoutProps<"/moderator">) {
  return (
    <>
      <header className="flex items-center justify-between border-b bg-secondary p-2">
        <nav>
          <ul className="flex items-center gap-4 text-lg font-medium tracking-widest lg:gap-8">
            <li>
              <Button variant="link">
                <Link href="/moderator/dashboard">
                  الصفحة الرئيسية
                </Link>
              </Button>
            </li>
            <li>
              <Button variant="link">
                <Link href="/moderator/mosques">
                  إدارة المساجد
                </Link>
              </Button>
            </li>
            <li>
              <Button variant="link">
                <Link href="/moderator/sheikhs">
                  إدارة الشيوخ
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
        <LogOutButton>تسجيل الخروج</LogOutButton>
      </header>
      {children}
    </>
  );
}
