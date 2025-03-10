import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Check, Clock, Copy, Mail, Video } from "lucide-react";
import Link from "next/link";

export default function ConfirmationPage() {
  // Placeholder data for the booking
  const booking = {
    eventType: "30 Minute Meeting",
    date: new Date("2023-10-15T10:00:00"),
    duration: 30,
    host: "john-doe",
    attendee: "Jane Smith",
    email: "jane@example.com",
    meetLink: "https://meet.google.com/abc-defg-hij",
    addedToCalendars: ["Google Calendar"],
  };

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-green-600 dark:text-green-300" />
          </div>
          <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
          <CardDescription>
            Your meeting has been scheduled successfully.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted rounded-lg mb-6">
            <h3 className="font-medium mb-2">{booking.eventType}</h3>
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Calendar className="mr-2 h-4 w-4" />
              {booking.date.toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Clock className="mr-2 h-4 w-4" />
              {booking.date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              ({booking.duration} minutes)
            </div>
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Mail className="mr-2 h-4 w-4" />
              {booking.email}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Video className="mr-2 h-4 w-4" />
              <a
                href={booking.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {booking.meetLink}
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-1">Add to Calendar</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  Google Calendar
                </Button>
                <Button variant="outline" size="sm">
                  Apple Calendar
                </Button>
                <Button variant="outline" size="sm">
                  Outlook
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-1">Share Invitation</h3>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Copy className="h-3.5 w-3.5" />
                Copy Invitation Link
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <Button asChild variant="ghost">
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
