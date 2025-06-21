import type { InferSelectModel } from "drizzle-orm";
import type { url } from "~/schemas/url";

export type Url = InferSelectModel<typeof url>;

export type UrlWithoutCreatedAtUpdatedAt = Omit<Url, "createdAt" | "updatedAt">;
