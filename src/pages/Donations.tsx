import { Heart, TrendingUp, Calendar, DollarSign, Users } from "lucide-react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatsCard } from "@/components/admin/StatsCard";
import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

interface Donation {
  id: string;
  donor: string;
  email: string;
  amount: number;
  fund: string;
  date: string;
  method: string;
  status: "completed" | "pending" | "failed";
}

const donations: Donation[] = [
  { id: "1", donor: "John Smith", email: "john@email.com", amount: 500, fund: "General Fund", date: "Dec 27, 2024", method: "Credit Card", status: "completed" },
  { id: "2", donor: "Sarah Johnson", email: "sarah@email.com", amount: 1000, fund: "Building Fund", date: "Dec 26, 2024", method: "Bank Transfer", status: "completed" },
  { id: "3", donor: "Anonymous", email: "—", amount: 250, fund: "Missions", date: "Dec 25, 2024", method: "Cash", status: "completed" },
  { id: "4", donor: "Michael Brown", email: "michael@email.com", amount: 150, fund: "Youth Ministry", date: "Dec 24, 2024", method: "Credit Card", status: "completed" },
  { id: "5", donor: "Emily Davis", email: "emily@email.com", amount: 75, fund: "General Fund", date: "Dec 23, 2024", method: "Online", status: "pending" },
];

const stats = [
  {
    title: "Total Donations (Dec)",
    value: "$24,500",
    change: "+8% from Nov",
    changeType: "positive" as const,
    icon: DollarSign,
    iconColor: "bg-success/10 text-success",
  },
  {
    title: "Average Donation",
    value: "$125",
    change: "+$15 from last month",
    changeType: "positive" as const,
    icon: TrendingUp,
    iconColor: "bg-info/10 text-info",
  },
  {
    title: "Total Donors",
    value: "196",
    change: "12 new this month",
    changeType: "positive" as const,
    icon: Users,
    iconColor: "bg-secondary/20 text-secondary-foreground",
  },
  {
    title: "Recurring Gifts",
    value: "84",
    change: "$12,400 monthly",
    changeType: "neutral" as const,
    icon: Heart,
    iconColor: "bg-destructive/10 text-destructive",
  },
];

const getInitials = (name: string) => {
  if (name === "Anonymous") return "?";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase();
};

export default function Donations() {
  const columns = [
    {
      key: "donor",
      header: "Donor",
      render: (donation: Donation) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary text-sm">
              {getInitials(donation.donor)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">{donation.donor}</p>
            <p className="text-xs text-muted-foreground">{donation.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (donation: Donation) => (
        <span className="font-semibold text-foreground">
          ${donation.amount.toLocaleString()}
        </span>
      ),
    },
    {
      key: "fund",
      header: "Fund",
      render: (donation: Donation) => (
        <Badge variant="outline">{donation.fund}</Badge>
      ),
    },
    { key: "date", header: "Date" },
    { key: "method", header: "Method" },
    {
      key: "status",
      header: "Status",
      render: (donation: Donation) => (
        <Badge
          className={
            donation.status === "completed"
              ? "bg-success text-success-foreground"
              : donation.status === "pending"
              ? "bg-warning text-warning-foreground"
              : "bg-destructive text-destructive-foreground"
          }
        >
          {donation.status}
        </Badge>
      ),
    },
  ];

  return (
    <AdminLayout>
      <AdminHeader />
      
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Donations</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Track giving and manage donor relationships</p>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={stat.title} style={{ animationDelay: `${index * 100}ms` }}>
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        {/* Fund Breakdown */}
        <div className="bg-card rounded-xl border border-border p-6 animate-slide-up">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">
            Fund Breakdown (December)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FundCard name="General Fund" amount={14200} percentage={58} />
            <FundCard name="Building Fund" amount={5800} percentage={24} />
            <FundCard name="Missions" amount={2800} percentage={11} />
            <FundCard name="Youth Ministry" amount={1700} percentage={7} />
          </div>
        </div>

        {/* Recent Donations */}
        <div className="animate-slide-up">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">
            Recent Donations
          </h3>
          <DataTable
            columns={columns}
            data={donations}
            onView={(donation) => toast.info(`Viewing donation from ${donation.donor}`)}
          />
        </div>
      </div>
    </AdminLayout>
  );
}

function FundCard({ name, amount, percentage }: { name: string; amount: number; percentage: number }) {
  return (
    <div className="p-4 rounded-lg bg-muted/50">
      <p className="text-sm text-muted-foreground mb-1">{name}</p>
      <p className="text-xl font-display font-semibold text-foreground">
        ${amount.toLocaleString()}
      </p>
      <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-1">{percentage}% of total</p>
    </div>
  );
}
