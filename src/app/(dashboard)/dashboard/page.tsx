import React from "react";
import UpcomingMeetings from "@/components/dashboard/UpcomingMeetings";
import EventTypesList from "@/components/dashboard/EventTypesList";
import QuickActions from "@/components/dashboard/QuickActions";

export default function DashboardPage() {
  return (
    <div className="container py-6 space-y-6 bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your schedule and availability
          </p>
        </div>
      </div>

      <QuickActions />

      <div className="grid grid-cols-1 gap-6">
        <UpcomingMeetings />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <EventTypesList />
      </div>
    </div>
  );
}
