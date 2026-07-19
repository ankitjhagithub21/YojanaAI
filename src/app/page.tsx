import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center p-6">
      <section className="max-w-xl space-y-6 text-center">
        <p className="text-muted-foreground text-sm font-medium">Next.js 15 starter</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Yojana AI</h1>
        <p className="text-muted-foreground text-lg">
          A production-ready foundation for building your next application.
        </p>
        <Button asChild>
          <a href="/find-jobs">
            Find government jobs <ArrowRight aria-hidden="true" />
          </a>
        </Button>
      </section>
    </main>
  );
}
