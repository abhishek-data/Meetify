import EventTypesList from "@/components/dashboard/EventTypesList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function EventTypesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Event Types</h1>
        <Button asChild>
          <Link href="/event-types/new">
            <Plus className="mr-2 h-4 w-4" /> Create Event Type
          </Link>
        </Button>
      </div>
      <EventTypesList />
    </div>
  );
}
