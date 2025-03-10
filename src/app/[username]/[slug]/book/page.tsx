"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Form schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  notes: z.string().optional(),
});

export default function BookingDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { username, slug } = params;

  const dateParam = searchParams.get("date");
  const timeParam = searchParams.get("time");

  const date = dateParam ? new Date(dateParam) : null;
  const time = timeParam || null;

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      notes: "",
    },
  });

  // Placeholder data for the event type
  const eventType = {
    title: "30 Minute Meeting",
    description: "Standard consultation call.",
    duration: 30,
  };

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // In a real app, we would save the booking to the database here

    // Create Google Meet link if enabled
    const createGoogleMeetLink = async () => {
      // This would be an API call to create a Google Meet link
      console.log("Creating Google Meet link for the booking");
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return "https://meet.google.com/abc-defg-hij";
    };

    // Add event to connected calendars
    const addToCalendars = async () => {
      // This would be API calls to add the event to connected calendars
      console.log("Adding event to connected calendars");
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
    };

    // Execute these functions in a real implementation
    // For now, just navigate to confirmation
    router.push(`/${username}/${slug}/confirmation`);
  }

  if (!date || !time) {
    return (
      <div className="container max-w-md mx-auto py-8 text-center">
        <p className="text-muted-foreground mb-4">
          Missing date or time information.
        </p>
        <Button asChild>
          <Link href={`/${username}/${slug}`}>Go Back</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <Button variant="ghost" asChild className="mb-4">
        <Link href={`/${username}/${slug}`}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Complete Your Booking</CardTitle>
          <CardDescription>
            Enter your details to confirm your appointment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">{eventType.title}</h3>
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Calendar className="mr-2 h-4 w-4" />
              {date.toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-2 h-4 w-4" />
              {time} ({eventType.duration} minutes)
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      We'll send the meeting details to this email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional information you'd like to share..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Optional: Add any details that might be helpful for the
                      meeting.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button type="submit" className="w-full">
                  Confirm Booking
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
