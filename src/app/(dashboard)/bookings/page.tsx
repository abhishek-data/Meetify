import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Clock, X } from "lucide-react";

export default function BookingsPage() {
  // Placeholder data for bookings
  const upcomingBookings = [
    {
      id: 1,
      eventType: "15 Minute Meeting",
      attendee: "John Doe",
      email: "john@example.com",
      date: "2023-10-15T10:00:00",
      status: "confirmed",
    },
    {
      id: 2,
      eventType: "30 Minute Meeting",
      attendee: "Jane Smith",
      email: "jane@example.com",
      date: "2023-10-16T14:00:00",
      status: "confirmed",
    },
  ];

  const pastBookings = [
    {
      id: 3,
      eventType: "60 Minute Meeting",
      attendee: "Alice Johnson",
      email: "alice@example.com",
      date: "2023-10-01T11:00:00",
      status: "completed",
    },
    {
      id: 4,
      eventType: "15 Minute Meeting",
      attendee: "Bob Brown",
      email: "bob@example.com",
      date: "2023-09-28T15:30:00",
      status: "cancelled",
    },
  ];

  const renderBookingList = (bookings: any[]) => {
    if (bookings.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No bookings found</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {bookings.map((booking) => {
          const bookingDate = new Date(booking.date);
          return (
            <div
              key={booking.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <h3 className="font-medium">{booking.eventType}</h3>
                <div className="text-sm text-muted-foreground">
                  {bookingDate.toLocaleDateString()} at{" "}
                  {bookingDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="text-sm text-muted-foreground">
                  {booking.attendee} ({booking.email})
                </div>
              </div>
              <div className="flex items-center gap-2">
                {booking.status === "confirmed" && (
                  <div className="flex items-center text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                    <Clock className="mr-1 h-3 w-3" />
                    Upcoming
                  </div>
                )}
                {booking.status === "completed" && (
                  <div className="flex items-center text-sm bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                    <Check className="mr-1 h-3 w-3" />
                    Completed
                  </div>
                )}
                {booking.status === "cancelled" && (
                  <div className="flex items-center text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-1 rounded">
                    <X className="mr-1 h-3 w-3" />
                    Cancelled
                  </div>
                )}
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Bookings</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Bookings</CardTitle>
          <CardDescription>
            Manage your upcoming and past bookings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              {renderBookingList(upcomingBookings)}
            </TabsContent>
            <TabsContent value="past">
              {renderBookingList(pastBookings)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
