"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const { username, slug } = params;

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Placeholder data for the event type
  const eventType = {
    title: "30 Minute Meeting",
    description: "Standard consultation call.",
    duration: 30,
  };

  // Placeholder data for available time slots
  const availableTimeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];

  const handleContinue = () => {
    if (date && selectedTime) {
      router.push(
        `/${username}/${slug}/book?date=${date.toISOString()}&time=${selectedTime}`,
      );
    }
  };

  return (
    <div className="container max-w-5xl mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>{eventType.title}</CardTitle>
              <CardDescription className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                {eventType.duration} minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {eventType.description}
              </p>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <p className="text-sm text-muted-foreground">
                Hosted by {username}
              </p>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Select a Date & Time</CardTitle>
              <CardDescription>
                Choose a date and time that works for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Date</h3>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="border rounded-md"
                    disabled={{
                      before: new Date(),
                    }}
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Available Time Slots
                    {date && (
                      <span className="font-normal text-muted-foreground">
                        {" "}
                        on {date.toLocaleDateString()}
                      </span>
                    )}
                  </h3>

                  {date ? (
                    <div className="grid grid-cols-2 gap-2">
                      {availableTimeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                          className="justify-start"
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[200px] border rounded-md">
                      <p className="text-muted-foreground">
                        Please select a date to view available times
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-4">
              <Button
                onClick={handleContinue}
                disabled={!date || !selectedTime}
              >
                Continue
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
