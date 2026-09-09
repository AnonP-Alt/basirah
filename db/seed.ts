import { db } from ".";
import { type PgTable } from "drizzle-orm/pg-core";
import { mosque } from "./schema/app.sql";
import { user } from "./schema/auth.sql";
import { auth } from "@/lib/auth";
import { fakerAR as faker } from "@faker-js/faker";
import { md5 } from "js-md5";

function randomPhoneNumber() {
  const prefixes = ["010", "011", "012", "015"];
  const randomPrefix =
    prefixes[Math.floor(Math.random() * prefixes.length)];

  let remainingDigits = "";
  for (let i = 0; i < 8; i++) {
    remainingDigits += Math.floor(Math.random() * 10);
  }

  return `${randomPrefix}${remainingDigits}`;
}

function randomMosque() {
  return {
    name: faker.company.name(),
    address: faker.location.direction(),
    location: faker.internet.url(),
  };
}

function randomUser() {
  let nationalId = "";
  for (let i = 0; i < 14; i++) {
    nationalId += Math.floor(Math.random() * 10);
  }

  return {
    address: faker.location.streetAddress(),
    email: `${md5(nationalId)}@basirah-nu.vercel.app`,
    name: faker.person.fullName(),
    nationalId,
    password: "password",
    username: randomPhoneNumber(),
  };
}

async function resetDB(...tables: PgTable[]) {
  for (const table of tables) {
    try {
      await db.delete(table);
    } catch (error) {
      let message: string;
      if (error instanceof Error) message = error.message;
      else
        message = `Error While Trying to Delete the Table ${table._.name}`;

      console.warn(message);
    }
  }
}

async function main() {
  try {
    await resetDB(mosque, user);

    const users = Array.from({ length: 16 }, () =>
      randomUser()
    );

    await auth.api.signUpEmail({
      body: {
        address: "عرب الصوالحة",
        email: "anon.rt01@gmail.com",
        name: "عبدالرحمن مجدي سالم محمود",
        nationalId: "30309171402277",
        password: "password",
        role: "MODERATOR",
        username: "01062959498",
      },
    });

    for (const user of users) {
      await auth.api.signUpEmail({ body: user });
    }

    for (let i = 0; i < 16; i++) {
      await db.insert(mosque).values(randomMosque());
    }

    console.log("Seeding Done!");
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    console.log("[X] - Seeding Failed!");
  }
}

main();
