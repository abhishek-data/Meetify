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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AvailabilitySchedule } from "@/components/availability-schedule";

// Form schema
const formSchema = z.object({
  timezone: z.string().min(1, "Timezone is required"),
});

export default function AvailabilityPage() {
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      timezone: "America/New_York",
    },
  });

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // In a real app, we would save the availability settings to the database here
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Availability</h1>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Timezone</CardTitle>
          <CardDescription>
            Set your timezone to ensure accurate scheduling.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Timezone</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full md:w-[300px]">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="America/New_York">
                          Eastern Time (ET)
                        </SelectItem>
                        <SelectItem value="America/Chicago">
                          Central Time (CT)
                        </SelectItem>
                        <SelectItem value="America/Denver">
                          Mountain Time (MT)
                        </SelectItem>
                        <SelectItem value="America/Los_Angeles">
                          Pacific Time (PT)
                        </SelectItem>
                        <SelectItem value="Europe/London">
                          Greenwich Mean Time (GMT)
                        </SelectItem>
                        <SelectItem value="Europe/Paris">
                          Central European Time (CET)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Your current timezone. This will be used to display
                      available time slots to attendees.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button type="submit">Save Timezone</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Hours</CardTitle>
          <CardDescription>
            Set your weekly availability for meetings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="weekdays" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="weekdays">Weekdays</TabsTrigger>
              <TabsTrigger value="specific">Date Range</TabsTrigger>
            </TabsList>
            <TabsContent value="weekdays" className="space-y-4">
              <AvailabilitySchedule />
              <div className="flex justify-end">
                <Button>Save Availability</Button>
              </div>
            </TabsContent>
            <TabsContent value="specific">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Date Range</h3>
                    <div className="flex flex-col space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-muted-foreground mb-1 block">
                            Start Date
                          </label>
                          <Input type="date" className="w-full" />
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground mb-1 block">
                            End Date
                          </label>
                          <Input type="date" className="w-full" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">
                          Status
                        </label>
                        <Select defaultValue="available">
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="busy">
                              Busy / Unavailable
                            </SelectItem>
                            <SelectItem value="out-of-office">
                              Out of Office
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Time Range</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Select defaultValue="09:00">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Start time" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }).map((_, i) => {
                              const hour = i.toString().padStart(2, "0");
                              return (
                                <SelectItem
                                  key={`${hour}:00`}
                                  value={`${hour}:00`}
                                >
                                  {`${hour}:00`}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>

                        <span className="text-sm">to</span>

                        <Select defaultValue="17:00">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="End time" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }).map((_, i) => {
                              const hour = i.toString().padStart(2, "0");
                              return (
                                <SelectItem
                                  key={`${hour}:00`}
                                  value={`${hour}:00`}
                                >
                                  {`${hour}:00`}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">
                          Repeat
                        </label>
                        <Select defaultValue="none">
                          <SelectTrigger>
                            <SelectValue placeholder="Select repeat option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">
                              Does not repeat
                            </SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Save Date Range</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
