import { useState } from "react";
import { Plus, Search, Filter, Mail, Phone, UserPlus, Pencil } from "lucide-react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useMembers, useCreateMember, useUpdateMember, useDeleteMember } from "@/hooks/useMembers";
import type { Member, CreateMemberData } from "@/services/membersApi";

export default function Members() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [newMember, setNewMember] = useState<CreateMemberData>({ 
    name: "", 
    email: "", 
    phone: "", 
    role: "Member" 
  });

  // React Query hooks
  const { data: members = [], isLoading, error } = useMembers();
  const createMemberMutation = useCreateMember();
  const updateMemberMutation = useUpdateMember();
  const deleteMemberMutation = useDeleteMember();

  const getInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    });
  };

  const columns = [
    {
      key: "name",
      header: "Member",
      render: (member: Member) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary text-sm">
              {getInitials(member.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">{member.name}</p>
            <p className="text-xs text-muted-foreground">{member.email}</p>
          </div>
        </div>
      ),
    },
    { 
      key: "phone", 
      header: "Phone",
      render: (member: Member) => member.phone || "Not provided"
    },
    {
      key: "role",
      header: "Role",
      render: (member: Member) => (
        <Badge variant="outline">{member.role}</Badge>
      ),
    },
    { 
      key: "join_date", 
      header: "Joined",
      render: (member: Member) => formatJoinDate(member.join_date)
    },
    {
      key: "status",
      header: "Status",
      render: (member: Member) => (
        <Badge
          className={member.status === "active" ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"}
        >
          {member.status}
        </Badge>
      ),
    },
  ];

  const handleAddMember = async () => {
    if (!newMember.name || !newMember.email) {
      return; // Error handling is done in the mutation
    }

    try {
      await createMemberMutation.mutateAsync(newMember);
      setNewMember({ name: "", email: "", phone: "", role: "Member" });
      setIsDialogOpen(false);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleEditMember = (member: Member) => {
    setEditingMember(member);
    setNewMember({
      name: member.name,
      email: member.email,
      phone: member.phone || "",
      role: member.role,
    });
    setIsDialogOpen(true);
  };

  const handleUpdateMember = async () => {
    if (!editingMember || !newMember.name || !newMember.email) {
      return;
    }

    try {
      await updateMemberMutation.mutateAsync({
        id: editingMember.id,
        data: {
          ...newMember,
          status: editingMember.status,
        },
      });
      setNewMember({ name: "", email: "", phone: "", role: "Member" });
      setEditingMember(null);
      setIsDialogOpen(false);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleDelete = async (member: Member) => {
    try {
      await deleteMemberMutation.mutateAsync(member.id);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingMember(null);
    setNewMember({ name: "", email: "", phone: "", role: "Member" });
  };

  const activeMembers = members.filter(m => m.status === "active").length;
  const totalMembers = members.length;

  if (error) {
    return (
      <AdminLayout>
        <AdminHeader />
        <div className="p-6">
          <div className="text-center py-12">
            <p className="text-destructive">Failed to load members. Please check your backend connection.</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
            >
              Retry
            </Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminHeader />
      
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Members</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage your church congregation directory</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-success/10">
              <UserPlus className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-display font-semibold text-foreground">
                {isLoading ? <Skeleton className="h-8 w-12" /> : activeMembers}
              </p>
              <p className="text-sm text-muted-foreground">Active Members</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-info/10">
              <Mail className="w-6 h-6 text-info" />
            </div>
            <div>
              <p className="text-2xl font-display font-semibold text-foreground">
                {isLoading ? <Skeleton className="h-8 w-12" /> : totalMembers}
              </p>
              <p className="text-sm text-muted-foreground">Total Members</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-secondary/20">
              <Phone className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-2xl font-display font-semibold text-foreground">
                {isLoading ? <Skeleton className="h-8 w-12" /> : "12"}
              </p>
              <p className="text-sm text-muted-foreground">New This Month</p>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search members..." className="pl-9 w-64" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-display">
                  {editingMember ? "Edit Member" : "Add New Member"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    placeholder="john@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newMember.phone}
                    onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select 
                    value={newMember.role}
                    onValueChange={(value) => setNewMember({ ...newMember, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Member">Member</SelectItem>
                      <SelectItem value="Volunteer">Volunteer</SelectItem>
                      <SelectItem value="Deacon">Deacon</SelectItem>
                      <SelectItem value="Elder">Elder</SelectItem>
                      <SelectItem value="Youth Leader">Youth Leader</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={editingMember ? handleUpdateMember : handleAddMember} 
                    className="flex-1"
                    disabled={createMemberMutation.isPending || updateMemberMutation.isPending}
                  >
                    {(createMemberMutation.isPending || updateMemberMutation.isPending) ? (
                      "Saving..."
                    ) : editingMember ? (
                      "Update Member"
                    ) : (
                      "Add Member"
                    )}
                  </Button>
                  <Button variant="outline" onClick={handleCloseDialog}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Members Table */}
        {isLoading ? (
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={members}
            onEdit={handleEditMember}
            onDelete={handleDelete}
            onView={(member) => console.log(`Viewing: ${member.name}`)}
          />
        )}
      </div>
    </AdminLayout>
  );
}