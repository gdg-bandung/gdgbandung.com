import {
  pgTable,
  text,
  timestamp,
  boolean,
  uuid,
  index,
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { definedRoutes } from "~/configs/defined-routes";
import { relations } from "drizzle-orm";

export const url = pgTable(
  "url",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    shortCode: text("short_code").notNull().unique(),
    originalUrl: text("original_url").notNull(),
    title: text("title").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("url_short_code_idx").on(table.shortCode),
    index("url_is_active_idx").on(table.isActive),
    index("url_expires_at_idx").on(table.expiresAt),
  ]
);

// URL Analytics table for tracking clicks and visits
export const urlAnalytics = pgTable(
  "url_analytics",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    urlId: uuid("url_id")
      .notNull()
      .references(() => url.id, { onDelete: "cascade" }),
    visitedAt: timestamp("visited_at").notNull().defaultNow(),
    userAgent: text("user_agent"),
    referrer: text("referrer"),
    ipAddress: text("ip_address"),
    device: text("device"), // mobile, desktop, tablet
    browser: text("browser"), // chrome, firefox, safari, etc.
    os: text("os"), // windows, macos, linux, android, ios
  },
  (table) => [
    index("url_analytics_url_id_idx").on(table.urlId),
    index("url_analytics_visited_at_idx").on(table.visitedAt),
  ]
);

// Relations
export const urlRelations = relations(url, ({ many }) => ({
  analytics: many(urlAnalytics),
}));

export const urlAnalyticsRelations = relations(urlAnalytics, ({ one }) => ({
  url: one(url, {
    fields: [urlAnalytics.urlId],
    references: [url.id],
  }),
}));

export const urlForm = z.object({
  shortCode: z
    .string({ required_error: "Short code is required" })
    .min(1, "Short code is required")
    .refine((value) => value.match(/^[a-zA-Z0-9-]+$/), {
      message: "Short code must contain only letters, numbers, and hyphens.",
    })
    .refine((value) => !definedRoutes.includes(value), {
      message: "Short code already exists.",
    }),
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
