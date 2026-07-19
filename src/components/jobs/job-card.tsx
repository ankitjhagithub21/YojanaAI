import { ArrowUpRight, BadgeCheck, Building2, CalendarDays, MapPin, Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Job } from "@/types/job";

type JobCardProps = { job: Job };

function DetailList({ items, title }: { items: string[]; title: string }) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">{title}</h3>
      <ul className="text-muted-foreground space-y-1.5 text-sm">
        {items.map((item, index) => (
          <li className="flex gap-2" key={`${item}-${index}`}>
            <span aria-hidden="true">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function isExternalUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function JobCard({ job }: JobCardProps) {
  const officialWebsite = isExternalUrl(job.officialWebsite) ? job.officialWebsite : undefined;
  const notificationLink = isExternalUrl(job.notificationLink) ? job.notificationLink : undefined;

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="text-primary text-sm font-medium">{job.organization}</p>
          <h2 className="text-xl font-bold tracking-tight">{job.title}</h2>
          <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <span className="flex items-center gap-1.5">
              <Building2 aria-hidden="true" className="size-4" />
              {job.jobType}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin aria-hidden="true" className="size-4" />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays aria-hidden="true" className="size-4" />
              Last date: {job.lastDate}
            </span>
          </div>
        </div>
        <div className="bg-primary text-primary-foreground inline-flex shrink-0 items-center gap-1.5 self-start rounded-full px-3 py-1.5 text-sm font-semibold">
          <Trophy aria-hidden="true" className="size-4" />
          {job.priorityScore}% match
        </div>
      </div>
      <div className="grid gap-6 p-5 lg:grid-cols-2">
        <div className="space-y-5">
          <div className="bg-muted/60 rounded-lg p-4">
            <p className="text-sm font-semibold">Why you&apos;re eligible</p>
            <p className="text-muted-foreground mt-1.5 text-sm leading-6">
              {job.eligibilityReason}
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Education required</dt>
              <dd className="mt-1 font-medium">{job.educationRequired}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Age limit</dt>
              <dd className="mt-1 font-medium">
                {job.minimumAge} – {job.maximumAge}
              </dd>
            </div>
          </dl>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <DetailList items={job.requiredDocuments} title="Required documents" />
          <DetailList items={job.applicationProcess} title="Application steps" />
        </div>
      </div>
      <div className="bg-muted/30 flex flex-col gap-3 border-t p-5 sm:flex-row">
        {officialWebsite ? (
          <Button asChild className="sm:flex-1" variant="outline">
            <a href={officialWebsite} rel="noreferrer" target="_blank">
              Official website <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        ) : null}
        {notificationLink ? (
          <Button asChild className="sm:flex-1">
            <a href={notificationLink} rel="noreferrer" target="_blank">
              <BadgeCheck aria-hidden="true" />
              View notification
            </a>
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
