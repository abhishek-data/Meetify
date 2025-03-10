"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Mail, User, Video } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Profile form schema
const profileFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
});

// Calendar integration form schema
const calendarFormSchema = z.object({
  googleCalendar: z.boolean().default(false),
  outlookCalendar: z.boolean().default(false),
  appleCalendar: z.boolean().default(false),
  addGoogleMeet: z.boolean().default(false),
});

export default function SettingsPage() {
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [isOutlookConnected, setIsOutlookConnected] = useState(false);
  const [isAppleConnected, setIsAppleConnected] = useState(false);

  // Profile form
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "John Doe",
      email: "john@example.com",
      username: "johndoe",
    },
  });

  // Calendar integration form
  const calendarForm = useForm<z.infer<typeof calendarFormSchema>>({
    resolver: zodResolver(calendarFormSchema),
    defaultValues: {
      googleCalendar: false,
      outlookCalendar: false,
      appleCalendar: false,
      addGoogleMeet: false,
    },
  });

  // Profile form submission handler
  function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log(values);
    // In a real app, we would update the user's profile here
  }

  // Calendar integration form submission handler
  function onCalendarSubmit(values: z.infer<typeof calendarFormSchema>) {
    console.log(values);
    // In a real app, we would update the calendar integration settings here
  }

  // Connect calendar handlers
  const connectGoogle = () => {
    // In a real app, we would initiate OAuth flow here
    setIsGoogleConnected(true);
    calendarForm.setValue("googleCalendar", true);
  };

  const connectOutlook = () => {
    // In a real app, we would initiate OAuth flow here
    setIsOutlookConnected(true);
    calendarForm.setValue("outlookCalendar", true);
  };

  const connectApple = () => {
    // In a real app, we would initiate OAuth flow here
    setIsAppleConnected(true);
    calendarForm.setValue("appleCalendar", true);
  };

  // Disconnect calendar handlers
  const disconnectGoogle = () => {
    // In a real app, we would revoke access here
    setIsGoogleConnected(false);
    calendarForm.setValue("googleCalendar", false);
  };

  const disconnectOutlook = () => {
    // In a real app, we would revoke access here
    setIsOutlookConnected(false);
    calendarForm.setValue("outlookCalendar", false);
  };

  const disconnectApple = () => {
    // In a real app, we would revoke access here
    setIsAppleConnected(false);
    calendarForm.setValue("appleCalendar", false);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="calendar">Calendar Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Manage your personal information and account settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form
                  onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <User className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input {...field} />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input type="email" {...field} />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <span className="text-sm text-muted-foreground mr-2">
                              calendly-clone.com/
                            </span>
                            <Input {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>
                          This will be used for your personal booking link.
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Save Profile</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Calendar Integration</CardTitle>
              <CardDescription>
                Connect your calendars to automatically check for conflicts and
                update your availability.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...calendarForm}>
                <form
                  onSubmit={calendarForm.handleSubmit(onCalendarSubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <Calendar className="mr-3 h-5 w-5 text-red-500" />
                        <div>
                          <h3 className="font-medium">Google Calendar</h3>
                          <p className="text-sm text-muted-foreground">
                            Sync events with your Google Calendar
                          </p>
                        </div>
                      </div>
                      {isGoogleConnected ? (
                        <Button
                          variant="outline"
                          onClick={disconnectGoogle}
                          type="button"
                        >
                          Disconnect
                        </Button>
                      ) : (
                        <Button onClick={connectGoogle} type="button">
                          Connect
                        </Button>
                      )}
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <Calendar className="mr-3 h-5 w-5 text-blue-500" />
                        <div>
                          <h3 className="font-medium">Outlook Calendar</h3>
                          <p className="text-sm text-muted-foreground">
                            Sync events with your Outlook Calendar
                          </p>
                        </div>
                      </div>
                      {isOutlookConnected ? (
                        <Button
                          variant="outline"
                          onClick={disconnectOutlook}
                          type="button"
                        >
                          Disconnect
                        </Button>
                      ) : (
                        <Button onClick={connectOutlook} type="button">
                          Connect
                        </Button>
                      )}
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <Calendar className="mr-3 h-5 w-5 text-gray-500" />
                        <div>
                          <h3 className="font-medium">Apple Calendar</h3>
                          <p className="text-sm text-muted-foreground">
                            Sync events with your Apple Calendar
                          </p>
                        </div>
                      </div>
                      {isAppleConnected ? (
                        <Button
                          variant="outline"
                          onClick={disconnectApple}
                          type="button"
                        >
                          Disconnect
                        </Button>
                      ) : (
                        <Button onClick={connectApple} type="button">
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <h3 className="font-medium mb-4">Meeting Options</h3>

                    <FormField
                      control={calendarForm.control}
                      name="addGoogleMeet"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="flex items-center">
                              <Video className="mr-2 h-4 w-4 text-muted-foreground" />
                              Add Google Meet video conferencing
                            </FormLabel>
                            <FormDescription>
                              Automatically create a Google Meet link for each
                              booking
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit">Save Settings</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
