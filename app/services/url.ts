import { url } from "~/schemas/url";
import { db } from "~/lib/database";
import type { UrlWithoutCreatedAtUpdatedAt } from "~/type/url";

export async function getUrls() {
  try {
    const response = await db.select().from(url);
    return {
      acknowledge: true,
      data: response,
    };
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return {
      acknowledge: false,
      data: [],
    };
  }
}

export async function createUrl(
  urlData: Omit<UrlWithoutCreatedAtUpdatedAt, "id">
) {
  try {
    await db.insert(url).values(urlData);
    return {
      acknowledge: true,
    };
  } catch (error) {
    console.error("Error creating URL:", error);
    return {
      acknowledge: false,
    };
  }
}
