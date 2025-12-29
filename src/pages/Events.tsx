import { useState } from "react";
import { Plus, Calendar, Clock, MapPin, Users, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/layouts/AdminLayout";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEvents, useCreateEvent, useUpdateEvent, useDeleteEvent } from "@/hooks/useEvents";
import type { Event, CreateEventData } from "@/services/eventsApi";

export default function Events() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [eventFormData, setEventFormData] = useState<CreateEventData>({
    title: "",
    description: "",
    event_date: "",
    event_time: "",
    location: "",
  });

  // React Query hooks
  const { data: events = [], isLoading, error } = useEvents();
  const createEventMutation = useCreateEvent();
  const updateEventMutation = useUpdateEvent();
  const deleteEventMutation = useDeleteEvent();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return "TBD";
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSaveEvent = async () => {
    if (!eventFormData.title || !eventFormData.event_date) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      if (editingEvent) {
        await updateEventMutation.mutateAsync({
          id: editingEvent.id,
          data: {
            ...eventFormData,
            status: editingEvent.status,
            attendees: editingEvent.attendees,
          },
        });
        toast.success("Event updated successfully");
      } else {
        await createEventMutation.mutateAsync(eventFormData);
        toast.success("Event created successfully");
      }

      setIsDialogOpen(false);
      setEditingEvent(null);
      setEventFormData({
        title: "",
        description: "",
        event_date: "",
        event_time: "",
        location: "",
      });
    } catch {
      // handled by mutation
    }
  };


  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    console.log("event", event);

    const dateOnly = event.event_date
      ? new Date(event.event_date).toISOString().split("T")[0]
      : "";

    const timeOnly = event.event_time
      ? new Date(event.event_time).toISOString().slice(11, 16)
      : "";

    setEventFormData({
      title: event.title,
      description: event.description || "",
      event_date: dateOnly,   // YYYY-MM-DD
      event_time: timeOnly,   // HH:mm
      location: event.location || "",
    });

    setIsDialogOpen(true);
  };


  const handleDelete = async (event: Event) => {
    try {
      await deleteEventMutation.mutateAsync(event.id);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingEvent(null);
    setEventFormData({
      title: "",
      description: "",
      event_date: "",
      event_time: "",
      location: "",
    });
  };

  // if (error) {
  //   return (
  //     <AdminLayout>
  //       <AdminHeader />
  //       <div className="p-6">
  //         <div className="text-center py-12">
  //           <p className="text-destructive">Failed to load events. Please check your backend connection.</p>
  //           <Button 
  //             onClick={() => window.location.reload()} 
  //             className="mt-4"
  //           >
  //             Retry
  //           </Button>
  //         </div>
  //       </div>
  //     </AdminLayout>
  //   );
  // }

  return (
    <AdminLayout>
      <AdminHeader />

      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Events</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Manage church events and activities</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => {
                  setEditingEvent(null);
                  setEventFormData({
                    title: "",
                    description: "",
                    event_date: "",
                    event_time: "",
                    location: "",
                  });
                }}>
                <Plus className="w-4 h-4" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingEvent ? "Edit Event" : "Create New Event"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={eventFormData.title}
                    onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
                    placeholder="Sunday Worship Service"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={eventFormData.event_date}
                      onChange={(e) => setEventFormData({ ...eventFormData, event_date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={eventFormData.event_time}
                      onChange={(e) => setEventFormData({ ...eventFormData, event_time: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={eventFormData.location}
                    onChange={(e) => setEventFormData({ ...eventFormData, location: e.target.value })}
                    placeholder="Main Sanctuary"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={eventFormData.description}
                    onChange={(e) => setEventFormData({ ...eventFormData, description: e.target.value })}
                    placeholder="Event details..."
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSaveEvent}
                    className="flex-1"
                    disabled={createEventMutation.isPending || updateEventMutation.isPending}
                  >
                    {(createEventMutation.isPending || updateEventMutation.isPending) ? (
                      "Saving..."
                    ) : editingEvent ? (
                      "Update Event"
                    ) : (
                      "Create Event"
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

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {events.map((event) => (
            <Card key={event.id} className="p-5 bg-card border-border">
              <div className="flex gap-4">
                {/* Event Icon */}
                <div className="event-icon flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>

                {/* Event Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-medium text-foreground">{event.title}</h3>
                      <Badge
                        variant="secondary"
                        className={
                          event.status === "upcoming"
                            ? "mt-1.5 bg-success/15 text-success border-0 text-xs font-medium"
                            : event.status === "past"
                              ? "mt-1.5 bg-muted text-muted-foreground border-0 text-xs font-medium"
                              : "mt-1.5 bg-destructive/15 text-destructive border-0 text-xs font-medium"
                        }
                      >
                        {event.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(event.event_date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(event.event_time)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location || "TBD"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1.5 h-9 text-muted-foreground hover:text-foreground"
                      onClick={() => handleEditEvent(event)}
                      disabled={updateEventMutation.isPending}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="gap-1.5 h-9"
                      onClick={() => handleDelete(event)}
                      disabled={deleteEventMutation.isPending}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        {/* Empty State */}
        {/* {!isLoading && events.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No events found</h3>
            <p className="text-muted-foreground mb-4">Get started by creating your first event.</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </div>
        )} */}

        {/* Table */}
        <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50 border-b border-border/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sl No</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Time</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Created By</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {events.map((event, index) => (
                  <tr
                    key={event.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    {/* Sl No */}
                    <td className="px-4 py-3 text-sm text-foreground">
                      {index + 1}
                    </td>

                    {/* Title */}
                    <td className="px-4 py-3 text-sm font-medium text-primary">
                      {event.title}
                    </td>

                    {/* Description */}
                    <td className="px-4 py-3 text-sm text-muted-foreground max-w-[200px] truncate">
                      {event.description || "—"}
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3 text-sm text-foreground">
                      {formatDate(event.event_date)}
                    </td>

                    {/* Time */}
                    <td className="px-4 py-3 text-sm text-foreground">
                      {event.event_time ? formatTime(event.event_time) : "TBD"}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <Badge
                        variant="secondary"
                        className={
                          event.status === "upcoming"
                            ? "bg-success/15 text-success border-0"
                            : event.status === "past"
                              ? "bg-muted text-muted-foreground border-0"
                              : "bg-destructive/15 text-destructive border-0"
                        }
                      >
                        {event.status}
                      </Badge>
                    </td>

                    {/* Created By (placeholder for now) */}
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      Admin
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditEvent(event)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(event)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}