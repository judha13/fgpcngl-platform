import { useState } from "react";
import { Save, Church, Bell, Shield, Database, Palette } from "lucide-react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function Settings() {
  const [churchInfo, setChurchInfo] = useState({
    name: "Grace Community Church",
    address: "123 Faith Street, Springfield, IL 62701",
    phone: "(555) 123-4567",
    email: "contact@gracechurch.org",
    description: "A welcoming community of believers committed to sharing God's love.",
  });

  const [notifications, setNotifications] = useState({
    emailNewMember: true,
    emailNewDonation: true,
    emailEventReminder: true,
    pushNotifications: false,
  });

  const handleSave = () => {
    toast.success("Settings saved successfully! Changes will sync to all websites.");
  };

  return (
    <AdminLayout>
      <AdminHeader />
      
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Configure your admin panel and sync preferences</p>
        </div>
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="general" className="gap-2">
              <Church className="w-4 h-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="database" className="gap-2">
              <Database className="w-4 h-4" />
              Database
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6 animate-slide-up">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Church Information
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                This information is shared across all connected websites.
              </p>
              
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="churchName">Church Name</Label>
                  <Input
                    id="churchName"
                    value={churchInfo.name}
                    onChange={(e) => setChurchInfo({ ...churchInfo, name: e.target.value })}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={churchInfo.address}
                    onChange={(e) => setChurchInfo({ ...churchInfo, address: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={churchInfo.phone}
                      onChange={(e) => setChurchInfo({ ...churchInfo, phone: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={churchInfo.email}
                      onChange={(e) => setChurchInfo({ ...churchInfo, email: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={churchInfo.description}
                    onChange={(e) => setChurchInfo({ ...churchInfo, description: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 animate-slide-up">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Service Times
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-foreground">Sunday Worship</p>
                    <p className="text-sm text-muted-foreground">Main Sanctuary</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">9:00 AM & 11:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-foreground">Wednesday Bible Study</p>
                    <p className="text-sm text-muted-foreground">Fellowship Hall</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">7:00 PM</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Add Service Time
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6 animate-slide-up">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Email Notifications
              </h3>
              <div className="space-y-4">
                <NotificationToggle
                  label="New Member Registration"
                  description="Receive email when a new member registers"
                  checked={notifications.emailNewMember}
                  onToggle={() => setNotifications({ ...notifications, emailNewMember: !notifications.emailNewMember })}
                />
                <Separator />
                <NotificationToggle
                  label="New Donations"
                  description="Receive email for each donation received"
                  checked={notifications.emailNewDonation}
                  onToggle={() => setNotifications({ ...notifications, emailNewDonation: !notifications.emailNewDonation })}
                />
                <Separator />
                <NotificationToggle
                  label="Event Reminders"
                  description="Receive reminders before upcoming events"
                  checked={notifications.emailEventReminder}
                  onToggle={() => setNotifications({ ...notifications, emailEventReminder: !notifications.emailEventReminder })}
                />
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 animate-slide-up">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Push Notifications
              </h3>
              <NotificationToggle
                label="Browser Push Notifications"
                description="Receive real-time notifications in your browser"
                checked={notifications.pushNotifications}
                onToggle={() => setNotifications({ ...notifications, pushNotifications: !notifications.pushNotifications })}
              />
            </div>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6 animate-slide-up">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Admin Access
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Manage who has access to this admin panel.
              </p>
              <div className="space-y-4">
                <AdminUser name="Pastor James Wilson" email="james@gracechurch.org" role="Super Admin" />
                <AdminUser name="Sarah Miller" email="sarah@gracechurch.org" role="Admin" />
                <AdminUser name="John Smith" email="john@gracechurch.org" role="Editor" />
                <Button variant="outline" className="w-full">
                  Invite Admin User
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 animate-slide-up">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Security Settings
              </h3>
              <div className="space-y-4">
                <NotificationToggle
                  label="Two-Factor Authentication"
                  description="Require 2FA for all admin users"
                  checked={true}
                  onToggle={() => toast.info("2FA settings updated")}
                />
                <Separator />
                <NotificationToggle
                  label="Session Timeout"
                  description="Auto logout after 30 minutes of inactivity"
                  checked={true}
                  onToggle={() => toast.info("Session settings updated")}
                />
              </div>
            </div>
          </TabsContent>

          {/* Database */}
          <TabsContent value="database" className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6 animate-slide-up">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Database Connection
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Connect to your database to sync data across all websites.
              </p>
              
              <div className="p-6 rounded-lg border-2 border-dashed border-border text-center">
                <Database className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h4 className="font-medium text-foreground mb-2">No Database Connected</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect your database to enable real-time sync across all websites.
                </p>
                <Button className="gap-2">
                  <Database className="w-4 h-4" />
                  Connect Database
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 animate-slide-up">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Data Export
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Export your data for backup or migration purposes.
              </p>
              <div className="flex gap-3">
                <Button variant="outline">Export Members</Button>
                <Button variant="outline">Export Events</Button>
                <Button variant="outline">Export All Data</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="fixed bottom-6 right-6">
          <Button onClick={handleSave} size="lg" className="gap-2 shadow-lg">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}

function NotificationToggle({
  label,
  description,
  checked,
  onToggle,
}: {
  label: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onToggle} />
    </div>
  );
}

function AdminUser({ name, email, role }: { name: string; email: string; role: string }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-medium text-primary">
            {name.split(" ").map((n) => n[0]).join("")}
          </span>
        </div>
        <div>
          <p className="font-medium text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </div>
      <span className="text-sm font-medium text-muted-foreground">{role}</span>
    </div>
  );
}
