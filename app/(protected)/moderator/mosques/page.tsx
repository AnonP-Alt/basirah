import { db } from "@/db";

import { Mosques } from "$/admin/mosques";

export default async function Page() {
  const mosques = await db.query.mosque.findMany();

  return (
    <main className="flex min-h-screen justify-center">
      <div className="mx-8 my-16 max-w-[80%]">
        <Mosques mosques={mosques} />
      </div>
    </main>
  );
}
