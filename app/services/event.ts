import type { Event } from "~/type/event";

export async function getUpcomingEvents(page: number) {
  try {
    const response = await fetch(
      `https://gdg.community.dev/api/event_slim/for_chapter/710/?page_size=6&status=Live&include_cohosted_events=true&visible_on_parent_chapter_only=true&order=start_date&fields=title,start_date,event_type_title,cropped_picture_url,cropped_banner_url,url,cohost_registration_url,description,description_short&page=${page}`
    );
    const data = await response.json();
    if (data?.results) {
      return {
        data: data.results,
        next: data?.pagination?.next_page || undefined,
      } as { data: Event[]; next: number | undefined };
    }
    return {
      data: [],
      next: undefined,
    } as { data: Event[]; next: number | undefined };
  } catch {
    return {
      data: [],
      next: undefined,
    } as { data: Event[]; next: number | undefined };
  }
}

export async function getPastEvents(page: number) {
  try {
    const response = await fetch(
      `https://gdg.community.dev/api/event_slim/for_chapter/710/?page_size=6&status=Completed&include_cohosted_events=true&visible_on_parent_chapter_only=true&order=-start_date&fields=title,start_date,event_type_title,cropped_picture_url,cropped_banner_url,url,cohost_registration_url,description,description_short&page=${page}`
    );
    const data = await response.json();
    if (data?.results) {
      return {
        data: data.results,
        next: data?.pagination?.next_page || undefined,
      } as { data: Event[]; next: number | undefined };
    }
    return {
      data: [],
      next: undefined,
    } as { data: Event[]; next: number | undefined };
  } catch {
    return {
      data: [],
      next: undefined,
    } as { data: Event[]; next: number | undefined };
  }
}
