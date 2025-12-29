import { Globe, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const websites = [
  {
    id: 1,
    name: "Main Church Website",
    url: "gracechurch.org",
    status: "online",
    lastSync: "2 min ago",
  },
  {
    id: 2,
    name: "Youth Ministry Site",
    url: "youth.gracechurch.org",
    status: "online",
    lastSync: "5 min ago",
  },
  {
    id: 3,
    name: "Spanish Language Site",
    url: "es.gracechurch.org",
    status: "syncing",
    lastSync: "Syncing...",
  },
];

export function WebsiteStatus() {
  return (
    <div className="bg-card rounded-xl border border-border p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold text-foreground">
          Connected Websites
        </h3>
        <Badge variant="outline" className="text-xs">
          {websites.length} sites
        </Badge>
      </div>
      <div className="space-y-3">
        {websites.map((site, index) => (
          <div
            key={site.id}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Globe className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {site.name}
                </p>
                <p className="text-xs text-muted-foreground">{site.url}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="flex items-center gap-1">
                  {site.status === "online" ? (
                    <CheckCircle className="w-4 h-4 text-success" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-warning animate-pulse" />
                  )}
                  <span className="text-xs font-medium capitalize text-foreground">
                    {site.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{site.lastSync}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
