import users from "./data/users.json";
import { auth } from "~/lib/auth.server";

async function seed() {
  try {
    for (const { name, email, password } of users) {
      await auth.api.signUpEmail({
        body: {
          name,
          email,
          password,
        },
      });
      console.log(`Seeded user: ${email}`);
    }
    console.log("Seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();
