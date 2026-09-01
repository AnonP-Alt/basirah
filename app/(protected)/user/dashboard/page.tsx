import { LogOutButton } from "$/auth/logout-button";

export default async function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <LogOutButton />
    </main>
  );
}
