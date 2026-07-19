import { JobCard } from "@/components/jobs/job-card";
import type { Job } from "@/types/job";

type JobListProps = { jobs: Job[] };

export function JobList({ jobs }: JobListProps) {
  return (
    <section aria-labelledby="results-heading" className="space-y-4">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="text-primary text-sm font-medium">Personalized results</p>
          <h2 className="text-2xl font-bold tracking-tight" id="results-heading">
            {jobs.length} matching {jobs.length === 1 ? "vacancy" : "vacancies"}
          </h2>
        </div>
        <p className="text-muted-foreground hidden text-sm sm:block">
          Verify details on the official notification.
        </p>
      </div>
      <div className="space-y-5">
        {jobs.map((job, index) => (
          <JobCard job={job} key={`${job.organization}-${job.title}-${index}`} />
        ))}
      </div>
    </section>
  );
}
