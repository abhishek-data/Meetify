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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Form schema
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "URL is required"),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().optional(),
});

export default function NewEventTypePage() {
  const router = useRouter();

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      duration: "30",
      description: "",
    },
  });

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // In a real app, we would save the event type to the database here
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
        <h1 className="text-3xl font-bold">Create New Event Type</h1>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
          <CardDescription>
            Create a new event type that people can use to schedule time with
            you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="15 Minute Meeting" {...field} />
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
                        <Input placeholder="15min" {...field} />
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
                      defaultValue={field.value}
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
                      <Textarea
                        placeholder="A brief description of the meeting..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Additional details about the meeting that will be shown to
                      attendees.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" asChild>
                  <Link href="/event-types">Cancel</Link>
                </Button>
                <Button type="submit">Create Event Type</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
