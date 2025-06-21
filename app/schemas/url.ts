import { pgTable, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core";
import { z } from "zod";

export const url = pgTable("url", {
  id: uuid("id").defaultRandom().primaryKey(),
  shortCode: text("short_code").notNull().unique(),
  originalUrl: text("original_url").notNull(),
  title: text("title").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const urlForm = z.object({
  shortCode: z
    .string({ required_error: "Short code is required" })
    .min(1, "Short code is required"),
  originalUrl: z
    .string({ required_error: "Original URL is required" })
    .url()
    .min(1, "Original URL is required"),
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required"),
  isActive: z.boolean().default(true),
  expiresAt: z.date({ required_error: "Expires at is required" }),
});
