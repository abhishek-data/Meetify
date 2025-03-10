"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  Clock,
  Home,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "./theme-switcher";

const sidebarLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Event Types",
    href: "/event-types",
    icon: CalendarDays,
  },
  {
    name: "Availability",
    href: "/availability",
    icon: Clock,
  },
  {
    name: "Bookings",
    href: "/bookings",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r bg-card p-4 flex flex-col h-screen">
      <div className="flex items-center mb-8 mt-2">
        <h1 className="text-xl font-bold">Calendly Clone</h1>
      </div>

      <nav className="space-y-1 flex-1">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.href || pathname?.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t pt-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              U
            </div>
            <div className="text-sm font-medium">User</div>
          </div>
          <ThemeSwitcher />
        </div>
        <Button variant="outline" className="w-full justify-start" size="sm">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  );
}
