import { Card, CardContent } from "~/components/ui/card";
import type { IEventSeries } from "~/type/event";
import { EVENT_SERIES_DATA } from "~/data/event";
import { useState } from "react";

export function EventCard({ event }: { event: IEventSeries }) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border border-gray-100 h-full py-0 gap-0">
      <div className="relative w-full aspect-video bg-black">
        {!isVideoLoaded ? (
          <button
            onClick={() => setIsVideoLoaded(true)}
            className="w-full h-full flex items-center justify-center group cursor-pointer"
            aria-label="Play video"
          >
            <img
              src={`https://i.ytimg.com/vi/${event.youtube_id}/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLALTLgMMTF3_CzPmBIkaxKIJfa-nQ`}
              alt={event.name}
              className="absolute inset-0 w-full h-full object-cover"
              fetchPriority="low"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 hover:bg-black/30 group-hover:bg-opacity-30 transition-opacity" />
            <img
              src="/social-media/youtube.svg"
              className="h-16 w-auto z-10"
              fetchPriority="low"
              loading="lazy"
              alt="play youtube"
            />
          </button>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${
              event.youtube_id
            }?autoplay=1&enablejsapi=1&origin=${
              import.meta.env.VITE_YOUTUBE_EMBED_ORIGIN
            }`}
            className="w-full h-full"
            allowFullScreen={true}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            frameBorder={0}
          />
        )}
      </div>
      <CardContent className="p-6 relative">
        <h3 className="text-xl font-bold mb-2">{event.name}</h3>
        <p className="text-gray-600 mb-4 flex-1">{event.description}</p>
      </CardContent>
    </Card>
  );
}

export default function EventSeries() {
  return (
    <section id="event-series" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center">
            <div className="colorful-bar justify-center">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Event Series</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            GDG Bandung is proud to present a series of events that bring
            together the best of the tech community.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EVENT_SERIES_DATA.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
