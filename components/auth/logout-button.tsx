"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import { Button } from "$/ui/button";
import { Button as ButtonPrimitive } from "@base-ui/react/button";

type Props = ButtonPrimitive.Props;

export function LogOutButton(props: Props) {
  const router = useRouter();

  const handleClick = async () => {
    await authClient.signOut();
    router.push("/auth/login");
  };

  return (
    <Button {...props} onClick={handleClick}>
      Logout
    </Button>
  );
}
