import { db } from "@/db";

import { Sheikhs } from "$/admin/sheikhs";

export default async function Page() {
  const sheikhs = await db.query.user.findMany({
    where: {
      role: "SHEIKH",
    },
  });

  return (
    <main className="flex min-h-screen justify-center">
      <div className="mx-8 my-16 max-w-[80%]">
        <Sheikhs sheikhs={sheikhs} />
      </div>
    </main>
  );
}
