"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Form schema
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "URL is required"),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().optional(),
  active: z.boolean().default(true),
});

// Mock event types data for demonstration
const mockEventTypes = [
  {
    id: "1",
    title: "30 Minute Meeting",
    slug: "30min",
    duration: "30",
    description: "Short meeting to discuss project updates and next steps.",
    active: true,
  },
  {
    id: "2",
    title: "60 Minute Meeting",
    slug: "60min",
    duration: "60",
    description: "In-depth discussion about project requirements and planning.",
    active: true,
  },
  {
    id: "3",
    title: "15 Minute Coffee Chat",
    slug: "coffee",
    duration: "15",
    description: "Quick coffee break to catch up and network.",
    active: false,
  },
];

export default function EditEventTypePage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [isLoading, setIsLoading] = useState(true);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      duration: "",
      description: "",
      active: true,
    },
  });

  // Fetch event type data
  useEffect(() => {
    // In a real app, this would be an API call to fetch the event type
    const fetchEventType = () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        setTimeout(() => {
          const eventType = mockEventTypes.find((et) => et.id === id);

          if (eventType) {
            form.reset({
              title: eventType.title,
              slug: eventType.slug,
              duration: eventType.duration,
              description: eventType.description || "",
              active: eventType.active,
            });
          } else {
            // Handle event type not found
            router.push("/event-types");
          }
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching event type:", error);
        setIsLoading(false);
      }
    };

    fetchEventType();
  }, [id, form, router]);

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Updated event type:", values);
    // In a real app, we would update the event type in the database here
    router.push("/event-types");
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/event-types">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Event Types
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Edit Event Type</h1>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
          <CardDescription>Update your event type settings.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        The name of your event type, visible to potential
                        attendees.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <span className="text-sm text-muted-foreground mr-2">
                            calendly-clone.com/your-name/
                          </span>
                          <Input {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>
                        The URL path for your event type.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        How long the meeting will last.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea className="resize-none" {...field} />
                      </FormControl>
                      <FormDescription>
                        Additional details about the meeting that will be shown
                        to attendees.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Active</FormLabel>
                        <FormDescription>
                          When active, people can book this event type.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="destructive">
                    Delete Event Type
                  </Button>
                  <div className="flex space-x-4">
                    <Button type="button" variant="outline" asChild>
                      <Link href="/event-types">Cancel</Link>
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </div>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
