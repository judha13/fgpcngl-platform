import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Users,
  BookOpen,
  Megaphone,
  Settings,
  Church,
  ChevronLeft,
  Globe,
  Image,
  FileText,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Globe, label: "Sites", path: "/websites" },
  { icon: BookOpen, label: "Sermons", path: "/sermons" },
  { icon: Calendar, label: "Events", path: "/events" },
  { icon: Megaphone, label: "Announcements", path: "/announcements" },
  { icon: Image, label: "Media Gallery", path: "/media" },
  { icon: FileText, label: "Pages", path: "/pages" },
  { icon: Users, label: "Members", path: "/members" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar flex flex-col transition-all duration-300 border-r border-sidebar-border",
        collapsed ? "w-20" : "w-[260px]"
      )}
    >
      {/* Header */}
      <div className="p-5 flex items-center justify-between border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <img
              src="/fgpc_nagercoil_logo.jpg"
              alt="FGPC Nagercoil logo"
              className="w-10 h-10 rounded-[10px]"
              width={40}
              height={40}
            />
          </div>
          {!collapsed && (
            <span className="font-bold text-foreground text-lg">
              FGPC Nagercoil
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="w-6 h-6 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
        >
          <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-150 text-sm",
                isActive
                  ? "bg-primary/10 font-medium text-primary border-l-4 border-primary pl-3"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
              )}
            >
              <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
