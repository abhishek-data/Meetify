import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, Clock, MoreHorizontal, RefreshCw, X } from "lucide-react";

interface Meeting {
  id: string | number;
  title: string;
  date: string;
  duration: number;
  attendee: string;
  email: string;
  status?: "confirmed" | "cancelled" | "rescheduled";
}

interface UpcomingMeetingsProps {
  meetings?: Meeting[];
  onReschedule?: (meetingId: string | number) => void;
  onCancel?: (meetingId: string | number) => void;
}

const UpcomingMeetings = ({
  meetings = [
    {
      id: "1",
      title: "Project Kickoff",
      date: "2023-10-15T10:00:00",
      duration: 30,
      attendee: "John Doe",
      email: "john@example.com",
      status: "confirmed",
    },
    {
      id: "2",
      title: "Weekly Sync",
      date: "2023-10-16T14:00:00",
      duration: 60,
      attendee: "Jane Smith",
      email: "jane@example.com",
      status: "confirmed",
    },
    {
      id: "3",
      title: "Product Demo",
      date: "2023-10-17T11:00:00",
      duration: 45,
      attendee: "Mike Johnson",
      email: "mike@example.com",
      status: "rescheduled",
    },
  ],
  onReschedule = () => {},
  onCancel = () => {},
}: UpcomingMeetingsProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      case "rescheduled":
        return <Badge variant="secondary">Rescheduled</Badge>;
      default:
        return <Badge variant="default">Confirmed</Badge>;
    }
  };

  return (
    <Card className="w-full bg-card">
      <CardHeader>
        <CardTitle>Upcoming Meetings</CardTitle>
        <CardDescription>
          Your scheduled meetings for the next 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        {meetings.length > 0 ? (
          <div className="space-y-4">
            {meetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/10 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center justify-center bg-primary/10 p-3 rounded-md">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="text-xs font-medium mt-1">
                      {formatDate(meeting.date)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium">{meeting.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {formatTime(meeting.date)} ({meeting.duration} min)
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {meeting.attendee} ({meeting.email})
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(meeting.status)}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onReschedule(meeting.id)}
                        className="cursor-pointer"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reschedule
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onCancel(meeting.id)}
                        className="cursor-pointer text-destructive focus:text-destructive"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No upcoming meetings</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              You don't have any meetings scheduled for the next 7 days.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingMeetings;
