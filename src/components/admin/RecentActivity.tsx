import { Calendar, User, BookOpen, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    type: "event",
    icon: Calendar,
    title: "New event created",
    description: "Sunday Worship Service - Dec 29",
    time: "2 hours ago",
    color: "bg-info/10 text-info",
  },
  {
    id: 2,
    type: "member",
    icon: User,
    title: "New member registered",
    description: "John Smith joined the congregation",
    time: "4 hours ago",
    color: "bg-success/10 text-success",
  },
  {
    id: 3,
    type: "sermon",
    icon: BookOpen,
    title: "Sermon uploaded",
    description: '"Finding Peace in Chaos" by Pastor James',
    time: "Yesterday",
    color: "bg-secondary/20 text-secondary-foreground",
  },
  {
    id: 4,
    type: "announcement",
    icon: Megaphone,
    title: "Announcement published",
    description: "Christmas Eve Service Times",
    time: "2 days ago",
    color: "bg-warning/10 text-warning",
  },
];

export function RecentActivity() {
  return (
    <div className="bg-card rounded-xl border border-border p-6 animate-slide-up">
      <h3 className="font-display text-lg font-semibold text-foreground mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={cn("p-2 rounded-lg", activity.color)}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                {activity.title}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {activity.description}
              </p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
