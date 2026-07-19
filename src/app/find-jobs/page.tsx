"use client";

import { BriefcaseBusiness, Sparkles } from "lucide-react";
import { useCallback, useState } from "react";

import { EmptyState } from "@/components/jobs/empty-state";
import { ErrorState } from "@/components/jobs/error-state";
import { JobList } from "@/components/jobs/job-list";
import { JobSearchForm } from "@/components/jobs/job-search-form";
import { LoadingSkeleton } from "@/components/jobs/loading-skeleton";
import { findLatestVacancies } from "@/lib/api";
import type { Job, JobSearchFormValues } from "@/types/job";

type ResultState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; jobs: Job[] }
  | { status: "error"; message: string };

export default function FindJobsPage() {
  const [result, setResult] = useState<ResultState>({ status: "idle" });
  const [lastProfile, setLastProfile] = useState<JobSearchFormValues>();

  const searchVacancies = useCallback(async (profile: JobSearchFormValues) => {
    setLastProfile(profile);
    setResult({ status: "loading" });

    try {
      const response = await findLatestVacancies(profile);
      setResult({ status: "success", jobs: response.vacancies });
    } catch (error) {
      setResult({
        status: "error",
        message: error instanceof Error ? error.message : "Unable to find vacancies right now.",
      });
    }
  }, []);

  const retrySearch = useCallback(() => {
    if (lastProfile) {
      void searchVacancies(lastProfile);
    }
  }, [lastProfile, searchVacancies]);

  return (
    <main className="from-primary/[0.04] via-background to-background min-h-screen bg-gradient-to-b">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <section className="mb-8 max-w-3xl space-y-4 sm:mb-10">
          <div className="bg-background text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium shadow-sm">
            <Sparkles aria-hidden="true" className="text-primary size-4" />
            AI-powered opportunity matching
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Find government jobs that fit you.
          </h1>
          <p className="text-muted-foreground max-w-2xl text-base leading-7 sm:text-lg">
            Share your profile to discover the latest relevant Central, State, PSU, banking,
            railway, teaching, defence, and apprenticeship opportunities.
          </p>
        </section>

        <JobSearchForm isSubmitting={result.status === "loading"} onSubmit={searchVacancies} />

        <section className="mt-10" aria-live="polite">
          {result.status === "idle" ? (
            <div className="bg-muted/20 grid place-items-center rounded-xl border border-dashed px-6 py-14 text-center">
              <div className="max-w-sm space-y-3">
                <div className="bg-background mx-auto grid size-12 place-items-center rounded-full shadow-sm">
                  <BriefcaseBusiness aria-hidden="true" className="text-primary size-6" />
                </div>
                <h2 className="text-lg font-semibold">Your opportunities will appear here</h2>
                <p className="text-muted-foreground text-sm leading-6">
                  Complete the form to get a personalized list of active government vacancies.
                </p>
              </div>
            </div>
          ) : null}
          {result.status === "loading" ? <LoadingSkeleton /> : null}
          {result.status === "success" && result.jobs.length > 0 ? (
            <JobList jobs={result.jobs} />
          ) : null}
          {result.status === "success" && result.jobs.length === 0 ? <EmptyState /> : null}
          {result.status === "error" ? (
            <ErrorState message={result.message} onRetry={retrySearch} />
          ) : null}
        </section>
      </div>
    </main>
  );
}
