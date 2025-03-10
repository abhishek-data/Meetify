import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CalendarPlus,
  Clock,
  Settings,
  Users,
  Link as LinkIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickActionProps {
  actions?: Array<{
    label: string;
    icon: React.ReactNode;
    href: string;
    description: string;
  }>;
}

const QuickActions = ({ actions }: QuickActionProps) => {
  const defaultActions = [
    {
      label: "New Event Type",
      icon: <CalendarPlus className="h-4 w-4" />,
      href: "/event-types/new",
      description: "Create a new event type for bookings",
    },
    {
      label: "Availability",
      icon: <Clock className="h-4 w-4" />,
      href: "/availability",
      description: "Set your available hours",
    },
    {
      label: "Bookings",
      icon: <Users className="h-4 w-4" />,
      href: "/bookings",
      description: "View and manage your bookings",
    },
    {
      label: "Settings",
      icon: <Settings className="h-4 w-4" />,
      href: "/settings",
      description: "Configure your account settings",
    },
    {
      label: "Share Link",
      icon: <LinkIcon className="h-4 w-4" />,
      href: "#",
      description: "Copy your booking page link",
    },
  ];

  const displayActions = actions || defaultActions;

  return (
    <div className="bg-background w-full p-4 rounded-lg border border-border">
      <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
      <div className="flex flex-wrap gap-2">
        <TooltipProvider>
          {displayActions.map((action, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn("flex items-center gap-2 hover:bg-muted")}
                  asChild
                >
                  <Link href={action.href}>
                    {action.icon}
                    <span>{action.label}</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{action.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default QuickActions;
