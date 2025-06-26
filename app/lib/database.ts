import { drizzle } from "drizzle-orm/node-postgres";
import * as dotenv from "dotenv";
import * as schema from "~/schemas/url";

dotenv.config();

export const db = drizzle(process.env.DATABASE_URL!, { schema });
