import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { APP_TITLE, getLoginUrl } from "@/const";
import { Calendar, Clock, Users, Plus, Edit, Trash2, Download, Loader2, Mail } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useState } from "react";

export default function AdminWorkshops() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<any>(null);
  const [showAttendees, setShowAttendees] = useState<number | null>(null);

  // Form state for create/edit
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pillarId: "",
    scheduledAt: "",
    durationMinutes: "120",
    maxAttendees: "",
    sessionType: "lite" as "lite" | "pro",
    googleMeetUrl: "",
  });

  const { data: workshops, isLoading, refetch } = trpc.admin.getAllWorkshops.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  const { data: pillars } = trpc.academy.getPillars.useQuery();

  const { data: attendees, isLoading: attendeesLoading } = trpc.admin.getWorkshopAttendees.useQuery(
    { workshopId: showAttendees! },
    { enabled: showAttendees !== null }
  );

  const createWorkshopMutation = trpc.admin.createWorkshop.useMutation({
    onSuccess: () => {
      toast.success("Workshop created successfully");
      setIsCreateDialogOpen(false);
      resetForm();
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create workshop");
    },
  });

  const updateWorkshopMutation = trpc.admin.updateWorkshop.useMutation({
    onSuccess: () => {
      toast.success("Workshop updated successfully");
      setIsEditDialogOpen(false);
      setSelectedWorkshop(null);
      resetForm();
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update workshop");
    },
  });

  const deleteWorkshopMutation = trpc.admin.deleteWorkshop.useMutation({
    onSuccess: () => {
      toast.success("Workshop deleted successfully");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete workshop");
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      pillarId: "",
      scheduledAt: "",
      durationMinutes: "120",
      maxAttendees: "",
      sessionType: "lite",
      googleMeetUrl: "",
    });
  };

  const handleCreate = () => {
    if (!formData.title || !formData.pillarId || !formData.scheduledAt) {
      toast.error("Please fill in all required fields");
      return;
    }

    createWorkshopMutation.mutate({
      title: formData.title,
      description: formData.description || undefined,
      pillarId: parseInt(formData.pillarId),
      scheduledAt: new Date(formData.scheduledAt).toISOString(),
      durationMinutes: parseInt(formData.durationMinutes),
      maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : undefined,
      sessionType: formData.sessionType,
      googleMeetUrl: formData.googleMeetUrl || undefined,
    });
  };

  const handleEdit = (workshop: any) => {
    setSelectedWorkshop(workshop);
    setFormData({
      title: workshop.title,
      description: workshop.description || "",
      pillarId: workshop.pillarId.toString(),
      scheduledAt: new Date(workshop.scheduledAt).toISOString().slice(0, 16),
      durationMinutes: workshop.durationMinutes.toString(),
      maxAttendees: workshop.maxAttendees?.toString() || "",
      sessionType: workshop.sessionType,
      googleMeetUrl: workshop.googleMeetUrl || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedWorkshop || !formData.title || !formData.pillarId || !formData.scheduledAt) {
      toast.error("Please fill in all required fields");
      return;
    }

    updateWorkshopMutation.mutate({
      id: selectedWorkshop.id,
      title: formData.title,
      description: formData.description || undefined,
      pillarId: parseInt(formData.pillarId),
      scheduledAt: new Date(formData.scheduledAt).toISOString(),
      durationMinutes: parseInt(formData.durationMinutes),
      maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : undefined,
      sessionType: formData.sessionType,
      googleMeetUrl: formData.googleMeetUrl || undefined,
    });
  };

  const handleDelete = (workshopId: number) => {
    if (confirm("Are you sure you want to delete this workshop? This will also remove all registrations.")) {
      deleteWorkshopMutation.mutate({ id: workshopId });
    }
  };

  const exportEmails = (workshopId: number) => {
    const workshopAttendees = attendees;
    if (!workshopAttendees || workshopAttendees.length === 0) {
      toast.error("No attendees to export");
      return;
    }

    const emails = workshopAttendees.map((a: any) => a.email).join(", ");
    navigator.clipboard.writeText(emails);
    toast.success(`${workshopAttendees.length} email(s) copied to clipboard!`);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Admin Access Required</CardTitle>
            <CardDescription>You need admin privileges to access this page</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <a href={getLoginUrl()}>Log In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold text-orange-500 cursor-pointer">{APP_TITLE}</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline">Admin Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Workshop Management</h1>
            <p className="text-lg text-gray-600">Create and manage workshops, view attendees</p>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Plus className="h-4 w-4 mr-2" />
                Create Workshop
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Workshop</DialogTitle>
                <DialogDescription>Add a new workshop to the schedule</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Workshop title"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Workshop description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pillar">Pillar *</Label>
                    <Select value={formData.pillarId} onValueChange={(value) => setFormData({ ...formData, pillarId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pillar" />
                      </SelectTrigger>
                      <SelectContent>
                        {pillars?.map((pillar: any) => (
                          <SelectItem key={pillar.id} value={pillar.id.toString()}>
                            {pillar.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="sessionType">Access Level *</Label>
                    <Select value={formData.sessionType} onValueChange={(value: "lite" | "pro") => setFormData({ ...formData, sessionType: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lite">Lite+ (Starter, Lite, Pro)</SelectItem>
                        <SelectItem value="pro">Pro Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="scheduledAt">Date & Time *</Label>
                    <Input
                      id="scheduledAt"
                      type="datetime-local"
                      value={formData.scheduledAt}
                      onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="durationMinutes">Duration (minutes) *</Label>
                    <Input
                      id="durationMinutes"
                      type="number"
                      value={formData.durationMinutes}
                      onChange={(e) => setFormData({ ...formData, durationMinutes: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxAttendees">Max Attendees</Label>
                    <Input
                      id="maxAttendees"
                      type="number"
                      value={formData.maxAttendees}
                      onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
                      placeholder="Leave empty for unlimited"
                    />
                  </div>

                  <div>
                    <Label htmlFor="googleMeetUrl">Google Meet URL</Label>
                    <Input
                      id="googleMeetUrl"
                      type="url"
                      value={formData.googleMeetUrl}
                      onChange={(e) => setFormData({ ...formData, googleMeetUrl: e.target.value })}
                      placeholder="https://meet.google.com/..."
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  className="bg-orange-500 hover:bg-orange-600"
                  onClick={handleCreate}
                  disabled={createWorkshopMutation.isPending}
                >
                  {createWorkshopMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Workshop"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Workshops Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Workshops</CardTitle>
            <CardDescription>Manage workshop schedule and view attendees</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500 mx-auto mb-4" />
                <p className="text-gray-600">Loading workshops...</p>
              </div>
            ) : workshops && workshops.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Workshop</TableHead>
                    <TableHead>Pillar</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Access</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workshops.map((workshop: any) => (
                    <>
                      <TableRow key={workshop.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{workshop.title}</p>
                            {workshop.description && (
                              <p className="text-sm text-gray-500 line-clamp-1">{workshop.description}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{workshop.pillar?.name || "N/A"}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4" />
                            {new Date(workshop.scheduledAt).toLocaleDateString()}
                            <Clock className="h-4 w-4 ml-2" />
                            {new Date(workshop.scheduledAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </TableCell>
                        <TableCell>{workshop.durationMinutes} min</TableCell>
                        <TableCell>
                          <Badge className={workshop.sessionType === "pro" ? "bg-purple-500" : "bg-blue-500"}>
                            {workshop.sessionType === "pro" ? "Pro Only" : "Lite+"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              workshop.status === "scheduled"
                                ? "default"
                                : workshop.status === "completed"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {workshop.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowAttendees(showAttendees === workshop.id ? null : workshop.id)}
                            >
                              <Users className="h-4 w-4 mr-1" />
                              Attendees
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEdit(workshop)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(workshop.id)}
                              disabled={deleteWorkshopMutation.isPending}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>

                      {/* Attendees Row */}
                      {showAttendees === workshop.id && (
                        <TableRow>
                          <TableCell colSpan={7} className="bg-gray-50">
                            <div className="py-4">
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-lg">
                                  Attendees ({attendees?.length || 0})
                                </h3>
                                <Button
                                  size="sm"
                                  className="bg-orange-500 hover:bg-orange-600"
                                  onClick={() => exportEmails(workshop.id)}
                                  disabled={!attendees || attendees.length === 0}
                                >
                                  <Mail className="h-4 w-4 mr-2" />
                                  Copy Emails
                                </Button>
                              </div>

                              {attendeesLoading ? (
                                <div className="text-center py-4">
                                  <Loader2 className="w-6 h-6 animate-spin text-orange-500 mx-auto" />
                                </div>
                              ) : attendees && attendees.length > 0 ? (
                                <div className="grid md:grid-cols-2 gap-4">
                                  {attendees.map((attendee: any) => (
                                    <div key={attendee.id} className="bg-white p-4 rounded-lg border">
                                      <p className="font-medium">{attendee.name}</p>
                                      <p className="text-sm text-gray-600">{attendee.email}</p>
                                      <p className="text-xs text-gray-500 mt-2">
                                        Registered: {new Date(attendee.registeredAt).toLocaleDateString()}
                                      </p>
                                      <Badge variant="outline" className="mt-2">
                                        {attendee.status}
                                      </Badge>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-gray-500 text-center py-4">No attendees yet</p>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No workshops created yet</p>
                <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Workshop
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Workshop</DialogTitle>
              <DialogDescription>Update workshop details</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="edit-title">Title *</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-pillar">Pillar *</Label>
                  <Select value={formData.pillarId} onValueChange={(value) => setFormData({ ...formData, pillarId: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {pillars?.map((pillar: any) => (
                        <SelectItem key={pillar.id} value={pillar.id.toString()}>
                          {pillar.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="edit-sessionType">Access Level *</Label>
                  <Select value={formData.sessionType} onValueChange={(value: "lite" | "pro") => setFormData({ ...formData, sessionType: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lite">Lite+ (Starter, Lite, Pro)</SelectItem>
                      <SelectItem value="pro">Pro Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-scheduledAt">Date & Time *</Label>
                  <Input
                    id="edit-scheduledAt"
                    type="datetime-local"
                    value={formData.scheduledAt}
                    onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="edit-durationMinutes">Duration (minutes) *</Label>
                  <Input
                    id="edit-durationMinutes"
                    type="number"
                    value={formData.durationMinutes}
                    onChange={(e) => setFormData({ ...formData, durationMinutes: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-maxAttendees">Max Attendees</Label>
                  <Input
                    id="edit-maxAttendees"
                    type="number"
                    value={formData.maxAttendees}
                    onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="edit-googleMeetUrl">Google Meet URL</Label>
                  <Input
                    id="edit-googleMeetUrl"
                    type="url"
                    value={formData.googleMeetUrl}
                    onChange={(e) => setFormData({ ...formData, googleMeetUrl: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-orange-500 hover:bg-orange-600"
                onClick={handleUpdate}
                disabled={updateWorkshopMutation.isPending}
              >
                {updateWorkshopMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Workshop"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
