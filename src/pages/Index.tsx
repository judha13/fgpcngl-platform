import { Users, Calendar, BookOpen, Heart, TrendingUp, Globe } from "lucide-react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatsCard } from "@/components/admin/StatsCard";
import { RecentActivity } from "@/components/admin/RecentActivity";
import { UpcomingEvents } from "@/components/admin/UpcomingEvents";
import { WebsiteStatus } from "@/components/admin/WebsiteStatus";

const stats = [
  {
    title: "Total Members",
    value: "1,234",
    change: "+12% from last month",
    changeType: "positive" as const,
    icon: Users,
    iconColor: "bg-info/10 text-info",
  },
  {
    title: "Active Events",
    value: "8",
    change: "3 this week",
    changeType: "neutral" as const,
    icon: Calendar,
    iconColor: "bg-secondary/20 text-secondary-foreground",
  },
  {
    title: "Sermons",
    value: "156",
    change: "+4 this month",
    changeType: "positive" as const,
    icon: BookOpen,
    iconColor: "bg-success/10 text-success",
  },
];

export default function Dashboard() {
  return (
    <AdminLayout>
      <AdminHeader />
      
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Welcome back! Here's what's happening at your church.</p>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={stat.title} style={{ animationDelay: `${index * 100}ms` }}>
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Activity & Events */}
          <div className="lg:col-span-2 space-y-6">
            <RecentActivity />
            <UpcomingEvents />
          </div>

          {/* Right Column - Website Status */}
          <div className="space-y-6">
            <WebsiteStatus />
            
            {/* Quick Actions */}
            <div className="bg-card rounded-xl border border-border p-6 animate-slide-up">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <QuickAction icon={Calendar} label="Add Event" />
                <QuickAction icon={BookOpen} label="Upload Sermon" />
                <QuickAction icon={Users} label="Add Member" />
                <QuickAction icon={Globe} label="Sync Sites" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function QuickAction({ icon: Icon, label }: { icon: typeof Calendar; label: string }) {
  return (
    <button className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-200 hover:scale-105 group">
      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </button>
  );
}
