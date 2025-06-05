export interface Event {
  cohost_registration_url: string;
  cropped_banner_url: string;
  cropped_picture_url: string;
  description: string;
  description_short: string;
  event_type_title: string;
  start_date: string;
  title: string;
  url: string;
}

export interface IEventSeries {
  id: number;
  name: string;
  description: string;
  image_url: string;
  youtube_id: string;
}
