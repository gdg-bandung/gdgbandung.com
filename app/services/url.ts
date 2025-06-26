import { url, urlForm } from "~/schemas/url";
import { db } from "~/lib/database";
import { and, eq, gte } from "drizzle-orm";
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
    const urlChecked = await db
      .select()
      .from(url)
      .where(eq(url.shortCode, urlData.shortCode));
    if (urlChecked.length > 0) {
      return {
        acknowledge: false,
        error: {
          shortCode: ["Short code already exists."],
        },
      };
    }
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

export async function updateUrl(urlData: UrlWithoutCreatedAtUpdatedAt) {
  try {
    const { id, ...data } = urlData;

    const urlChecked = await db
      .select()
      .from(url)
      .where(eq(url.shortCode, urlData.shortCode));
    if (urlChecked.filter((item) => item.id !== id).length > 0) {
      return {
        acknowledge: false,
        error: {
          shortCode: ["Short code already exists."],
        },
      };
    }
    await db
      .update(url)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(url.id, id));
    return {
      acknowledge: true,
    };
  } catch (error) {
    console.error("Error updating URL:", error);
    return {
      acknowledge: false,
    };
  }
}

export async function deleteUrl(id: string) {
  try {
    await db.delete(url).where(eq(url.id, id));
    return {
      acknowledge: true,
    };
  } catch (error) {
    console.error("Error deleting URL:", error);
    return {
      acknowledge: false,
    };
  }
}

export async function findOriginalUrl(shortCode: string) {
  try {
    const response = await db
      .select()
      .from(url)
      .where(
        and(
          eq(url.shortCode, shortCode),
          eq(url.isActive, true),
          gte(url.expiresAt, new Date())
        )
      );
    if (response.length > 0) {
      return {
        acknowledge: true,
        data: response[0].originalUrl,
        urlData: response[0], // Include full URL data for analytics
      };
    }
    return {
      acknowledge: false,
      data: null,
      urlData: null,
    };
  } catch (error) {
    console.error("Error finding original URL:", error);
    return {
      acknowledge: false,
      data: null,
      urlData: null,
    };
  }
}

// ACTION FUNCTION
export async function actionCreateUrl(formData: FormData) {
  const shortCode = formData.get("shortCode");
  const originalUrl = formData.get("originalUrl");
  const title = formData.get("title");
  const isActive = formData.get("isActive");
  const expiresAt = formData.get("expiresAt");

  const urlChecked = urlForm.safeParse({
    shortCode,
    originalUrl,
    title,
    isActive: isActive === "on",
    expiresAt: expiresAt ? new Date(expiresAt as string) : undefined,
  });

  if (!urlChecked.success) {
    const error = urlChecked.error.flatten().fieldErrors;
    return {
      acknowledge: false,
      form: "create",
      error,
    };
  }

  const urlData: Omit<UrlWithoutCreatedAtUpdatedAt, "id"> = {
    shortCode: urlChecked.data.shortCode,
    originalUrl: urlChecked.data.originalUrl,
    title: urlChecked.data.title,
    isActive: urlChecked.data.isActive,
    expiresAt: urlChecked.data.expiresAt,
  };

  const response = await createUrl(urlData);

  return {
    acknowledge: response.acknowledge,
    form: "create",
    error: response.error,
  };
}

export async function actionUpdateUrl(formData: FormData) {
  const id = formData.get("id") as string;

  if (!id) {
    return {
      acknowledge: false,
      form: "update",
      error: null,
    };
  }

  const shortCode = formData.get("shortCode");
  const originalUrl = formData.get("originalUrl");
  const title = formData.get("title");
  const isActive = formData.get("isActive");
  const expiresAt = formData.get("expiresAt");

  const urlChecked = urlForm.safeParse({
    shortCode,
    originalUrl,
    title,
    isActive: isActive === "on",
    expiresAt: expiresAt ? new Date(expiresAt as string) : undefined,
  });

  if (!urlChecked.success) {
    const error = urlChecked.error.flatten().fieldErrors;
    return {
      acknowledge: false,
      form: "update",
      error,
    };
  }

  const urlData: UrlWithoutCreatedAtUpdatedAt = {
    id,
    shortCode: urlChecked.data.shortCode,
    originalUrl: urlChecked.data.originalUrl,
    title: urlChecked.data.title,
    isActive: urlChecked.data.isActive,
    expiresAt: urlChecked.data.expiresAt,
  };

  const response = await updateUrl(urlData);

  return {
    acknowledge: response.acknowledge,
    form: "update",
    error: response.error,
  };
}

export async function actionDeleteUrl(formData: FormData) {
  const id = formData.get("id") as string;

  if (!id) {
    return {
      acknowledge: false,
      form: "delete",
      error: null,
    };
  }

  const response = await deleteUrl(id);

  return {
    acknowledge: response.acknowledge,
    form: "delete",
    error: null,
  };
}
