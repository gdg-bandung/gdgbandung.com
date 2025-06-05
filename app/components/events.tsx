import { useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { Event } from "~/type/event";
import { format } from "date-fns";
import { getPastEvents, getUpcomingEvents } from "~/services/event";

export function EventCard({ event }: { event: Event }) {
  const eventDate = new Date(event.start_date);

  return (
    <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border border-gray-100 h-full">
      <img
        src={event.cropped_picture_url}
        alt={event.title}
        className="w-full h-48 object-contain"
        fetchPriority="low"
        loading="lazy"
      />
      <CardContent className="p-6 relative">
        <div className="flex justify-between">
          <div>
            <span
              className={`text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block ${
                event.event_type_title.toLowerCase() === "conference" ||
                event.event_type_title.toLowerCase() === "devfest co-host"
                  ? "bg-gdg-red"
                  : event.event_type_title.toLowerCase() ===
                    "external ticketing"
                  ? "bg-gdg-green"
                  : event.event_type_title.toLowerCase().includes("workshop")
                  ? "bg-gdg-yellow"
                  : event.event_type_title.toLowerCase().includes("session")
                  ? "bg-gdg-blue"
                  : "bg-gray-500"
              }`}
            >
              {event.event_type_title}
            </span>
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
          </div>
          <div className="flex flex-col items-center text-gdg-blue font-bold event-date-box border-l-2 border-gdg-blue pl-2">
            <span className="text-xl">{format(eventDate, "dd")}</span>
            <span className="text-sm">
              {format(eventDate, "MMM").toUpperCase()}
            </span>
          </div>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {event.description_short}
        </p>
        <Link
          to={event.url}
          className="text-gdg-blue font-medium hover:underline inline-flex items-center"
        >
          View Details <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}

export function EventsLoading() {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gdg-blue"></div>
    </div>
  );
}
export default function Events() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const upcomingEventsQuery = useInfiniteQuery({
    queryKey: ["upcomingEvents"],
    queryFn: ({ pageParam }) => getUpcomingEvents(pageParam as number),
    getNextPageParam: (lastPage) => lastPage.next,
    initialPageParam: 1,
  });

  const isUpcomingFirstFetched =
    upcomingEventsQuery.isSuccess || upcomingEventsQuery.isError;

  const pastEventsQuery = useInfiniteQuery({
    queryKey: ["pastEvents"],
    queryFn: ({ pageParam }) => getPastEvents(pageParam as number),
    getNextPageParam: (lastPage) => lastPage.next,
    initialPageParam: 1,
    enabled: activeTab === "past" || isUpcomingFirstFetched, // waiting for open tab post or upcoming finished fetching
  });

  // Determine which events to display
  const events =
    activeTab === "upcoming"
      ? upcomingEventsQuery?.data?.pages?.flatMap((page) => page.data) || []
      : pastEventsQuery?.data?.pages?.flatMap((page) => page.data) || [];

  const hasMoreEvents =
    activeTab === "upcoming"
      ? upcomingEventsQuery.hasNextPage
      : pastEventsQuery.hasNextPage;

  const isLoading =
    activeTab === "upcoming"
      ? upcomingEventsQuery.isLoading
      : pastEventsQuery.isLoading;

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <section id="events" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {activeTab === "upcoming" ? "Upcoming Events" : "Past Events"}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join us for exciting tech events, workshops, and meetups organized
            by GDG Bandung community.
          </p>
        </div>

        <Tabs
          defaultValue="upcoming"
          className="w-full"
          onValueChange={handleTabChange}
        >
          <div className="flex justify-center mb-12">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="upcoming" className="space-y-8">
            {events.length === 0 && isLoading ? (
              <EventsLoading />
            ) : events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                  <EventCard key={event.url} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No upcoming events</h3>
                <p className="text-gray-600 mb-6">
                  Check back soon for new events or browse our past events.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-8">
            {events.length === 0 && isLoading ? (
              <EventsLoading />
            ) : events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                  <EventCard key={event.url} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">
                  No past events found
                </h3>
                <p className="text-gray-600">We're just getting started!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {hasMoreEvents && events.length > 0 && (
          <div className="text-center mt-12">
            <Button
              className="border-2 bg-background border-gdg-blue text-gdg-blue hover:bg-gdg-blue hover:text-white rounded-full px-8 cursor-pointer"
              onClick={() =>
                activeTab === "upcoming"
                  ? upcomingEventsQuery.fetchNextPage()
                  : pastEventsQuery.fetchNextPage()
              }
              disabled={
                (activeTab === "upcoming"
                  ? !upcomingEventsQuery.hasNextPage
                  : !pastEventsQuery.hasNextPage) ||
                (activeTab === "upcoming"
                  ? upcomingEventsQuery.isFetchingNextPage
                  : pastEventsQuery.isFetchingNextPage)
              }
            >
              {(
                activeTab === "upcoming"
                  ? upcomingEventsQuery.isFetchingNextPage
                  : pastEventsQuery.isFetchingNextPage
              )
                ? "Loading..."
                : "Load More"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
