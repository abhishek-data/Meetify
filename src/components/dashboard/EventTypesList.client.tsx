"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Link as LinkIcon,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface EventType {
  id: string;
  title: string;
  slug: string;
  duration: number;
  description: string;
  active: boolean;
}

interface EventTypesListProps {
  eventTypes?: EventType[];
}

const EventTypesList = ({
  eventTypes = defaultEventTypes,
}: EventTypesListProps) => {
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Event Types</CardTitle>
      </CardHeader>
      <CardContent>
        {eventTypes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {eventTypes.map((eventType) => (
              <EventTypeCard key={eventType.id} eventType={eventType} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              No event types created yet
            </p>
            <Button asChild>
              <Link href="/event-types/new">Create your first event type</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface EventTypeCardProps {
  eventType: EventType;
}

const EventTypeCard = ({ eventType }: EventTypeCardProps) => {
  const copyLink = () => {
    // In a real implementation, this would copy the booking link to clipboard
    console.log(`Copied link for ${eventType.title}`);
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col bg-card">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-lg">{eventType.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Clock className="h-3 w-3 mr-1" />
            <span>{eventType.duration} min</span>
          </div>
        </div>
        <div className="flex items-center">
          {eventType.active ? (
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200 mr-2"
            >
              Active
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-gray-50 text-gray-700 border-gray-200 mr-2"
            >
              Inactive
            </Badge>
          )}
          <EventTypeActions eventType={eventType} />
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {eventType.description || "No description provided"}
      </p>

      <div className="mt-auto pt-2 flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={(e) => {
            e.preventDefault();
            copyLink();
          }}
        >
          <LinkIcon className="h-3 w-3 mr-1" />
          Copy Link
        </Button>

        <Button variant="ghost" size="sm" asChild>
          <Link href={`/event-types/${eventType.id}`} className="text-xs">
            <Pencil className="h-3 w-3 mr-1" />
            Edit
          </Link>
        </Button>
      </div>
    </div>
  );
};

interface EventTypeActionsProps {
  eventType: EventType;
}

const EventTypeActions = ({ eventType }: EventTypeActionsProps) => {
  const [open, setOpen] = React.useState(false);

  const copyLink = () => {
    // In a real implementation, this would copy the booking link to clipboard
    console.log(`Copied link for ${eventType.title}`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/event-types/${eventType.id}`}>
              <Pencil className="h-4 w-4 mr-2" /> Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={copyLink}>
            <LinkIcon className="h-4 w-4 mr-2" /> Copy Link
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash2 className="h-4 w-4 mr-2 text-destructive" />
            <span className="text-destructive">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event Type</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{eventType.title}"? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

// Default event types for demonstration
const defaultEventTypes: EventType[] = [
  {
    id: "1",
    title: "30 Minute Meeting",
    slug: "30min",
    duration: 30,
    description: "Short meeting to discuss project updates and next steps.",
    active: true,
  },
  {
    id: "2",
    title: "60 Minute Meeting",
    slug: "60min",
    duration: 60,
    description: "In-depth discussion about project requirements and planning.",
    active: true,
  },
  {
    id: "3",
    title: "15 Minute Coffee Chat",
    slug: "coffee",
    duration: 15,
    description: "Quick coffee break to catch up and network.",
    active: false,
  },
];

export default EventTypesList;
