import { Calendar, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const events = [
  {
    id: 1,
    title: "Sunday Worship Service",
    date: "Dec 29, 2024",
    time: "10:00 AM",
    location: "Main Sanctuary",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Youth Group Meeting",
    date: "Dec 30, 2024",
    time: "6:00 PM",
    location: "Fellowship Hall",
    status: "upcoming",
  },
  {
    id: 3,
    title: "New Year's Eve Prayer Vigil",
    date: "Dec 31, 2024",
    time: "11:00 PM",
    location: "Chapel",
    status: "featured",
  },
];

export function UpcomingEvents() {
  return (
    <div className="bg-card rounded-xl border border-border p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold text-foreground">
          Upcoming Events
        </h3>
        <Badge variant="outline" className="text-xs">
          {events.length} events
        </Badge>
      </div>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div
            key={event.id}
            className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-foreground">{event.title}</h4>
              {event.status === "featured" && (
                <Badge className="bg-secondary text-secondary-foreground text-xs">
                  Featured
                </Badge>
              )}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
