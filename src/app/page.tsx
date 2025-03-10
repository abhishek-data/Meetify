import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Calendar, Clock, Users } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">Calendly Clone</h1>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <Button variant="ghost" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/register">Sign Up</Link>
          </Button>
        </div>
      </header>

      <main>
        <section className="py-20 md:py-32">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Scheduling Made Simple
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Connect with others efficiently by sharing your availability and
              letting them book time with you, without the back-and-forth
              emails.
            </p>
            <Button size="lg" asChild>
              <Link href="/auth/register">Get Started</Link>
            </Button>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Create Event Types
                </h3>
                <p className="text-muted-foreground">
                  Set up different meeting types with customizable durations and
                  details.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Share Your Link</h3>
                <p className="text-muted-foreground">
                  Send your personalized booking link to anyone who needs to
                  schedule time with you.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Booked</h3>
                <p className="text-muted-foreground">
                  Invitees pick a time from your available slots and the meeting
                  is automatically scheduled.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to simplify your scheduling?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of users who have streamlined their meeting
              process.
            </p>
            <Button size="lg" asChild>
              <Link href="/auth/register">Sign Up for Free</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">Calendly Clone</h2>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Help
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
