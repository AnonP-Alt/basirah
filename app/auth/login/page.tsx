import { LoginForm } from "$/auth/login-form";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "تسجيل الدخول",
};

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <LoginForm />
    </main>
  );
}
