"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

type TimeSlot = {
  id: string;
  startTime: string;
  endTime: string;
};

type DaySchedule = {
  enabled: boolean;
  timeSlots: TimeSlot[];
};

export function AvailabilitySchedule() {
  const [schedule, setSchedule] = useState<Record<string, DaySchedule>>({
    monday: {
      enabled: true,
      timeSlots: [{ id: "mon-1", startTime: "09:00", endTime: "17:00" }],
    },
    tuesday: {
      enabled: true,
      timeSlots: [{ id: "tue-1", startTime: "09:00", endTime: "17:00" }],
    },
    wednesday: {
      enabled: true,
      timeSlots: [{ id: "wed-1", startTime: "09:00", endTime: "17:00" }],
    },
    thursday: {
      enabled: true,
      timeSlots: [{ id: "thu-1", startTime: "09:00", endTime: "17:00" }],
    },
    friday: {
      enabled: true,
      timeSlots: [{ id: "fri-1", startTime: "09:00", endTime: "17:00" }],
    },
    saturday: {
      enabled: false,
      timeSlots: [{ id: "sat-1", startTime: "09:00", endTime: "17:00" }],
    },
    sunday: {
      enabled: false,
      timeSlots: [{ id: "sun-1", startTime: "09:00", endTime: "17:00" }],
    },
  });

  const days = [
    { id: "monday", label: "Monday" },
    { id: "tuesday", label: "Tuesday" },
    { id: "wednesday", label: "Wednesday" },
    { id: "thursday", label: "Thursday" },
    { id: "friday", label: "Friday" },
    { id: "saturday", label: "Saturday" },
    { id: "sunday", label: "Sunday" },
  ];

  const timeOptions = [
    "00:00",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ];

  const toggleDayEnabled = (day: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled,
      },
    }));
  };

  const updateTimeSlot = (
    day: string,
    slotId: string,
    field: "startTime" | "endTime",
    value: string,
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlots: prev[day].timeSlots.map((slot) =>
          slot.id === slotId ? { ...slot, [field]: value } : slot,
        ),
      },
    }));
  };

  const addTimeSlot = (day: string) => {
    const newSlot: TimeSlot = {
      id: `${day}-${Date.now()}`,
      startTime: "09:00",
      endTime: "17:00",
    };

    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlots: [...prev[day].timeSlots, newSlot],
      },
    }));
  };

  const removeTimeSlot = (day: string, slotId: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlots: prev[day].timeSlots.filter((slot) => slot.id !== slotId),
      },
    }));
  };

  return (
    <div className="space-y-6">
      {days.map((day) => (
        <div key={day.id} className="border rounded-md p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`${day.id}-enabled`}
                checked={schedule[day.id].enabled}
                onCheckedChange={() => toggleDayEnabled(day.id)}
              />
              <label
                htmlFor={`${day.id}-enabled`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {day.label}
              </label>
            </div>
          </div>

          {schedule[day.id].enabled && (
            <div className="space-y-3">
              {schedule[day.id].timeSlots.map((slot) => (
                <div key={slot.id} className="flex items-center space-x-2">
                  <Select
                    value={slot.startTime}
                    onValueChange={(value) =>
                      updateTimeSlot(day.id, slot.id, "startTime", value)
                    }
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Start time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={`start-${time}`} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <span className="text-sm">to</span>

                  <Select
                    value={slot.endTime}
                    onValueChange={(value) =>
                      updateTimeSlot(day.id, slot.id, "endTime", value)
                    }
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="End time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={`end-${time}`} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTimeSlot(day.id, slot.id)}
                    disabled={schedule[day.id].timeSlots.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => addTimeSlot(day.id)}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Time Slot
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
